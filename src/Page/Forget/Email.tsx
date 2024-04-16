import ButtonVar2 from "../../component/button/ButtonVar2";
import Swire from "../../assets/menu/SwireLogo.svg";
import Background from "../../assets/background/background1.svg";
import Arrow from "../../assets/arrow/arrow.svg";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function ForgetEmail() {
  const [email, setEmail] = useState("");
  // const navigate = useNavigate();

  // const handleNavigate = () => {
  //   navigate("/forget/password", { state: { email } });
  // };

  return (
    <>
      <div
        className="h-screen w-full flex flex-col justify-center items-center p-[40px]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="h-[300px] w-full flex flex-col justify-between ">
          <div>
            <img loading="lazy" src={Swire} alt="logo swire"></img>
          </div>
          <div className="w-full flex justify-center ">
            <h1 className="text-gray-500 leading-tight text-top uppercase font-heebo text-base font-normal tracking-tighter">
              No worries! Can we have your email?
            </h1>
          </div>
          <div className="border-b-2">
            <input
              className="w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="w-full flex justify-end">
            {/* <ButtonVar2 logo={Arrow} onClick={handleNavigate}></ButtonVar2> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetEmail;
