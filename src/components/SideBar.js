import Link from "next/link";
import { ImageAsset } from "./ImageAsset";

export function SideBar({ podcast, link }) {
  return (
    <div className="bg-white rounded-sm shadow-md p-4 border">
      <div className="flex flex-col space-y-4 ">
        <Link href={link}>
          <figure className="relative w-48 rounded-md overflow-hidden self-center">
            <ImageAsset
              src={podcast.image}
              alt={podcast.title + " cover"}
              width={600}
              height={600}
            />
          </figure>
        </Link>
        <hr className="border-1 border-slate-300" />
        <Link href={link}>
          <p className="font-bold">{podcast.title}</p>
          <p className="italic">by {podcast.author}</p>
        </Link>
        <hr className="border-1 border-slate-300" />
        <div>
          <p className="font-bold">Description:</p>
          <div
            className="prose italic"
            dangerouslySetInnerHTML={{ __html: podcast.description }}
          />
        </div>
      </div>
    </div>
  );
}
