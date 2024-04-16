import State from "../../../component/state/State";

interface HeaderCreationProps {
  state: boolean[];
  text: string;
  title: string;
  image: string;
  logo: string;
}

function HeaderCreation({
  state,
  text,
  title,
  image,
  logo,
}: HeaderCreationProps) {
  return (
    <div className="w-full pl-[10px]">
      <div className="w-[301px] h-[33px]">
        <p className="text-gray-600 font-heebo text-lg font-medium leading-relaxed tracking-wider">
          {title}
        </p>
      </div>
      <div className="flex items-end justify-between my-[16px]">
        <img loading="lazy" src={logo} alt="logo cv"></img>
        <img
          loading="lazy"
          className="w-[141px] h-[123px]"
          src={image}
          alt=""
        ></img>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="w-2/3 overflow-hidden overflow-ellipsis whitespace-nowrap text-black font-heebo text-xl font-medium leading-relaxed tracking-wider">
          {text}
        </p>
        <div className="flex-1 flex">
          {state.map((task: boolean, index: number) => (
            <State key={index} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderCreation;
