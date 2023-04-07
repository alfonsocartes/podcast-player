// The application must have a development mode where the assets are served without minimizing (they can be concatenated if desired) and another production mode where the assets must be served concatenated and minimized.

import Image from "next/image";

export function ImageAsset({ src, width, height, alt, className, ...props }) {
  return process.env.NODE_ENV === "development" ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
  ) : (
    <Image src={src} alt={alt} />
  );
}
