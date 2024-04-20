import { Link } from "react-router-dom";

export interface ButtonArrowProps {
  disabled?: boolean;
  background: string;
  onClick?: () => void;
  selection: string;
}

function ButtonArrow({
  background,
  onClick,
  selection,
  disabled,
}: ButtonArrowProps) {
  console.log(disabled);
  return (
    <Link to={selection}>
      <button
        className={`flex w-[122px] h-[55px] p-[10px] justify-center items-center gap-[10px] flex-shrink-0 rounded-full ${background}`}
        onClick={onClick}
        disabled={disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-right"
        >
          <path d="M18 8L22 12L18 16" />
          <path d="M2 12H22" />
        </svg>
      </button>
    </Link>
  );
}

export default ButtonArrow;
