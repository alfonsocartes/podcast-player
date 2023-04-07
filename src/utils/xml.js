import { parseStringPromise } from "xml2js";

export async function getPodcast(url) {
  const response = await fetch(url);

  const xml = await response.text();

  const result = await parseStringPromise(xml);

  const episodes = result.rss.channel[0].item.map((item) => {
    const id = item.guid[0]._;
    const title = item.title[0];
    const pubDate = item.pubDate[0];
    const duration = item["itunes:duration"] ?? "N/A";

    return { id, title, pubDate, duration };
  });

  const podcast = {
    title: result.rss.channel[0].title[0],
    author: result.rss.channel[0]["itunes:author"][0],
    description: result.rss.channel[0].description[0],
    image: result.rss.channel[0].image[0].url[0],
    episodes,
  };

  return podcast;
}
