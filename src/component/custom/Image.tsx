export interface ImageProps
  extends React.InputHTMLAttributes<HTMLImageElement> {}

function Image({ className, src, alt, ...props }: ImageProps) {
  return <img {...props} src={src} className={className} alt={alt}></img>;
}

export default Image;
