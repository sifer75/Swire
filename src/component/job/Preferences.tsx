interface PreferencesProps {
  jobData: string;
  logo: string;
}

function Preferences({ logo, jobData }: PreferencesProps) {
  return (
    <div className="flex items-center gap-[5px]">
      <img loading="lazy" src={logo} alt="logo du temps"></img>
      <p className="text-white text-center leading-normal font-ibm-plex-sans font-medium text-sm tracking-tight">
        {jobData}
      </p>
    </div>
  );
}

export default Preferences;
