// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pizzagarden.ng";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: base + "/menu", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: base + "/order", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: base + "/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: base + "/reviews", lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: base + "/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
