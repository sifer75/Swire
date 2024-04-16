export interface JobProps {
  id: number;
  name: string;
  image: string;
  percentage: string;
  disponibility: string;
  time: string;
  location: string;
  language: string;
  target: string;
  elem: number;
}

export interface ButtonProps {
  onClick: () => void;
  src: string;
  alt: string;
}

export interface PreferencesProps {
  data: string;
  logo: string;
}
