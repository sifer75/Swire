import { useState } from "react";
import { updateFields } from "../../lib/user.request";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FieldsCard from "../../component/FieldsCard";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/fieldsImage.svg";
import Logo1 from "../../assets/logo1.svg";
import Background from "../../assets/background/background1.svg";
import { industryList } from "../../lib/fields.utils";
import DoubleButton from "../../component/button/DoubleButton";

function Fields() {
  const [fields, setFields] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      navigate("/creation/target");
    },
  });

  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 gap-5 justify-between"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Field"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Logo1}
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
        <DoubleButton
          selection1={"/creation/user"}
          selection2={"/creation/target"}
          disabled={fields.length === 0}
          onClick={() => {
            mutation.mutate({
              fields: fields,
            });
          }}
        />
      </div>
    </>
  );
}

export default Fields;
