import { useState } from "react";
import { updateExperience } from "../../lib/user.request";
import EnumCard from "../../component/EnumCard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/logoCreationAccount/work2.svg";
import Cible from "../../assets/logoCreationAccount/cible.svg";
import Background from "../../assets/background/background1.svg";
import { experienceTypeList } from "../../lib/experience.utils";
import ButtonArrow from "../../component/button/ButtonArrow";

function Experience() {
  const [experience, setExperience] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const handleExperience = (value: string) => {
    if (experience.includes(value)) {
      setExperience((prevExperience) =>
        prevExperience.filter((item) => item !== value)
      );
    } else {
      setExperience((prevExperience) => [...prevExperience, value]);
    }
  };
  console.log(experience);

  const mutation = useMutation({
    mutationFn: (data: { experience: string[] }) => updateExperience(data),
    onError: (error) => {
      console.log("Création du experience échoué", error);
    },
    onSuccess: () => {
      console.log("Création du experience réussie");
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between gap-5 bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Job experience"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Cible}
          state={[true, true, true, true, true, true, false]}
        />
        <div className="w-full grid grid-cols-1 gap-11 overflow-y-scroll no-scrollbar">
          {experienceTypeList.map((option) => {
            return (
              <EnumCard
                key={option.value}
                name={option.name}
                checked={experience.includes(option.value)}
                onClick={() => handleExperience(option.value)}
              />
            );
          })}
        </div>
        <div className="flex w-full justify-between items-center pt-[20px]">
          <ButtonArrow
            background={"bg-gradient-to-l from-pink to-purple rotate-180"}
            selection={"/creation/duration"}
          ></ButtonArrow>
          <ButtonArrow
            disabled={experience.length === 0}
            background={
              experience.length === 0
                ? "bg-gradient-to-r from-pink/70 to-purple/70"
                : "bg-gradient-to-r from-pink to-purple"
            }
            onClick={() => {
              mutation.mutate({
                experience: experience,
              });
            }}
            selection={"/creation/location"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default Experience;
