import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.lesvoletsrouges.fr/menu",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.lesvoletsrouges.fr/vins",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // {
    //   url: "https://www.lesvoletsrouges.fr/blog",
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
    {
      url: "https://www.lesvoletsrouges.fr/contact",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.7,
    },
    {
      url: "https://www.lesvoletsrouges.fr/reserver",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.6,
    },
    {
      url: "https://www.lesvoletsrouges.fr/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
