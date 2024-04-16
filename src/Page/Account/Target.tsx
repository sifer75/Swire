import { useState } from "react";
import { updateTarget } from "../../lib/user.request";
import EnumCard from "../../component/EnumCard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/fieldsImage.svg";
import Logo1 from "../../assets/logo1.svg";
import Background from "../../assets/background/background1.svg";
import { companyTypeList } from "../../lib/target.utils";
import DoubleButton from "../../component/button/DoubleButton";

function Target() {
  const [target, setTarget] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClick = (targetName: string) => {
    if (target.includes(targetName)) {
      setTarget((prevTarget) =>
        prevTarget.filter((item) => item !== targetName)
      );
    } else {
      setTarget((prevTarget) => [...prevTarget, targetName]);
    }
  };
  console.log(target);

  const mutation = useMutation({
    mutationFn: (data: { target: string[] }) => updateTarget(data),
    onError: (error) => {
      console.log("Création du target échoué", error);
    },
    onSuccess: () => {
      console.log("Création du target réussie");
      queryClient.invalidateQueries({ queryKey: ["Target"] });
      navigate("/creation/disponibility");
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between gap-5"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Target"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Logo1}
          state={[true, true, false, false]}
        />
        <div className="w-full grid grid-cols-1 gap-11 overflow-y-scroll no-scrollbar">
          {companyTypeList.map((companyType, index) => {
            return (
              <EnumCard
              key={index}
                name={companyType.name}
                checked={target.includes(companyType.value)}
                onClick={() => handleClick(companyType.value)}
              />
            );
          })}
        </div>
        <DoubleButton
          selection1={"/creation/fields"}
          selection2={"/creation/disponibility"}
          disabled={target.length === 0}
          onClick={() => {
            mutation.mutate({
              target: target,
            });
          }}
        />
      </div>
    </>
  );
}

export default Target;
