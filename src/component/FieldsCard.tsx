import Image from "./custom/Image";

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  logo: string;
  selected: boolean;
}

function FieldsCard({
  name,
  description,
  logo,
  selected,
  ...props
}: FieldProps) {
  return (
    <div
      {...props}
      className={`flex flex-col items-start w-full h-[177px] justify-between p-[10px] rounded-lg border-2 gap-[10px] ${
        selected ? "border-black" : "border-gray-300"
      }`}
    >
      <div className="w-[30px] h-[30px] rounded-sm bg-gray-300">
        <Image src={logo} alt="logo"/>
      </div>
      <div className="w-[150px] h-[114px] text-left flex flex-col justify-around">
        <h1 className="flex justify-start items-center flex-shrink-0 text-black font-medium text-l">
          {name}
        </h1>
        <p className="text-gray-600 font-ibm-plex-sans text-sm font-normal leading-tight text-left">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FieldsCard;
