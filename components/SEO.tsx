import { NextSeo, ArticleJsonLd } from "next-seo";
import dayjs from "dayjs";
import { SiteConfig } from "utils/config";

export const SEO = {
  title: SiteConfig.title,
  description: SiteConfig.subtitle,
  openGraph: {
    type: "website",
    locale: "ko-KR",
    url: SiteConfig.url,
    title: SiteConfig.title,
    description: SiteConfig.subtitle,
    images: [
      {
        url: "/images/thumbnail.png",
        alt: "default thumbnail",
        type: "image/png",
      },
    ],
  },
  additionalMetaTags: [
    {
      name: "author",
      content: SiteConfig.author.name,
    },
  ],
};

export const PageSeo = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <NextSeo
      title={`${title} - ${SiteConfig.title}`}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [{ alt: title, url: "/images/thumbnail.png" }],
      }}
    />
  );
};

export const PostSeo = ({
  title,
  tags,
  date,
  description,
  url,
}: {
  title: string;
  tags: string[];
  date: string;
  description: string;
  url: string;
}) => {
  return (
    <>
      <NextSeo
        title={`${title} - ${SiteConfig.title}`}
        description={description}
        canonical={url}
        openGraph={{
          type: "article",
          article: {
            publishedTime: dayjs(date).toISOString(),
            authors: [SiteConfig.author.name],
            tags,
          },
          url,
          title,
          description,
        }}
      />
      <ArticleJsonLd
        url={url}
        title={title}
        datePublished={dayjs(date).toISOString()}
        authorName={[SiteConfig.author.name]}
        description={description}
        isAccessibleForFree={true}
        images={[]}
      />
    </>
  );
};
