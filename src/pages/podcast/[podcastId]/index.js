import { ImageAsset } from "@/components/ImageAsset";
import { SideBar } from "@/components/SideBar";
import { getEpisodes, getFeed, getPodcastInfo } from "@/utils/xml";
import Link from "next/link";

export default function Podcast({ podcastId, podcast, episodes }) {
  if (!podcast) return <h2>Podcast not found</h2>;
  return (
    <main className="flex gap-x-12 p-12 items-start">
      <aside className="w-1/3">
        <SideBar podcast={podcast} link={`/podcast/${podcastId}`} />
      </aside>

      <section className="w-2/3">
        <div className="rounded-sm shadow-md p-2 border">
          <h2 className="font-extrabold text-2xl">
            Episodes: {podcast.trackCount}
          </h2>
        </div>

        <div className="rounded-sm shadow-md p-2 border mt-6">
          <div className="px-4">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pl-4 py-3 pr-3 text-left font-bold"
                      >
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3 text-left font-bold">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3 text-left font-bold">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {episodes.map((episode, index) => (
                      <tr
                        key={episode.id}
                        className={index % 2 === 0 ? "bg-slate-50" : undefined}
                      >
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-sky-700">
                          <Link
                            href={`/podcast/${podcastId}/episode/${episode.id}`}
                          >
                            {episode.title}
                          </Link>
                        </td>
                        <td className="px-3 py-4 text-sm">
                          {new Date(episode.pubDate).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-4 text-sm">
                          {episode.duration ?? "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps({ params, res }) {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${params.podcastId}`
  );
  const data = await response.json();

  const feed = await getFeed(data.results[0].feedUrl);
  const podcast = getPodcastInfo(feed);
  const episodes = getEpisodes(feed);

  res.setHeader("Cache-Control", `max-age=${60 * 60 * 24}`);

  return {
    props: {
      podcastId: params.podcastId,
      podcast,
      episodes,
    },
  };
}
