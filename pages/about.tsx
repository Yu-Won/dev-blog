import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Post } from "types";
import { SiteConfig } from "utils/config";
import { getAbout, parseMarkdownToMdx } from "utils/mdxUtils";

interface IProps {
  about: Post[];
  mdx: MDXRemoteSerializeResult;
}

const About = (props: IProps) => {
  const { about, mdx } = props;
  return (
    <div className="prose dark:prose-invert mobile:prose-sm tablet:prose-base mx-auto pt-16 pb-24 px-4">
      <MDXRemote {...mdx} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const aboutPost = await getAbout();
  const source = await parseMarkdownToMdx(aboutPost[0].body, aboutPost[0].path);

  return {
    props: {
      about: aboutPost.map((about) => ({
        ...about,
        path: `${SiteConfig.url}/${about.fields.slug}`,
      })),
      mdx: source,
    },
  };
};

export default About;
