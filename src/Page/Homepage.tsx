import Background from "../assets/background/background1.svg";
import SwireHeader from "../component/layout/Header/SwireTitle";
import { SelectionChoice } from "../component/button/SelectionChoice";

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
        <SelectionChoice
          choice1={"Create account"}
          choice2={"Sign in"}
          choice1Link={"/createAccount"}
          choice2Link={"/login"}
        />
      </div>
    </>
  );
}
