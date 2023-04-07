import { ImageAsset } from "@/components/ImageAsset";
import Link from "next/link";
import { useState } from "react";

export default function Home({ entries }) {
  const [podcasts, setPodcasts] = useState(entries);

  function filterPodcasts(e) {
    if (e.target.value === "") return setPodcasts(entries);
    const filteredPodcasts = entries.filter((entry) =>
      entry.title.label
        .toLowerCase()
        .includes(
          e.target.value.toLowerCase() ||
            entry["im:artist"].label
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
        )
    );
    setPodcasts(filteredPodcasts);
  }

  return (
    <main className="flex flex-col items-center justify-between p-6">
      <div className="flex space-x-2 items-center place-self-end">
        <span className="bg-sky-600 px-1 text-white font-bold rounded-lg">
          100
        </span>
        <input
          type="text"
          name="filter"
          id="filter"
          onChange={(e) => {
            filterPodcasts(e);
          }}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="Filter podcasts..."
        />
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 lg:gap-y-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {podcasts.map((entry) => (
          <li key={entry.id.attributes["im:id"]} className="pt-24">
            <Link href={`podcast/${entry.id.attributes["im:id"]}`}>
              <div className="bg-white rounded-sm shadow-md p-4 border">
                <div className="flex flex-col items-center relative">
                  <figure className="absolute w-24 rounded-full overflow-hidden -translate-y-16">
                    <ImageAsset
                      src={entry["im:image"][2].label}
                      alt="Podcast cover"
                      width={Number(entry["im:image"][2].attributes.height)}
                      height={Number(entry["im:image"][2].attributes.height)}
                    />
                  </figure>
                  <h2 className="font-medium mt-10">
                    {entry.title.label.toUpperCase()}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Author: {entry["im:artist"].label}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps({ res }) {
  const response = await fetch(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );
  const data = await response.json();

  res.setHeader("Cache-Control", `max-age=${60 * 60 * 24}`);

  return {
    props: { entries: data.feed.entry },
  };
}
