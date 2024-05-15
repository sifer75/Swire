import Header from "../../component/layout/Header/Header";
import Menu from "../../component/layout/Menu/Menu";
import Background from "../../assets/background/background3.svg";

export default function LoadingWithMenu() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div
        className={`w-full h-full flex overflow-y-scroll flex-col bg-cover`}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <Header />
        <div className="w-full h-full flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin text-gradientPink"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      </div>
      <div className="px-5 pb-5">
        <Menu />
      </div>
    </div>
  );
}
