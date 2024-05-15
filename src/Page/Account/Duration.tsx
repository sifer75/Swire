import { useState } from "react";
import { updateDuration } from "../../lib/user.request";
import EnumCard from "../../component/EnumCard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/logoCreationAccount/work2.svg";
import Cible from "../../assets/logoCreationAccount/cible.svg";
import Background from "../../assets/background/background1.svg";
import { durationTypeList } from "../../lib/duration.utils";
import ButtonArrow from "../../component/button/ButtonArrow";

function Duration() {
  const [duration, setDuration] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const handleClick = (durationName: string) => {
    if (duration.includes(durationName)) {
      setDuration((prevDuration) =>
        prevDuration.filter((item) => item !== durationName)
      );
    } else {
      setDuration((prevDuration) => [...prevDuration, durationName]);
    }
  };
  console.log(duration);

  const mutation = useMutation({
    mutationFn: (data: { duration: string[] }) => updateDuration(data),
    onError: (error) => {
      console.log("Création du duration échoué", error);
    },
    onSuccess: () => {
      console.log("Création du duration réussie");
      queryClient.invalidateQueries({ queryKey: ["duration"] });
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between gap-5 bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Job duration"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Cible}
          state={[true, true, true, true, true, false, false]}
        />
        <div className="w-full grid grid-cols-1 gap-11 overflow-y-scroll no-scrollbar">
          {durationTypeList.map((durationType, index) => {
            return (
              <EnumCard
                key={index}
                name={durationType.name}
                checked={duration.includes(durationType.value)}
                onClick={() => handleClick(durationType.value)}
              />
            );
          })}
        </div>
        <div className="flex w-full justify-between items-center pt-[20px]">
          <ButtonArrow
            background={"bg-gradient-to-l from-pink to-purple rotate-180"}
            selection={"/creation/rhythm"}
          ></ButtonArrow>
          <ButtonArrow
            disabled={duration.length === 0}
            background={
              duration.length === 0
                ? "bg-gradient-to-r from-pink/70 to-purple/70"
                : "bg-gradient-to-r from-pink to-purple"
            }
            onClick={() => {
              mutation.mutate({
                duration: duration,
              });
            }}
            selection={"/creation/experience"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default Duration;
