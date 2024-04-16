import { Link } from 'react-router-dom'

interface SelectionMenuProps {
    logo: string,
    alt: string
}

function SelectionMenu({logo, alt}: SelectionMenuProps) {
  return (
    <Link to={"/swire"}>
    <button>
      <img
        loading="lazy"
        className="h-[30px]"
        src={logo}
        alt={alt}
      ></img>
    </button>
  </Link>
  )
}

export default SelectionMenu