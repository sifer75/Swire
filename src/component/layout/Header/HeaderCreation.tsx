import State from "../../../component/state/State";
import Image from "../../custom/Image";

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
      <div className="w-full h-[33px] text-colorText font-heebo text-xl font-medium leading-8 tracking-wider">
          {title}
      </div>
      <div className="flex items-end justify-between my-[16px]">
        <Image src={logo} alt="logo cv" />
        <Image className="w-[141px] h-[123px]"
          src={image}
          alt="decoration"/>
        
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
