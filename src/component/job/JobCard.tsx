import displayJob from "../../assets/logoJobCard/displayJob.svg";
import time from "../../assets/logoJobCard/time.svg";
import disponibility from "../../assets/logoJobCard/disponibility.svg";
import location from "../../assets/logoJobCard/location.svg";
import Preferences from "./Preferences";
import { dislikeJob, likeJob } from "../../lib/job.request";
import Details from "./Details";
import { JobProps } from "../../lib/job.utils";
import Image from "../custom/Image";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import { motion, useAnimate } from "framer-motion";
import LoadingWithMenu from "../../Page/Loading/LoadingWithMenu";

interface DragInfo {
  offset: {
    x: number;
    y: number;
  };
}

function JobCard({
  jobData,
  togglePage,
  remove,
  layerOrder,
  ...props
}: {
  jobData: JobProps;
  togglePage: () => void;
  remove: () => void;
  layerOrder: number;
}) {
  const [scope, animate] = useAnimate();
  const percentageString = jobData.percentage || "";
  const percentageFloat = parseFloat(percentageString);
  const percentageInt = Math.round(percentageFloat);

  if (!jobData) {
    return <LoadingWithMenu />;
  }

  const preferencesData: { data: string; logo: string }[] = [
    {
      data: (jobData.duration ?? "").toString().replace(/_/g, " "),
      logo: time,
    },
    { data: jobData.location, logo: location },
    {
      data: jobData.work_rhythm.join(",").replace(/_/g, " "),
      logo: disponibility,
    },
  ];
  const detailsData: { data: string; logo: string }[] = [
    {
      data: jobData.salary ? jobData.salary.toString() + " €" : "",
      logo: time,
    },
    { data: jobData.fields.join(",").replace(/_/g, " "), logo: location },
  ];

  const preferenceStrings = preferencesData.reduce<string[]>(
    (acc, value) => acc.concat(value.data.split(",")),
    []
  );

  const detailStrings = detailsData.reduce<string[]>(
    (acc, value) => acc.concat(value.data.split(",")),
    []
  );
  const handleLike = async (id: number) => {
    await likeJob(id);
    console.log("job liké");
    remove();
  };

  const handleDislike = async (id: number) => {
    await dislikeJob(id);
    console.log("job disliké");
    remove();
  };

  async function handleDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: DragInfo
  ) {
    if (info && info.offset) {
      const offset = info.offset.x;
      if (scope.current) {
        if (offset > -300 && offset < 300) {
          await animate(scope.current, { x: 0, opacity: 1 }, { duration: 0.5 });
        } else {
          await animate(
            scope.current,
            { x: offset > 0 ? offset + 100 : offset - 100, opacity: 1 },
            { duration: 0.5 }
          );
          if (offset > 0) {
            handleLike(jobData.id);
          }
          if (offset < 0) {
            handleDislike(jobData.id);
          }
        }
      }
    }
  }

  return (
    <motion.div
      drag="x"
      dragDirectionLock
      onDragEnd={handleDragEnd}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      ref={scope}
      className="flex flex-col justify-between items-center w-full h-[720px] p-[20px] flex-shrink-0 border-2 bg-cover rounded-lg relative"
      style={{
        position: "absolute",
        top: "0%",
        left: "0%",
        zIndex: layerOrder,
        transform: "translateX(0px)",
      }}
      {...props}
    >
      <img
        src={jobData.image_font}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      ></img>
      <div className="flex w-full items-center justify-start pl-[26px] pt-[21px] pr-[15px]">
        <Image
          src={`${jobData.image_font}`}
          className="w-[50px] h-[50px] mr-[15px] rounded-[4px] shadow-sm bg-white border-2 border-black"
        />
        <div className="text-white text-center font-medium font-sans text-lg">
          {jobData.name}
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="text-white pb-[10px] pl-[5px] font-semibold text-lg tracking-tighter">
          {jobData.name}
        </div>
        <div className="flex flex-col w-full pl-[16px] pr-[24px] py-[19px] gap-[15px] rounded-[8px] bg-gradient-to-b from-gradientDetail to-gradientDetail2 backdrop-blur-16">
          <div className="flex w-full justify-between items-center">
            <div className="flex-col w-full">
              <div className="flex flex-wrap gap-[10px]">
                {preferenceStrings.map((item, index) => (
                  <Preferences
                    key={`preference-${index}`}
                    jobData={item.trim()}
                    logo={preferencesData[Math.floor(index / 3)].logo}
                  />
                ))}
              </div>
              <div className="text-center font-semibold text-lg">
                <p className="flex flex-start py-[15px] relative bg-clip-text text-base text-transparent bg-gradient-to-r from-gradientPink to-gradientPink2">
                  Compatibility with you: {percentageInt} %
                </p>
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {detailStrings.map((item, index) => (
                  <Details
                    key={`detail-${index}`}
                    jobData={item.trim()}
                    color="bg-gradient-to-r from-gradientGreen via-gradientGreen2 to-gradientGreen3"
                  />
                ))}
              </div>
            </div>
            <button
              className="w-[28px] h-[28px] ml-[10px]"
              onClick={togglePage}
            >
              <Image
                src={displayJob}
                alt={"button display description job"}
                className={
                  "text-white text-center font-medium font-sans text-base leading-normal tracking-tight uppercase"
                }
              />
            </button>
          </div>
        </div>
        <div className="w-full h-[60px] flex justify-evenly gap-[10px] mt-[10px]">
          <button onClick={() => handleDislike(jobData.id)}>
            <Image src={dislike} alt="dislike" className="h-[60px] w-[60px]" />
          </button>
          <button onClick={() => handleLike(jobData.id)}>
            <Image src={like} alt="like" className="h-[60px] w-[60px]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default JobCard;
