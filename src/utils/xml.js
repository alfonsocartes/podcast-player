import { parseStringPromise } from "xml2js";

export async function getFeed(url) {
  const response = await fetch(url);
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  return result;
}

export function getPodcastInfo(podcastInfo, feed) {
  if (
    !podcastInfo?.results?.length > 0 ||
    !feed?.rss?.channel[0]?.description[0]
  ) {
    return null;
  }

  const podcast = {
    title: podcastInfo.results[0].trackName,
    author: podcastInfo.results[0].artistName,
    image: podcastInfo.results[0].artworkUrl600,
    description: feed.rss.channel[0].description[0],
  };
  return podcast;
}

export function getEpisodes(feed) {
  let episodes = [];

  feed.rss.channel[0].item.forEach((item) => {
    const title = item?.title.length > 0 ? item.title[0] : null;
    const pubDate = item?.pubDate?.length > 0 ? item.pubDate[0] : null;
    const duration = item["itunes:duration"] ?? null;
    const description =
      item?.description?.length > 0 ? item.description[0] : null;
    const audioUrl =
      item?.enclosure?.length > 0 ? item.enclosure[0].$?.url : null;

    if (title && pubDate && duration && description && audioUrl)
      episodes.push({ title, pubDate, duration, description, audioUrl });
  });
  return episodes;
}
