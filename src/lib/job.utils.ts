export interface JobProps {
  id?: number;
  name: string;
  imageFont: File | null;
  percentage?: string | undefined;
  disponibility: string[];
  time: number;
  location: string;
  language: string;
  target: string[];
  fields: string[];
  elem?: number;
  salary?: number | null;
  workRhythm: string[];
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
