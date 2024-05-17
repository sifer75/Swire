import Image from "../../assets/menu/SwireLogo.svg";
import Background from "../../assets/background/background1.svg";
import Settings from "./Settings";
import Interview from "../../assets/interview.svg";
import Profile from "../../assets/profile.svg";
import Confidentiality from "../../assets/confidentiality.svg";
import SettingsLogo from "../../assets/settings.svg";
import PrivacyNotice from "../../assets/privacyPolice.svg";

function CompanyCard() {
  return (
    <div>
      <div
        className="w-full h-[117px] flex items-center rounded-[6px] border-indigo-400 pl-[30px] mb-[20px] bg-cover"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="w-[77px] h-[77px] pr-[20px] flex items-center justify-center">
          <img
            loading="lazy"
            src={Image}
            className="w-[47px] h-[47px]"
            alt="logo user"
          ></img>
        </div>
        <div className="h-[77px] flex flex-col justify-around">
          <p>Your next interview information</p>
          <p>width: name company</p>
          <p>on: date interview</p>
          <p>at: location interview</p>
        </div>
      </div>
      <div>
        <Settings logo={Interview} name={"Interview"} />
        <Settings logo={Profile} name={"Modify My Profile"} />
        <Settings logo={Confidentiality} name={"Confidentiality"} />
        <Settings logo={SettingsLogo} name={"Settings"} />
        <Settings logo={PrivacyNotice} name={"Privacy Notice"} />
      </div>
    </div>
  );
}

export default CompanyCard;
