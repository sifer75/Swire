import img from "../../assets/dislike.svg";
import State from "../../component/state/State";

function matchCard() {
  const step = ["Matched", "Interview", "Feedback"];

  return (
    <div className="border-b-2 border-gray-300 mb-[17px]">
      <div className="w-[360px] h-[62px] flex mb-[16px]">
        <div className="flex items-center justify-center mr-[13px]">
          <img
            loading="lazy"
            src={img}
            className="w-[60px] h-[60px] flex-shrink-0 rounded-6 bg-cover bg-no-repeat bg-center shadow-md"
            alt="logo company"
          ></img>
        </div>
        <div className="flex flex-col">
          <p className="text-black font-ibm-plex-sans font-medium text-lg leading-">
            Title Company
          </p>
          <div className="flex">
            <State task={true} />
            <State task={!true} />
            <State task={!true} />
          </div>
          <p className="text-gray-500 font-ibm-plex-sans text-base font-normal leading-6 tracking-tight">
            {step[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default matchCard;
