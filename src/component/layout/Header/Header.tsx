import Swire from "../../../assets/menu/SwireLogo.svg";
function Header() {
  return (
    <div className="w-full h-[80px] flex justify-center items-center">
      <div className="h-[63px] w-[32px] flex justify-center items-center">
        <img loading="lazy" src={Swire} alt="logo swire + name"></img>
      </div>
    </div>
  );
}

export default Header;
