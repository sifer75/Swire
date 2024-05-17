import UserCard from "../../component/account/UserCard";
import Header from "../../component/layout/Header/Header";
import Menu from "../../component/layout/Menu/Menu";
import CompanyCard from "../../component/account/CompanyCard";
import Background from "../../assets/background/background3.svg";

function Account() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-between flex-col p-[20px] bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Header />
      <div className="flex-grow w-full">
        <div className="w-full h-[70px] items-start justify-start">
          <p className="text-[#1A1A1A] font-heebo font-bold text-2xl leading-9">
            My Account
          </p>
        </div>
        <div>
          <div>
            <UserCard />
          </div>
          <CompanyCard />
        </div>
      </div>
      <div className="w-full h-full flex flex-col flex-grow justify-center items-center">
        <p className="text-gray-500 text-center leading-[22.5px] font-ibm-plex-sans font-medium text-sm tracking-[0.5px]">
          Swire Version 1.0
        </p>
      </div>
      <Menu />
    </div>
  );
}

export default Account;
