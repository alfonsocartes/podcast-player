import { ImageAsset } from "@/components/ImageAsset";
import { SideBar } from "@/components/SideBar";
import { getEpisode, getEpisodes, getFeed, getPodcastInfo } from "@/utils/xml";

export default function Episode({ podcastId, podcast, episode }) {
  if (!episode) return <h2>Episode not found</h2>;
  return (
    <main className="flex gap-x-12 p-12 items-start">
      <aside className="w-1/3">
        <SideBar podcast={podcast} link={`/podcast/${podcastId}`} />
      </aside>
      <section className="w-2/3">
        <div className="rounded-sm shadow-md p-6 border space-y-4">
          <h2 className="font-bold text-2xl">{episode.title}</h2>
          <div
            className="prose italic text-sm prose-a:text-sky-600"
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
          <audio className="w-full" controls src={episode.audioUrl}></audio>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps({ params, res }) {
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${params.podcastId}`
    );
    const data = await response.json();

    if (data?.results?.length === 0) {
      throw new Error("Podcast not found");
    }

    const feed = await getFeed(data.results[0].feedUrl);
    const podcast = getPodcastInfo(data, feed);
    const episode = getEpisodes(feed)[params.episodeId];

    res.setHeader("Cache-Control", `max-age=${60 * 60 * 24}`);

    return {
      props: {
        podcastId: params.podcastId,
        podcast,
        episode,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        podcastId: params.podcastId,
        podcast: null,
        episode: null,
      },
    };
  }
}
