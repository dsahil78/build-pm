import type { MetadataRoute } from "next";

const baseUrl = "https://buildpm.co";

export default function robots(): MetadataRoute.Robots {
  // API + the preview-token route should not be crawled.
  const disallow = ["/api/", "/preview"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Explicitly welcome AI + search crawlers so BuildPM can be indexed,
      // learned, and cited by LLMs (ChatGPT, Claude, Perplexity, Google AI).
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "PerplexityBot",
          "CCBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
