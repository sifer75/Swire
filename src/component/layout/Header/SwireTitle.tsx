import SwireLogo from "../../../assets/menu/SwireLogo.svg";

interface SwireHeaderProps {
  title: string;
}

function SwireTitle({ title }: SwireHeaderProps) {
  return (
    <div className="absolute top-[25%] w-full h-44 flex flex-col items-center justify-between">
      <img
        loading="lazy"
        src={SwireLogo}
        alt="logo swire"
        className="w-[62px] h-[88px]"
      ></img>
      <h1 className="text-colorTitle text-center font-heebo font-medium text-3xl tracking-[0.5px]">
        {title}
      </h1>
    </div>
  );
}

export default SwireTitle;
