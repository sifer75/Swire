import Background from "../../assets/background/background1.svg";
import { useState } from "react";
import { Input } from "../../component/custom/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, login } from "../../lib/user.request";
import SwireTitle from "../../component/layout/Header/SwireTitle";
import DoubleButton from "../../component/button/DoubleButton";
import React from "react";

interface formDataProps {
  email: string;
  password: string;
}

function CreateAccount() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    password: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = e.target;
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string; }) =>
      createUser(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      try {
        console.log("Création de l'utilisateur réussie");
        await login({ email: formData.email, password: formData.password });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } catch (e) {
        console.error("Erreur lors de la connection de l'utilisateur");
      }
    },
  });

  return (
    <div
      className="h-screen w-full flex flex-col justify-end items-center p-[40px] bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <SwireTitle title={"Create an account"} />
      <div className="w-full h-[330px] flex flex-col justify-between items-center">
        {Object.entries(formData).map(([key, value], index) => (
          <React.Fragment key={index}>
            <h1 className="flex text-center w-11/12 text-xl font-medium text-LightGray outline-none tracking-[0.5px]">
              {key === "email" ? "Email" : "Password"}
            </h1>
            <Input
              key={key}
              placeholder={key === "email" ? "Email" : "Password"}
              value={value}
              onChange={(e) => handleChange(e, key)}
            />
          </React.Fragment>
        ))}
        <DoubleButton
          selection1={"/"}
          selection2={"/creation/user"}
          disabled={formData.email === "" || formData.password === ""}
          onClick={() => {
            mutation.mutate({
              email: formData.email,
              password: formData.password,
            });
          }}
        />
      </div>
    </div>
  );
}

export default CreateAccount;
