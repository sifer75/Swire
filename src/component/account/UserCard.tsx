import Image from "../../assets/menu/SwireLogo.svg";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../lib/user.request";

function UserCard() {
  const {
    data: userData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  if (!userData || !userData.name || !userData.email)
    return <div>non trouvé</div>;
  if (isError) return <div>erreur</div>;
  if (isLoading) return <div>chargement///</div>;
  return (
    <div className="w-full h-[77px] flex items-center border-2 rounded-[6px] border-indigo-400 pl-[30px] mb-[20px]">
      <div className="w-[77px] h-[77px] pr-[20px] flex items-center justify-center">
        <img
          loading="lazy"
          src={Image}
          className="w-[47px] h-[47px]"
          alt="logo user"
        ></img>
      </div>
      <div className="h-[77px] flex flex-col justify-around">
        <p>{userData.name}</p>
        <p>{userData.email}</p>
      </div>
    </div>
  );
}

export default UserCard;
