import { SiteConfig } from "utils/config";

export const SEO = {
  title: SiteConfig.title,
  description: SiteConfig.subtitle,
  openGraph: {
    type: "website",
    locale: "ko-KR",
    url: SiteConfig.url,
    title: SiteConfig.title,
    description: SiteConfig.subtitle
  },
    additionalMetaTags: [
      {
        name: "author",
        content: SiteConfig.author.name
      }
    ]
};
