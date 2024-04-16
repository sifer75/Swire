export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="flex text-center w-11/12 p-2.5 text-xl font-medium rounded-full border-2 placeholder-LightGray text-LightGray border-#BFBFBF outline-none focus:border-black tracking-[0.5px] shadow-sm shadow-shadow"
      {...props}
    />
  );
}
