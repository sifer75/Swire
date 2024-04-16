interface EnumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  checked: boolean;
}

function EnumCard({ name, checked, ...props }: EnumCardProps) {
  return (
    <div
      {...props}
      className="w-full flex items-center justify-between px-2 py-4 border-b-2 border-gray-300"
    >
      <h2 className="text-black font-ibm-plex-sans font-medium text-lg ">
        {name}
      </h2>
      <div
        className={`relative w-5 h-5 rounded-md ${
          checked ? "bg-[#9024FF]" : "bg-gray-200"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`lucide lucide-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            checked ? "text-white" : "text-transparent"
          }`}
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
    </div>
  );
}

export default EnumCard;
