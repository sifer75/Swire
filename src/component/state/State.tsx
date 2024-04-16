interface StateProps {
  task: boolean;
}

function State({ task }: StateProps) {
  return (
    <div
      className={`w-1/3 h-[7px] items-start gap-[7px] rounded-[2px] mr-[7px] task ${
        task ? "bg-purple" : "bg-blue-200"
      }`}
    ></div>
  );
}

export default State;
