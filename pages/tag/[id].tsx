import { GetStaticProps } from "next";
import { getAllPosts, getAllTagsFromPosts } from "utils/mdxUtils";
import Title from "components/Title";
import ListLayout from "components/ListLayout";
import { PageSeo } from "components/SEO";
import { Post } from "types";
import { SiteConfig } from "utils/config";

interface ITagProps {
  [key: string]: string | undefined | Post[];
  id: string;
  posts: Post[];
}

const Tag = (props: ITagProps) => {
  const { id, posts } = props;
  return (
    <div className="flex flex-col w-full">
      <PageSeo
        title={`${id}`}
        description={`${id} tag - ${SiteConfig.title}`}
        url={`${SiteConfig.url}/tag/${id}`}
      />
      <Title id={id} />
      <ListLayout posts={posts} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const allTags = await getAllTagsFromPosts();

  const paths: { params: { id: string } }[] = [];
  allTags.forEach(({ tag }) => {
    paths.push({ params: { id: tag } });
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getAllPosts();
  const { id } = params as ITagProps;
  const resultPosts = allPosts.filter((post) =>
    post.frontMatter.tags.find((t) => t === id)
  );
  return {
    props: {
      posts: resultPosts.map((post) => ({ ...post, path: "" })),
      id,
    },
  };
};

export default Tag;
