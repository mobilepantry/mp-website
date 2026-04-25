import type { ImgHTMLAttributes } from "react";
import type { Picture as PictureData } from "vite-imagetools";

type PictureProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  data: PictureData;
  sizes?: string;
};

export const Picture = ({ data, sizes, alt, ...imgProps }: PictureProps) => (
  <picture>
    {Object.entries(data.sources).map(([type, srcSet]) => (
      <source key={type} type={`image/${type}`} srcSet={srcSet} sizes={sizes} />
    ))}
    <img
      src={data.img.src}
      width={data.img.w}
      height={data.img.h}
      alt={alt}
      {...imgProps}
    />
  </picture>
);
