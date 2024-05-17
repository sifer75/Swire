import { JobProps } from "../../lib/job.utils";
import Image from "../custom/Image";
import { useState, useEffect } from "react";
import { dislikeJob, likeJob } from "../../lib/job.request";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import time from "../../assets/logoJobCard/time.svg";
import location from "../../assets/logoJobCard/location.svg";
import Details from "./Details";
import { useRef, RefObject } from "react";
import displayJob from "../../assets/logoJobCard/displayJob.svg";
import LoadingWithMenu from "../../Page/Loading/LoadingWithMenu";

function useScroll(): { x: number; y: number; ref: RefObject<HTMLDivElement> } {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const handleScroll = () => {
    const element = ref.current;
    if (!element) return null;
    const content = element.getBoundingClientRect();
    setPos({
      x: Math.abs(content.x),
      y: Math.abs(content.y),
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  return { x: pos.x, y: pos.y, ref: ref };
}

function JobDescription({
  jobData,
  togglePage,
  remove,
  ...props
}: {
  jobData: JobProps;
  togglePage: () => void;
  remove: () => void;
}) {
  const { y, ref } = useScroll();

  if (!jobData) {
    return <LoadingWithMenu />;
  }

  const detailsData: { data: string; logo: string }[] = [
    {
      data: jobData.salary ? jobData.salary.toString() + " €" : "",
      logo: time,
    },
    { data: jobData.fields.join(",").replace(/_/g, " "), logo: location },
  ];

  const handleLike = async (id: number) => {
    await likeJob(id);
    remove();
    togglePage();
    console.log("job liké");
  };

  const handleDislike = async (id: number) => {
    await dislikeJob(id);
    remove();
    togglePage();
    console.log("job disliké");
  };

  return (
    <div className="h-full w-full" ref={ref}>
      <div
        className={`flex items-end w-full  flex-shrink-0 bg-cover fixed h-[200px]`}
        style={{
          transform: `translate(0,-${y > 100 ? 100 : y}px)`,
        }}
        {...props}
      >
        <img src={jobData.image_font}></img>
        <Image
          src={displayJob}
          className="rotate-180 absolute top-5 left-5 rounded-full w-12 h-12"
          onClick={() => togglePage()}
        ></Image>
        <div className="flex w-full items-center px-10 h-[100px] gap-2.5">
          <Image
            src={`${jobData.image_font}`}
            className="w-[50px] h-[50px] rounded-md shadow-sm bg-white border-2 border-black"
          ></Image>
          <div className="text-white text-center font-medium font-sans text-lg">
            {jobData.name}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-start mt-[200px]">
        <h1 className="font-heebo flex-shrink-0 text-black text-center font-medium text-2xl leading-normal tracking-wide pt-[25px]">
          Your compatibility with position
        </h1>
        <div className="flex flex-wrap gap-[10px] p-[25px]">
          {detailsData.map((value, index) => {
            const dataItems = value.data.split(",");
            return (
              <div
                key={`detail-${index}`}
                className="flex gap-[12px] flex-wrap"
              >
                {dataItems.map((item, subIndex) => (
                  <Details
                    key={`detail-${index}-${subIndex}`}
                    jobData={item.trim()}
                    color="bg-[#4EA957]"
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-5 w-full h-full">
        <div className="bg-[#A100FF] w-full rounded-sm py-[17px] shadow-2xl">
          <h1 className="w-full flex justify-start pl-[23px] items-center h-8 gap-2 text-white font-semibold text-xl">
            Position Description
          </h1>
        </div>
        <div className="w-full gap-2 border-2 border-[#6F6F6F]">
          <div className="grid grid-cols-1 py-[15px] px-[23px] flex-col">
            <h2 className="w-full justify-start font-semibold text-base leading-normal">
              💼 Job Description :
            </h2>
            <p className="w-full text-colorText justify-start font-semibold text-base leading-normal">
              {jobData.job_description}
            </p>

            <h2 className="w-full justify-start font-semibold text-base leading-normal">
              📊 Your Mission:
            </h2>
            {jobData.mission}
            <h2 className="w-full justify-start font-semibold text-base leading-normal">
              📊 Your Competences:
            </h2>
            {jobData.competence}
            <h2 className="w-full justify-start font-semibold text-base leading-normal">
              📊 Description:
            </h2>
            {jobData.description}
            <h2 className="w-full justify-start font-semibold text-base leading-normal">
              📊 Your Value:
            </h2>
            {jobData.value}
          </div>
        </div>
      </div>
      <div className="fixed bottom-32 w-full h-[60px] flex  items-center justify-evenly gap-[10px] z-10">
        <button onClick={() => handleLike(jobData.id)}>
          <Image src={dislike} alt="dislike" className="h-[60px] w-[60px]" />
        </button>
        <button onClick={() => handleDislike(jobData.id)}>
          <Image src={like} alt="like" className="h-[60px] w-[60px]" />
        </button>
      </div>
    </div>
  );
}

export default JobDescription;
