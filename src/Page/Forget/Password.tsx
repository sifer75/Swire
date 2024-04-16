import ButtonVar2 from "../../component/button/ButtonVar2";
import Swire from "../../assets/menu/SwireLogo.svg";
import Background from "../../assets/background/background1.svg";
import Arrow from "../../assets/arrow/arrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgetPassword } from "../../lib/user.request";

function ForgetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  console.log(email, "ttttttt");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const mutation = useMutation({
    mutationFn: (data: {
      password1: string;
      password2: string;
      email: string;
    }) => forgetPassword(data),
    onError: (error) => {
      console.log("modification du mot de passe échouée", error);
    },
    onSuccess: () => {
      console.log("mot de passe changé");
      queryClient.invalidateQueries({ queryKey: ["Password"] });
      navigate("/swire");
    },
  });

  return (
    <>
      <div
        className="h-screen w-full flex flex-col justify-center items-center p-[40px]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="h-[400px] w-full flex flex-col justify-between ">
          <div>
            <img loading="lazy" src={Swire} alt="logo swire"></img>
          </div>
          <div className="w-full flex justify-center ">
            <h1 className="text-gray-500 leading-tight text-top uppercase font-heebo text-base font-normal tracking-tighter">
              Please set up your new password:
            </h1>
          </div>
          <div className="border-b-2">
            <input
              className="w-full overflow-hidden text-Hifi-Color-Light-Grey leading-trim text-cap truncate font-Heebo text-lg font-light tracking-tighter"
              placeholder="Your new password"
              type="password"
              value={password1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword1(e.target.value)
              }
            ></input>
          </div>
          <div className="border-b-2">
            <input
              className="w-full overflow-hidden text-Hifi-Color-Light-Grey leading-trim text-cap truncate font-Heebo text-lg font-light tracking-tighter"
              placeholder="Confirm your new password"
              type="password"
              value={password2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword2(e.target.value)
              }
            ></input>
          </div>
          <div className="w-full flex justify-end">
            {/* <ButtonVar2
              logo={Arrow}
              onClick={() => {
                mutation.mutate({ password1, password2, email });
              }}
            ></ButtonVar2> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
