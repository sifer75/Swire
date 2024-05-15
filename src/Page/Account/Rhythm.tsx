import { useState } from "react";
import { updateRhythm } from "../../lib/user.request";
import EnumCard from "../../component/EnumCard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/logoCreationAccount/work2.svg";
import Cible from "../../assets/logoCreationAccount/cible.svg";
import Background from "../../assets/background/background1.svg";
import { rhythmTypeList } from "../../lib/rhythm.utils";
import ButtonArrow from "../../component/button/ButtonArrow";

function Rhythm() {
  const [rhythm, setRhythm] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const handleWorkRhythm = (value: string) => {
    if (rhythm.includes(value)) {
      setRhythm((prevRhythm) => prevRhythm.filter((item) => item !== value));
    } else {
      setRhythm((prevRhythm) => [...prevRhythm, value]);
    }
  };
  console.log(rhythm);

  const mutation = useMutation({
    mutationFn: (data: { workRhythm: string[] }) => updateRhythm(data),
    onError: (error) => {
      console.log("Création du rhythm échoué", error);
    },
    onSuccess: () => {
      console.log("Création du rhythm réussie");
      queryClient.invalidateQueries({ queryKey: ["work_rhythm"] });
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between gap-5 bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Job Rhythm"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Cible}
          state={[true, true, true, true, false, false, false]}
        />
        <div className="w-full grid grid-cols-1 gap-11 overflow-y-scroll no-scrollbar">
          {rhythmTypeList.map((option) => {
            return (
              <EnumCard
                key={option.value}
                name={option.name}
                checked={rhythm.includes(option.value)}
                onClick={() => handleWorkRhythm(option.value)}
              />
            );
          })}
        </div>
        <div className="flex w-full justify-between items-center pt-[20px]">
          <ButtonArrow
            background={"bg-gradient-to-l from-pink to-purple rotate-180"}
            selection={"/creation/disponibility"}
          ></ButtonArrow>
          <ButtonArrow
            disabled={rhythm.length === 0}
            background={
              rhythm.length === 0
                ? "bg-gradient-to-r from-pink/70 to-purple/70"
                : "bg-gradient-to-r from-pink to-purple"
            }
            onClick={() => {
              mutation.mutate({
                workRhythm: rhythm,
              });
            }}
            selection={"/creation/duration"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default Rhythm;
