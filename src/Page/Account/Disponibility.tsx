import { useState } from "react";
import { updateDisponibility } from "../../lib/user.request";
import EnumCard from "../../component/EnumCard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import DisponibilityImage from "../../assets/logoCreationAccount/work2.svg";
import Cible from "../../assets/logoCreationAccount/cible.svg";
import Background from "../../assets/background/background1.svg";
import { contractTypeList } from "../../lib/contract.utils";
import ButtonArrow from "../../component/button/ButtonArrow";

function Disponibility() {
  const [disponibility, setDisponibility] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const handleClick = (disponibilityName: string) => {
    if (disponibility.includes(disponibilityName)) {
      setDisponibility((prevDisponibility) =>
        prevDisponibility.filter((item) => item !== disponibilityName)
      );
    } else {
      setDisponibility((prevDisponibility) => [
        ...prevDisponibility,
        disponibilityName,
      ]);
    }
  };
  const mutation = useMutation({
    mutationFn: (data: { disponibility: string[] }) =>
      updateDisponibility(data),
    onError: (error) => {
      console.log("Création du Disponibility échoué", error);
    },
    onSuccess: () => {
      console.log("Création du Disponibility réussie");
      queryClient.invalidateQueries({ queryKey: ["Disponibility"] });
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between gap-5 bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Job"}
          title={"Step 2/3 Your Research"}
          image={DisponibilityImage}
          logo={Cible}
          state={[true, true, true, false]}
        />
        <div className="w-full grid grid-cols-1 gap-11 overflow-y-scroll no-scrollbar">
          {contractTypeList.map((contractType, index) => {
            return (
              <EnumCard
                key={index}
                name={contractType.name}
                checked={disponibility.includes(contractType.value)}
                onClick={() => handleClick(contractType.value)}
              />
            );
          })}
        </div>
        <div className="flex w-full justify-between items-center pt-[20px]">
          <ButtonArrow
            background={"bg-gradient-to-l from-pink to-purple rotate-180"}
            selection={"/creation/target"}
          ></ButtonArrow>
          <ButtonArrow
            disabled={disponibility.length === 0}
            background={
              disponibility.length === 0
                ? "bg-gradient-to-r from-pink/70 to-purple/70"
                : "bg-gradient-to-r from-pink to-purple"
            }
            onClick={() => {
              mutation.mutate({
                disponibility: disponibility,
              });
            }}
            selection={"/creation/location"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default Disponibility;
