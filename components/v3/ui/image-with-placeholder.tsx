import Image, { ImageProps } from "next/image";
import Skeleton from "./skeleton";

interface Props extends ImageProps {
  containerClassName?: string;
}

export default function ImageWithPlaceholder({
  containerClassName,
  className,
  alt,
  ...props
}: Props) {
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <div className="absolute inset-0 z-10 animate-pulse">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      <Image
        {...props}
        alt={alt}
        className={`transition-opacity duration-500 select-none ${className}`}
        draggable={false}
      />
    </div>
  );
}


