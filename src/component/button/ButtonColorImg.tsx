import { Link } from "react-router-dom";

export interface ButtonColorImgProps {
  background: string;
  onClick?: () => void;
  selection: string;
}

function ButtonColorImg({
  background,
  onClick,
  selection,
}: ButtonColorImgProps) {
  return (
    <Link to={selection}>
      <div
        className={`flex w-[122px] h-[55px] p-[10px] justify-center items-center gap-[10px] flex-shrink-0 rounded-full ${background}`}
        onClick={onClick}
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
      </div>
    </Link>
  );
}

export default ButtonColorImg;
