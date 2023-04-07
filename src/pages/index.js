import { Inter } from "next/font/google";
import { useState } from "react";

export default function Home({ entries }) {
  const [podcasts, setPodcasts] = useState(entries);
  return <main>{podcasts.length}</main>;
}

export async function getStaticProps() {
  const res = await fetch(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );
  const data = await res.json();
  return {
    props: { entries: data.feed.entry },
    // only requested again if more than one day has passed since the last time it was requested
    revalidate: 60 * 60 * 24,
  };
}
