interface ButtonVar2Props {
  logo: string;
  onClick?: () => void;
  disabled:boolean
}

function ButtonVar2({ logo, onClick, disabled=false }: ButtonVar2Props) {
  return (
    <button
      className="flex w-[102px] h-[35px] px-[30px] py-[20px] justify-center items-center gap-[10px] flex-shrink-0 rounded-full bg-gradient-to-l from-purple-600 to-pink-500 disabled:from-purple-600/70 disabled:to-pink-500/70"
      onClick={onClick}
      disabled={disabled}
    >
      <img loading="lazy" src={logo}></img>
    </button>
  );
}

export default ButtonVar2;
