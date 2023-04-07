import { parseStringPromise } from "xml2js";

export async function getFeed(url) {
  const response = await fetch(url);
  const xml = await response.text();
  const result = await parseStringPromise(xml);
  return result;
}

export function getPodcastInfo(feed) {
  const podcast = {
    title: feed.rss.channel[0].title[0],
    author: feed.rss.channel[0]["itunes:author"][0],
    description: feed.rss.channel[0].description[0],
    image: feed.rss.channel[0].image[0].url[0],
  };
  return podcast;
}

export function getEpisodes(feed) {
  const episodes = feed.rss.channel[0].item.map((item) => {
    const id = item.guid[0]._;
    const title = item.title[0];
    const pubDate = item.pubDate[0];
    const duration = item["itunes:duration"] ?? "N/A";
    return { id, title, pubDate, duration };
  });
  return episodes;
}

export function getEpisode(feed, id) {
  const episodes = feed.rss.channel[0].item.map((item) => {
    const id = item.guid[0]._;
    const title = item.title[0];
    const description = item.description[0];
    const audioUrl = item.enclosure[0].$.url;
    return { id, title, description, audioUrl };
  });
  const episode = episodes.find((episode) => episode.id === id);
  return episode;
}
