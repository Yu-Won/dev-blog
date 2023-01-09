import { GetStaticProps } from "next";
import { getAllPosts, getAllTagsFromPosts } from "utils/mdxUtils";
import Title from "components/Title";
import ListLayout from "components/ListLayout";
import { PageSeo } from "components/SEO";
import { Post } from "types";
import { PAGE_COUNT, SiteConfig } from "utils/config";
import ListPagination from "components/Pagination/ListPagination";

interface ITagProps {
  [key: string]: string | number | undefined | Post[];
  id: string;
  totalCount: number;
  page: string;
  posts: Post[];
}

const Tag = (props: ITagProps) => {
  const { id, page, posts, totalCount } = props;

  return (
    <div className="flex flex-col w-full">
      <PageSeo
        title={`${id}`}
        description={`${id} tag - ${SiteConfig.title}`}
        url={`${SiteConfig.url}/tag/${id}/${page}`}
      />
      <Title id={id} />
      <ListLayout posts={posts} />
      {Math.ceil(totalCount / PAGE_COUNT) > 1 && (
        <ListPagination
          link={`/tag/${id}`}
          page={parseInt(page)}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};

export const getStaticPaths = async () => {
  const allTags = await getAllTagsFromPosts();
  let allTagPath = allTags.map((value) => ({ tag: value.tag, page: Math.ceil(value.count / PAGE_COUNT) }));

  const paths: { params: { id: string; page: string } }[] = [];

  allTagPath.forEach((tags) => {
    while(tags.page) {
      paths.push({ params: { id: tags.tag, page: tags.page.toString() } })
      tags.page--;
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getAllPosts();
  const { id, page } = params as ITagProps;

  const resultTagsPosts = allPosts.filter((post) =>
    post.frontMatter.tags.find((t) => t === id)
  );

  const resultPosts = resultTagsPosts.slice(
    parseInt(page) * PAGE_COUNT - PAGE_COUNT,
    parseInt(page) * PAGE_COUNT
  );

  return {
    props: {
      posts: resultPosts.map((post) => ({
        ...post,
        path: `${SiteConfig.url}/${post.fields.slug}`,
      })),
      id,
      page,
      totalCount: resultTagsPosts.length,
    },
  };
};

export default Tag;
