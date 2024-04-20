export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ButtonVar1(props: ButtonProps) {
  return (
    <button
      className="flex w-full py-5 justify-center items-center gap-[10px] flex-shrink-0 rounded-full bg-gradient-to-r from-pink to-purple text-white text-center font-heebo font-medium text-xl leading-none tracking-[0.5px] disabled:from-purple-600/70 disabled:to-pink-500/70"
      {...props}
    />
  );
}
