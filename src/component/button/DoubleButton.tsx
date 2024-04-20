import ButtonColorImg from "./ButtonArrow";

interface DoubleButtonProps {
  disabled: boolean;
  selection1: string;
  selection2: string;
  onClick: () => void;
}

function DoubleButton({
  onClick,
  selection1,
  selection2,
  disabled,
}: DoubleButtonProps) {
  return (
    <div className="flex w-full justify-between items-center pt-[20px]">
      <ButtonColorImg
        background={"bg-gradient-to-l from-pink to-purple rotate-180"}
        selection={selection1}
      ></ButtonColorImg>
      <ButtonColorImg
        background={
          disabled === true
            ? "bg-gradient-to-r from-pink/70 to-purple/70"
            : "bg-gradient-to-r from-pink to-purple"
        }
        onClick={onClick}
        selection={selection2}
      ></ButtonColorImg>
    </div>
  );
}

export default DoubleButton;
