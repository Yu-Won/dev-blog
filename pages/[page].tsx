import { GetStaticProps } from "next";
import TagContainer from "components/TagContainer";
import ListLayout from "components/ListLayout";
import { Post, TagWithCount } from "types";
import Introduce from "components/Introduce";
import ListPagination from "components/Pagination/ListPagination";
import { PageSeo } from "components/SEO";
import { getAllPosts, getAllTagsFromPosts } from "utils/mdxUtils";
import { PAGE_COUNT, SiteConfig } from "utils/config";

interface IProps {
  [key: string]: string | number | undefined | Post[] | TagWithCount[];
  posts: Post[];
  tags: TagWithCount[];
  page: string;
  totalCount: number;
}

const MainPage = (props: IProps) => {
  const { posts, tags, page, totalCount } = props;
  return (
    <div className="flex flex-col w-full">
      <PageSeo
        title={`${SiteConfig.title} post ${page} page`}
        description={`${SiteConfig.title} - post ${page} page`}
        url={`${SiteConfig.url}/${page}`}
      />
      <div className="mx-auto laptop:hidden">
        <Introduce />
      </div>
      <TagContainer tags={tags} />
      <ListLayout posts={posts} />
      <ListPagination link="" page={parseInt(page)} totalCount={totalCount} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const allPostsLength = (await getAllPosts()).length;
  const paths: { params: { page: string } }[] = [];

  for (let i = 1; i <= Math.ceil(allPostsLength / PAGE_COUNT); i++) {
    paths.push({ params: { page: i.toString() } });
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = params as IProps;
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(
    parseInt(page) * PAGE_COUNT - PAGE_COUNT,
    parseInt(page) * PAGE_COUNT
  );
  const allTags = await getAllTagsFromPosts();
  return {
    props: {
      posts: recentPosts.map((post) => ({
        ...post,
        path: `${SiteConfig.url}/${post.fields.slug}`,
      })),
      tags: allTags,
      page,
      totalCount: allPosts.length,
    },
  };
};

export default MainPage;
