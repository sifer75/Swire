interface detailsProps {
  jobData: string;
  color: string;
}

function Details({ jobData, color }: detailsProps) {
  return (
    <div
      className={`flex justify-center items-center h-[25px] gap-[5px] p-[10px] rounded-full ${color}`}
    >
      <p className="text-white text-xs">{jobData}</p>
    </div>
  );
}

export default Details;
