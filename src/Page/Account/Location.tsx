import { useState } from "react";
import { updateLocation } from "../../lib/user.request";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import FieldsImage from "../../assets/fieldsImage.svg";
import Logo1 from "../../assets/logo1.svg";
import Background from "../../assets/background/background1.svg";
import ButtonVar3 from "../../component/button/ButtonVar3";
import Loop from "../../assets/loop.svg";
import { citys } from "../../lib/utils";
import DoubleButton from "../../component/button/DoubleButton";
import { Input } from "../../component/custom/Input";

function Location() {
  const [location, setLocation] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
      navigate("/swire");
    },
  });
  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-[25px] justify-between"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          text={"Select Your Location"}
          title={"Step 2/3 Your Research"}
          image={FieldsImage}
          logo={Logo1}
          state={[true, true, true, true]}
        />
        <div>
          <p className="font-sans text-Hifi-Color-Dark-Grey text-base font-medium leading-normal tracking-tight w-[243px]">
            Select at least one location in which you would like to work{" "}
          </p>
        </div>
        <div className="flex h-[36px] justify-center items-center overflow-hidden text-secondary truncate whitespace-nowrap font-sans text-base font-normal leading-22 tracking-tight w-300 h-22 flex-shrink-0 relative bg-gray-100">
          <Input
            defaultValue={location}
            placeholder="Search Location"
            className="w-5/6 h-full bg-secondary bg-gray-100 rounded-xl p-3 text-gray-600"
          ></Input>

          <img
            loading="lazy"
            className="w-[25px] h-[22px]"
            src={Loop}
            alt="logo loop"
          ></img>
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
        <DoubleButton
          selection1={"/creation/disponibility"}
          selection2={"/swire"}
          disabled={location.length === 0}
          onClick={() => {
            mutation.mutate({
              location: location,
            });
          }}
        />
      </div>
    </>
  );
}

export default Location;
