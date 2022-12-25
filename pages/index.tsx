import { GetStaticProps } from "next";
import { getAllPosts, getAllTagsFromPosts } from "utils/mdxUtils";
import TagContainer from "components/TagContainer";
import ListLayout from "components/ListLayout";
import { Post, TagWithCount } from "types";

interface IProps {
  posts: Post[];
  tags: TagWithCount[];
}

const Home = (props: IProps) => {
  const { posts, tags } = props;
  return (
    <div className="flex flex-col w-full">
      <TagContainer tags={tags} />
      <ListLayout posts={posts} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recentPosts = (await getAllPosts()).slice(0, 100);
  const allTags = await getAllTagsFromPosts();
  return {
    props: {
      posts: recentPosts.map((post) => ({ ...post, path: "" })),
      tags: allTags,
    },
  };
};

export default Home;
