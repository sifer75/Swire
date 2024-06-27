import { getJobs } from "../../lib/job.request";
import JobCard from "../../component/job/JobCard";
import Menu from "../../component/layout/Menu/Menu";
import Background from "../../assets/background/background3.svg";
import { useEffect, useState } from "react";
import { JobProps } from "../../lib/job.utils";
import Header from "../../component/layout/Header/Header";
import { useQueue } from "@uidotdev/usehooks";
import { useRef } from "react";
import JobDescription from "../../component/job/JobDescription";
import LoadingWithMenu from "../Loading/LoadingWithMenu";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../lib/user.request";

function useJobs() {
  const queue = useQueue<JobProps>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const ref = useRef(false);

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  useEffect(() => {
    if (userData && !ref.current) {
      const fetchJobs = async () => {
        try {
          setIsLoading(true);
          const data = await getJobs();
          console.log(data, "user");
          const uniqueJobs = new Set();
          data.forEach((job: JobProps) => {
            if (!uniqueJobs.has(job.id)) {
              uniqueJobs.add(job.id);
              queue.add(job);
            }
          });

          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
        }
      };

      fetchJobs();
      ref.current = true;
    }
  }, [queue, userData]);
  return { queue, isLoading, isError };
}

function Swire() {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const { queue, isLoading, isError } = useJobs();

  if (isLoading || isError || queue.size === 0) {
    return <LoadingWithMenu />;
  }

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <div
        className={`w-full h-full flex overflow-y-scroll flex-col ${
          isDescriptionOpen ? "" : "px-5"
        } bg-cover`}
        style={{ backgroundImage: `url(${Background})` }}
      >
        {isDescriptionOpen ? (
          <JobDescription
            jobData={queue.first as JobProps}
            togglePage={toggleDescription}
            remove={queue.remove}
          />
        ) : (
          <>
            <Header />
            <div className="relative w-full h-full">
              {queue.queue.map((elem: JobProps, index: number) => (
                <JobCard
                  layerOrder={queue.size - index}
                  key={`jobData-${elem.id}`}
                  jobData={elem as JobProps}
                  togglePage={toggleDescription}
                  remove={queue.remove}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="px-5 pb-5">
        <Menu />
      </div>
    </div>
  );
}

export default Swire;
