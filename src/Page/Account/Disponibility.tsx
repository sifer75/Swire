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
  console.log(disponibility, "coucou");
  const handleDisponibility = (value: string) => {
    if (disponibility.includes(value)) {
      setDisponibility((prevDisponibility) =>
        prevDisponibility.filter((item) => item !== value)
      );
    } else {
      setDisponibility((prevDisponibility) => [...prevDisponibility, value]);
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
      queryClient.invalidateQueries({ queryKey: ["disponibility"] });
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between gap-5 bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Disponibility"}
          title={"Step 2/3 Your Research"}
          image={DisponibilityImage}
          logo={Cible}
          state={[true, true, true, false, false, false, false]}
        />
        <div className="w-full grid grid-cols-1 gap-11 overflow-y-scroll no-scrollbar">
          {contractTypeList.map((option) => {
            return (
              <EnumCard
                key={option.value}
                name={option.name}
                checked={disponibility.includes(option.value)}
                onClick={() => handleDisponibility(option.value)}
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
            selection={"/creation/rhythm"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default Disponibility;
