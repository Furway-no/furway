import type { Metadata } from "next";

import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
  description: "Furway is a hybrid outdoor furry convention hosted annually in Norway",
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: "Furway",
  title: "Furway",
  type: "website",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
