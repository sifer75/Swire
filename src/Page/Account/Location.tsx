import { useState } from "react";
import { updateLocation } from "../../lib/user.request";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/logoCreationAccount/work2.svg";
import Cible from "../../assets/logoCreationAccount/cible.svg";
import Background from "../../assets/background/background1.svg";
import ButtonVar3 from "../../component/button/ButtonVar3";
import Loop from "../../assets/loop.svg";
import { citys } from "../../lib/utils";
import { Input } from "../../component/custom/Input";
import ButtonArrow from "../../component/button/ButtonArrow";
import Image from "../../component/custom/Image";

function Location() {
  const [location, setLocation] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const [background, setBackground] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const handleClick = (locationName: string, index: number) => {
    if (location.includes(locationName)) {
      setLocation((prevLocation) =>
        prevLocation.filter((item) => item !== locationName)
      );
    } else {
      setLocation((prevLocation) => [...prevLocation, locationName]);
    }
    const newBackground = [...background];
    newBackground[index] = !newBackground[index];
    setBackground(newBackground);
  };
  console.log(location);

  const mutation = useMutation({
    mutationFn: (data: { location: string[] }) => updateLocation(data),
    onError: (error) => {
      console.log("Création de la localisation échouée", error);
    },
    onSuccess: () => {
      console.log("Création de la localisation réussie");
      queryClient.invalidateQueries({ queryKey: ["Location"] });
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-[25px] justify-between bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Location"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Cible}
          state={[true, true, true, true]}
        />
        <div className="font-sans text-Hifi-Color-Dark-Grey text-base font-medium leading-normal tracking-tight w-[243px]">
          Select at least one location in which you would like to work
        </div>
        <div className="flex w-full items-center">
          <Input
            defaultValue={location}
            placeholder="Search Location"
            className="w-5/6 bg-secondary rounded-xl p-3 text-gray-600 flex h-[36px] justify-center items-center overflow-hidden text-secondary truncate whitespace-nowrap font-sans text-base font-normal leading-22 tracking-tight w-300 h-22 flex-shrink-0 relative bg-gray-100"
          />
          <Image
            className="w-1/6 h-[22px] ml-[-64px] z-10"
            src={Loop}
            alt="logo loop"
          />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-black font-sans text-base font-medium leading-6 pl-[10px]">
            Or Select city
          </h2>
          <div className="w-[350px] h-[154px] flex flex-wrap">
            {citys.map((city, index) => (
              <ButtonVar3
                key={index}
                text={city}
                background={!background[index]}
                onClick={() => handleClick(city, index)}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full justify-between items-center pt-[20px]">
          <ButtonArrow
            background={"bg-gradient-to-l from-pink to-purple rotate-180"}
            selection={"/creation/disponibility"}
          ></ButtonArrow>
          <ButtonArrow
            disabled={location.length === 0}
            background={
              location.length === 0
                ? "bg-gradient-to-r from-pink/70 to-purple/70"
                : "bg-gradient-to-r from-pink to-purple"
            }
            onClick={() => {
              mutation.mutate({
                location: location,
              });
            }}
            selection={"/swire"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default Location;
