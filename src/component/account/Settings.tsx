import Arrow from "../../assets/arrow.svg";

function Settings({ logo, name }: any) {
  return (
    <div className="w-full h-[50px] flex pl-[20px] flex-shrink-0 bg-purple-100">
      <div className="flex items-center">
        <div className="mr-[15px]">
          <img loading="lazy" src={logo} alt="logo"></img>
        </div>
      </div>
      <div className="w-11/12 h-[50px] flex items-center justify-between  border-b-2 border-gray-400">
        <div>
          <p>{name}</p>
        </div>
        <div className="pr-[20px]">
          <img loading="lazy" src={Arrow} alt="logo arrow"></img>
        </div>
      </div>
    </div>
  );
}

export default Settings;
