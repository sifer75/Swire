import React, { useState } from "react";
import { getUser, updateUser } from "../../lib/user.request";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import HeaderCreation from "../../component/layout/Header/HeaderCreation";
import Cv from "../../assets/cv.jpg";
import Work from "../../assets/work.jpg";
import Swire from "../../assets/menu/SwireLogo.svg";
import { Input } from "../../component/custom/Input";
import DoubleButton from "../../component/button/DoubleButton";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: { name: string; age: string; visible: boolean }) =>
      updateUser(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      try {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate("/creation/fields");
      } catch (e) {
        console.error("Erreur lors de la connection de l'utilisateur");
      }
    },
  });

  if (isPending) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col p-[25px] justify-between">
        <HeaderCreation
          state={[true, true, false]}
          text={"Confirm Your CV Info"}
          title={"Step 1/3 Personal Information"}
          image={Work}
          logo={Cv}
        />
        <div className="w-full flex-grow flex flex-col justify-evenly">
          <div className="flex flex-col gap-3">
            <p className="text-grayfab font-medium">Profile photo</p>
            <div className="aspect-square w-1/4 shadow-md rounded-lg flex flex-col justify-center items-center">
              <img loading="lazy" src={Swire} alt="image user"></img>
            </div>
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
          <div className="flex flex-col gap-3">
            <p className="text-grayfab font-medium">
              Make my profile visible ?
            </p>
            <div className="flex gap-[10px]">
              {["yes", "no"].map((value, index) => (
                <div key={index} className="flex flex-row gap-2">
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <input
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
        <div className="flex justify-between items-center">
          <DoubleButton
            selection1={"/createAccount"}
            selection2={"/creation/fields"}
            disabled={formData.name === "" || formData.age === ""}
            onClick={() => {
              mutation.mutate({
                name: formData.name,
                age: formData.age,
                visible: visible,
              });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default User;
