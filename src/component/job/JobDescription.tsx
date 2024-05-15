import { JobProps, PreferencesProps } from "../../lib/job.utils";
import Image from "../custom/Image";
import { useState, useEffect } from "react";
import { dislikeJob, likeJob } from "../../lib/job.request";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import time from "../../assets/logoJobCard/time.svg";
import disponibility from "../../assets/logoJobCard/disponibility.svg";
import location from "../../assets/logoJobCard/location.svg";
import Details from "./Details";
import { useRef, RefObject } from "react";
import displayJob from "../../assets/logoJobCard/displayJob.svg";

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
    return <p>pas de job</p>;
  }

  const preferencesData = [
    { data: jobData.disponibility, logo: disponibility },
    { data: jobData.target, logo: time },
    { data: jobData.location, logo: location },
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
          backgroundImage: `url(http://localhost:3333/uploads/${jobData.image_font})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translate(0,-${y > 100 ? 100 : y}px)`,
        }}
        {...props}
      >
        <Image
          src={displayJob}
          className="rotate-180 absolute top-5 left-5 rounded-full w-12 h-12"
          onClick={() => togglePage()}
        ></Image>
        <div className="flex w-full items-center px-10 h-[100px] gap-2.5">
          <Image
            src={`http://localhost:3333/uploads/${jobData.logo}`}
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
          {preferencesData.map(({ data }: PreferencesProps, index: number) => (
            <Details key={index} jobData={data} color="bg-[#4EA957]" />
          ))}
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
              As an IT Consultant, you will work closely with our client’s
              leadership teams to understand their key challenges, define IT
              strategies, win buy-in for your recommendations and collaborate
              with BCG case team members to transform client potential into
              performance.💼 Job Description : As an IT Consultant, you will
              work closely with our client’s leadership teams to understand
              their key challenges, define IT strategies, win buy-in for your
              recommendations and collaborate with BCG case team members to
              transform client potential into performance. 📊 Your Mission: To
              provide evidence of capability to fulfil concrete work
              specifications, the contractor shall address the following
              requests as part of the response: Provide resumes of contractors
              with skillset matching the criteria Portfolio demonstrating solid
              UX/UI work experience 💪 Your Competence: Excellent knowledge of
              UX methodologies and the ability to determine the appropriate
              methodological approach based on the need and context. Good
              understanding of constraints addressed by graphic and technical
              profiles. Ability to present deliverables, defend and argue for
              defined principles to various profiles (operational, field agents,
              managers). 💥 Your Experience: A streamlined recruitment process
              Permanent employment at Aubay, with long-term missions lasting 2-3
              years for our major clients A community of experts for exchanging
              and sharing knowledge through meetups, blogs, etc. Personalized
              support for technical and functional skills development, including
              access to certifications (provision of Udemy licenses, training
              opportunities, etc.)
            </p>

            <h2 className="w-full justify-start font-semibold text-base leading-normal">
              📊 Your Mission:
            </h2>
            <p className="w-full text-colorText justify-start font-semibold text-base leading-normal">
              To provide evidence of capability to fulfil concrete work
              specifications, the contractor shall address the following
              requests as part of the response:
            </p>
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
