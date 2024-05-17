import ManLogo from "../../../assets/menu/man.svg";
import Match from "../../../assets/menu/match.svg";
import Swire from "../../../assets/menu/SwireLogo.svg";
import { Link } from "react-router-dom";

function Menu() {
  const selection = [
    { name: "/swire", src: Swire, alt: "logo swire" },
    { name: "/match", src: Match, alt: "match" },
    { name: "/account", src: ManLogo, alt: "personnage" },
  ];
  return (
    <div className="w-full min-h-[83px] flex justify-around items-center">
      {selection.map((item, index: number) => (
        <Link to={item.name} key={index}>
          <button>
            <img
              loading="lazy"
              className="h-[30px]"
              src={item.src}
              alt={item.alt}
            ></img>
          </button>
        </Link>
      ))}
    </div>
  );
}

export default Menu;
