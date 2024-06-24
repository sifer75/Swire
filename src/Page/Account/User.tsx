import React, { useState } from "react";
import { getUser, updateUser } from "../../lib/user.request";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import Cv from "../../assets/logoCreationAccount/cv.svg";
import Background from "../../assets/background/background3.svg";
import Work from "../../assets/logoCreationAccount/work.svg";
// import Swire from "../../assets/menu/SwireLogo.svg";
import { Input } from "../../component/custom/Input";
import ButtonArrow from "../../component/button/ButtonArrow";
// import Image from "../../component/custom/Image";
import LoadingWithoutMenu from "../Loading/LoadingWithoutMenu";

interface FormDataProps {
  name: string;
  age: string;
}

function User() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    age: "",
  });
  const [image, setImage] = useState<File | undefined>();
  const [visible, setVisible] = useState<boolean>(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = e.target;
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const {
    data: userData,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const mutation = useMutation({
    mutationFn: (data: {
      name: string;
      age: string;
      visible: boolean;
      image: File | undefined;
    }) => updateUser(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      try {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } catch (e) {
        console.error("Erreur lors de la connection de l'utilisateur");
      }
    },
  });

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);
    }
  };

  if (isPending) {
    return <LoadingWithoutMenu />;
  }
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <div
        className="w-full h-screen flex flex-col p-6 justify-between bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <HeaderCreation
          state={[true, true, false]}
          text={"Confirm Your CV Info"}
          title={"Step 1/3 Personal Information"}
          image={Work}
          logo={Cv}
        />
        <div className="w-full flex-grow flex flex-col justify-evenly">
          <div className="flex flex-col gap-3 text-grayfab font-medium">
            Profile photo
            {/* <Image
              src={Swire}
              className="aspect-square w-1/4 shadow-md rounded-lg flex flex-col justify-center items-center"
              alt="image user"
            ></Image> */}
            <input
              // className="aspect-square w-1/4 shadow-md rounded-lg flex flex-col justify-center items-center"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => handleUploadImage(e)}
            ></input>
          </div>
          <React.Fragment>
            <h1 className="flex text-center w-11/12 text-xl font-medium text-LightGray outline-none tracking-[0.5px]">
              Name
            </h1>
            <Input
              placeholder="Name"
              defaultValue={userData.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </React.Fragment>
          <React.Fragment>
            <h1 className="flex text-center w-11/12 text-xl font-medium text-LightGray outline-none tracking-[0.5px]">
              Age
            </h1>
            <Input
              placeholder="Age"
              defaultValue={userData.age}
              onChange={(e) => handleChange(e, "age")}
            />
          </React.Fragment>
          <div className="flex flex-col gap-3 text-grayfab font-medium">
            Make my profile visible ?
            <div className="flex gap-[10px]">
              {["yes", "no"].map((value, index) => (
                <div key={index} className="flex flex-row gap-2">
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <Input
                      type="radio"
                      id={value}
                      name="visibility"
                      className="appearance-none peer"
                      checked={visible === (value === "yes")}
                      onChange={() => setVisible(value === "yes")}
                    />
                    <label
                      htmlFor={value}
                      className="flex flex-row shadow py-2 px-8 border peer-checked:border-black rounded-lg"
                    >
                      {value === "yes" ? "Yes" : "No"}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between items-center pt-[20px]">
          <ButtonArrow
            background={"bg-gradient-to-l from-pink to-purple rotate-180"}
            selection={"/creation/fields"}
          ></ButtonArrow>
          <ButtonArrow
            disabled={formData.name === "" || formData.age === ""}
            background={
              formData.name === "" || formData.age === ""
                ? "bg-gradient-to-r from-pink/70 to-purple/70"
                : "bg-gradient-to-r from-pink to-purple"
            }
            onClick={() => {
              mutation.mutate({
                name: formData.name,
                age: formData.age,
                visible: visible,
                image: image,
              });
            }}
            selection={"/creation/fields"}
          ></ButtonArrow>
        </div>
      </div>
    </>
  );
}

export default User;
