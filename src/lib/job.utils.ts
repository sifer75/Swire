export interface JobProps {
  id: number;
  name: string;
  salary: number;
  percentage: string;
  time: number;
  location: string;
  language: string;
  work_rhythm: string[];
  duration: string[];
  target: string[];
  disponibility: string[];
  fields: string[];
  experience: string[];
  image_font: string;
  job_description: string;
  mission: string;
  description: string;
  value: string;
  competence: string;
}

export interface ButtonProps {
  onClick: () => void;
  src: string;
  alt: string;
}
