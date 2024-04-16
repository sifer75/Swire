import { Link } from "react-router-dom";
import ButtonVar1 from "./ButtonVar1";

export interface ChoiceProps {
  onSubmit?: () => void;
  disabled?: boolean;
  choice1: string;
  choice2: string;
  choice1Link?: string | undefined;
  choice2Link: string;
}

export const SelectionChoice: React.FC<ChoiceProps> = ({
  onSubmit,
  disabled,
  choice1,
  choice2,
  choice1Link,
  choice2Link,
}) => {
  return (
      <div className=" h-32 flex flex-col items-center justify-between w-full">
        {choice1Link ? (
          <Link to={choice1Link} className="w-full">
            <ButtonVar1 onClick={onSubmit} disabled={disabled}>
              {choice1}
            </ButtonVar1>
          </Link>
        ) : (
          <ButtonVar1 onClick={onSubmit} disabled={disabled}>
            {choice1}
          </ButtonVar1>
        )}
        <Link to={choice2Link}>
          <p className="text-colorText text-center leading-normal font-heebo font-medium text-xl tracking-[0.5px]">
            {choice2}
          </p>
        </Link>
      </div>
  );
};
