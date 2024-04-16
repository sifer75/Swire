import { Link } from "react-router-dom";
import SwireHeader from "../../component/layout/Header/SwireTitle";
// import ButtonVar1 from "../../component/button/ButtonVar1";
import Background from "../../assets/background/background1.svg";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login } from "../../lib/user.request";
import { useState } from "react";
import { Input } from "../../component/custom/Input";
import { SelectionChoice } from "../../component/button/SelectionChoice";

interface formDataProps {
  email: string;
  password: string;
}
function Login() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    mutationFn: (data: { email: string; password: string }) => login(data),

    onError: (error) => {
      console.log("Connection échouée oula", error);
    },
    onSuccess: () => {
      console.log("Connection réussie");
      queryClient.invalidateQueries({ queryKey: ["User"] });
      navigate("/swire");
    },
  });

  return (
    <>
      <div
        className="static w-screen h-screen flex flex-col justify-end bg-cover bg-center items-center p-[52px]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <SwireHeader title="Internship at first sight." />
        <div className="w-full h-[330px] flex flex-col justify-between items-center">
          {Object.entries(formData).map(([key, value]) => (
            <Input
              key={key}
              placeholder={key === "email" ? "Email" : "Password"}
              value={value}
              onChange={(e) => handleChange(e, key)}
            />
          ))}
          <div>
            <Link
              to="/forget/email"
              className="text-LightGray text-center leading-normal font-heebo font-medium text-sm tracking-wide underline"
            >
              forget password?
            </Link>
          </div>
          <SelectionChoice
            onSubmit={() =>
              mutation.mutate({
                email: formData.email,
                password: formData.password,
              })
            }
            disabled={formData.email === "" || formData.password === ""}
            choice1={"Sign in"}
            choice2={"Back"}
            choice1Link={"/"}
            choice2Link={"/"}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
