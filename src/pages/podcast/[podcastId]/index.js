import { ImageAsset } from "@/components/ImageAsset";
import { getEpisodes, getFeed, getPodcastInfo } from "@/utils/xml";
import Link from "next/link";

export default function Podcast({ id, podcast, episodes }) {
  if (!podcast) return <h2>Podcast not found</h2>;
  return (
    <main className="flex gap-x-12 p-12 items-start">
      <aside className="w-1/3">
        <div className="bg-white rounded-sm shadow-md p-4 border">
          <div className="flex flex-col space-y-4 ">
            <figure className="relative w-48 rounded-md overflow-hidden self-center">
              <ImageAsset
                src={podcast.image}
                alt={podcast.title + " cover"}
                width={600}
                height={600}
              />
            </figure>
            <hr className="border-1 border-slate-300" />
            <div>
              <p className="font-bold">{podcast.title}</p>
              <p className="italic">by {podcast.author}</p>
            </div>
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
                          <Link href={`/podcast/${id}/episode/${episode.id}`}>
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
      id: params.podcastId,
      podcast,
      episodes,
    },
  };
}
