import { JobProps, PreferencesProps } from "../../lib/job.utils";
import Image from "../custom/Image";
import { dislikeJob, likeJob } from "../../lib/job.request";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import time from "../../assets/logo/time.svg";
import disponibility from "../../assets/logo/disponibility.svg";
import location from "../../assets/logo/location.svg";
import Details from "./Details";

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

    console.log("job liké");
    remove();
    togglePage();
  };

  const handleDislike = async (id: number) => {
    await dislikeJob(id);

    console.log("job disliké");
    remove();
    togglePage();
  };

  return (
    <>
      <div
        className="flex items-end w-full p-[35px] h-[300px] flex-shrink-0 bg-cover gap-[25px]"
        style={{
          backgroundImage: `url(${jobData.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => togglePage()}
        {...props}
      >
        <div className="flex w-full items-center justify-start p-[28px] gap-[15px]">
          <div className="w-[50px] h-[50px]rounded-md shadow-sm bg-white"></div>
          <div className="text-white text-center font-medium font-sans text-lg">
            Swire
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        <h1 className="font-heebo flex-shrink-0 text-black text-center font-medium text-2xl leading-normal tracking-wide pt-[25px]">
          Your compatibility with position
        </h1>
        <div className="flex flex-wrap gap-[10px] p-[25px]">
          {preferencesData.map(({ data }: PreferencesProps, index: number) => (
            <Details key={index} jobData={data} color="bg-[#4EA957]" />
          ))}
        </div>
      </div>
      <div className="bg-[#A100FF] w-full rounded-sm py-[17px] shadow-2xl px-[20px]">
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
            strategies, win buy-in for your recommendations and collaborate with
            BCG case team members to transform client potential into
            performance.💼 Job Description : As an IT Consultant, you will work
            closely with our client’s leadership teams to understand their key
            challenges, define IT strategies, win buy-in for your
            recommendations and collaborate with BCG case team members to
            transform client potential into performance. 📊 Your Mission: To
            provide evidence of capability to fulfil concrete work
            specifications, the contractor shall address the following requests
            as part of the response: Provide resumes of contractors with
            skillset matching the criteria Portfolio demonstrating solid UX/UI
            work experience 💪 Your Competence: Excellent knowledge of UX
            methodologies and the ability to determine the appropriate
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
            specifications, the contractor shall address the following requests
            as part of the response:
          </p>
        </div>
      </div>
      <div className="fixed bottom-24 w-full h-[60px] flex  items-center justify-evenly gap-[10px] z-10">
        <button onClick={() => handleLike(jobData.id)}>
          <Image src={dislike} alt="dislike" className="h-[60px] w-[60px]" />
        </button>
        <button onClick={() => handleDislike(jobData.id)}>
          <Image src={like} alt="like" className="h-[60px] w-[60px]" />
        </button>
      </div>
    </>
  );
}

export default JobDescription;
