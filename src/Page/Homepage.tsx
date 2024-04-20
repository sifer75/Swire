import Background from "../assets/background/background1.svg";
import SwireHeader from "../component/layout/Header/SwireTitle";
import { Link } from "react-router-dom";
import ButtonVar1 from "../component/button/ButtonText";

export default function Homepage() {
  return (
    <>
      <SwireHeader title={"Internship at first sight."} />
      <div
        className="static w-screen h-screen  flex flex-col justify-end items-center p-[52px] bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <p className="text-colorText text-center font-heebo font-medium text-xs leading-normal tracking-[0.5px] pb-[38px]">
          By tapping Sign-In or Create Account, you agree to our Terms of
          Service. Learn how we process your data in your Privacy Policy and
          Cookies Policy.
        </p>
        <div className=" h-32 flex flex-col items-center justify-between w-full">
          <Link to={"/createAccount"} className="w-full">
            <ButtonVar1>Create account</ButtonVar1>
          </Link>
          <Link to={"/login"}>
            <p className="text-colorText text-center leading-normal font-heebo font-medium text-xl tracking-[0.5px]">
              Sign in
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
