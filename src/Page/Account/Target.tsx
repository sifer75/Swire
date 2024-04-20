import { useState } from "react";
import { updateTarget } from "../../lib/user.request";
import EnumCard from "../../component/EnumCard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/logoCreationAccount/work2.svg";
import Cible from "../../assets/logoCreationAccount/cible.svg";
import Background from "../../assets/background/background1.svg";
import { companyTypeList } from "../../lib/target.utils";
import ButtonArrow from "../../component/button/ButtonArrow";

function Target() {
  const [target, setTarget] = useState<string[]>([]);
  const queryClient = useQueryClient();

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
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between gap-5 bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Target"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Cible}
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
        <div className="flex w-full justify-between items-center pt-[20px]">
          <ButtonArrow
            background={"bg-gradient-to-l from-pink to-purple rotate-180"}
            selection={"/creation/fields"}
          ></ButtonArrow>
          <ButtonArrow
            disabled={target.length === 0}
            background={
              target.length === 0
                ? "bg-gradient-to-r from-pink/70 to-purple/70"
                : "bg-gradient-to-r from-pink to-purple"
            }
            onClick={() => {
              mutation.mutate({
                target: target,
              });
            }}
            selection={"/creation/disponibility"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default Target;
