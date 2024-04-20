import { useState } from "react";
import { updateFields } from "../../lib/user.request";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import FieldsCard from "../../component/FieldsCard";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/logoCreationAccount/work2.svg";
import Cible from "../../assets/logoCreationAccount/cible.svg";
import Background from "../../assets/background/background1.svg";
import { industryList } from "../../lib/fields.utils";
import ButtonArrow from "../../component/button/ButtonArrow";

function Fields() {
  const [fields, setFields] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const handleClick = (fieldName: string) => {
    if (fields.includes(fieldName)) {
      setFields((prevFields) =>
        prevFields.filter((item) => item !== fieldName)
      );
    } else {
      setFields((prevFields) => [...prevFields, fieldName]);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: { fields: string[] }) => updateFields(data),
    onError: (error) => {
      console.log("Création du fields échoué", error);
    },
    onSuccess: () => {
      console.log("Création du fields réussie");
      queryClient.invalidateQueries({ queryKey: ["Fields"] });
    },
  });

  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 gap-5 justify-between bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Field"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Cible}
          state={[true, false, false, false]}
        />
        <div className="w-full grid grid-cols-2 gap-6 overflow-y-scroll no-scrollbar">
          {industryList.map((industry, index) => {
            return (
              <FieldsCard
                key={index}
                name={industry.name}
                logo={industry.logo}
                description={industry.description}
                selected={fields.includes(industry.value)}
                onClick={() => handleClick(industry.value)}
              />
            );
          })}
        </div>

        <div className="flex w-full justify-between items-center pt-[20px]">
          <ButtonArrow
            background={"bg-gradient-to-l from-pink to-purple rotate-180"}
            selection={"/creation/user"}
          ></ButtonArrow>
          <ButtonArrow
            disabled={fields.length === 0}
            background={
              fields.length === 0
                ? "bg-gradient-to-r from-pink/70 to-purple/70"
                : "bg-gradient-to-r from-pink to-purple"
            }
            onClick={() => {
              mutation.mutate({
                fields: fields,
              });
            }}
            selection={"/creation/target"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default Fields;
