import type { MetadataRoute } from "next";

const baseUrl = "https://buildpm.co";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // API + the preview-token route should not be crawled.
      disallow: ["/api/", "/preview"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
