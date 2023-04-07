import { ImageAsset } from "@/components/ImageAsset";
import { getEpisode, getFeed, getPodcastInfo } from "@/utils/xml";

export default function Episode({ podcast, episode }) {
  if (!episode) return <h2>Episode not found</h2>;
  return (
    <main className="flex gap-x-12 p-12 items-start">
      <aside className="w-1/3">
        <div className="bg-white rounded-sm shadow-md p-4 border">
          <div className="flex flex-col space-y-4 ">
            <figure className="relative w-48 rounded-md overflow-hidden self-center">
              <ImageAsset
                src={podcast.image}
                alt="Podcast cover"
                width={600}
                height={600}
              />
            </figure>
            <hr className="border-1 border-slate-300" />
            <div>
              <p className="font-bold">{podcast.title}</p>
              <p className="prose italic">by {podcast.author}</p>
            </div>
            <hr className="border-1 border-slate-300" />
            <div>
              <p className="font-bold">Description:</p>
              <div
                className="italic"
                dangerouslySetInnerHTML={{ __html: podcast.description }}
              />
            </div>
          </div>
        </div>
      </aside>
      <section className="w-2/3">
        <div className="rounded-sm shadow-md p-6 border space-y-4">
          <h2 className="font-bold text-2xl">{episode.title}</h2>
          <div
            className="prose italic text-sm"
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
          <audio className="w-full" controls src={episode.audioUrl}></audio>
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
  const episode = getEpisode(feed, params.episodeId);

  res.setHeader("Cache-Control", `max-age=${60 * 60 * 24}`);

  return {
    props: {
      podcast,
      episode,
    },
  };
}
