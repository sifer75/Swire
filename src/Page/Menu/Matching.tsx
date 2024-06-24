import MatchCard from "../../component/match/matchCard";
import Menu from "../../component/layout/Menu/Menu";
import Header from "../../component/layout/Header/Header";
import Background from "../../assets/background/background3.svg";
import { useQuery } from "@tanstack/react-query";
import { getMatchNumber } from "../../lib/job.request";
import LoadingWithMenu from "../Loading/LoadingWithMenu";

function Matching() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMatchNumber,
  });

  if (isError || isLoading) return <LoadingWithMenu />;
  return (
    <div
      className="w-full h-screen flex items-center justify-between flex-col p-[20px] bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Header />
      <div className="flex-grow w-full">
        <div className="w-full h-[81px] flex flex-col justify-between mb-4">
          <p className="text-black font-heebo font-bold text-2xl leading-9 h-[36px] ">
            Matches
          </p>
          <p className="text-black font-heebo font-medium text-lg leading-[30px] h-[30px]">
            Your matched offer {data}
          </p>
        </div>
        <div className="overflow-y-auto">
          <MatchCard />
          <MatchCard />
          <MatchCard />
        </div>
      </div>
      <Menu />
    </div>
  );
}

export default Matching;
