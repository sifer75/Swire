import { useState } from "react";
import { updateDisponibility } from "../../lib/user.request";
import EnumCard from "../../component/EnumCard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/fieldsImage.svg";
import Logo1 from "../../assets/logo1.svg";
import Background from "../../assets/background/background1.svg";
import { contractTypeList } from "../../lib/contract.utils";
import DoubleButton from "../../component/button/DoubleButton";

function Disponibility() {
  const [disponibility, setDisponibility] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      navigate("/creation/location");
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between gap-5"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Job"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Logo1}
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
        <DoubleButton
          selection1={"/creation/target"}
          selection2={"/creation/location"}
          disabled={disponibility.length === 0}
          onClick={() => {
            mutation.mutate({
              disponibility: disponibility,
            });
          }}
        />
      </div>
    </>
  );
}

export default Disponibility;
