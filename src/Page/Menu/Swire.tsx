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

function useJobs() {
  const queue = useQueue<JobProps>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await getJobs();

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

    if (!ref.current) {
      fetchJobs();
      ref.current = true;
    }
  }, [queue]);

  return { queue, isLoading, isError };
}

function Swire() {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const { queue, isLoading, isError } = useJobs();
  if (isLoading) return <LoadingWithMenu />;
  if (isError) return <LoadingWithMenu />;
  if (queue.size === 0) return <LoadingWithMenu />;

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
              {queue.queue.map((elem, index) => {
                return (
                  <JobCard
                    layerOrder={queue.size - index}
                    key={`jobData-${elem.id}`}
                    jobData={elem as JobProps}
                    togglePage={toggleDescription}
                    remove={queue.remove}
                  />
                );
              })}
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
