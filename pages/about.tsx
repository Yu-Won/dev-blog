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
  const { mdx } = props;
  return (
    <div className="prose dark:prose-invert mobile:prose-sm tablet:prose-base mx-auto pt-16 pb-24 px-8 prose-blockquote:not-italic prose-blockquote:border-indigo-600 dark:prose-blockquote:border-violet-700 prose-h3:w-fit prose-h3:bg-gradient-to-t prose-h3:from-indigo-400/20 dark:prose-h3:from-violet-700 prose-h3:to-transparent prose-em:text-sm">
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
