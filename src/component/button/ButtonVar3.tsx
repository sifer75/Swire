interface ButtonVar3Props {
  text: string;
  background?: boolean;
  onClick: () => void;
}
function ButtonVar3({ text, background, onClick }: ButtonVar3Props) {
  return (
    <button
      className={`flex h-[40px] p-[15px] gap-[17px] m-[10px] items-center align-middle justify-center flex-shrink-0 border-2 border-Hifi-Color-Light-Grey rounded-full ${
        background ? "bg-gray-300" : "bg-white"
      }`}
      onClick={onClick}
    >
      <p className="text-gray-400 font-sans text-base font-medium leading-6">
        {text}
      </p>
    </button>
  );
}

export default ButtonVar3;
