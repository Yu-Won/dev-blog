import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getAllPosts, parseMarkdownToMdx } from "../../utils/mdxUtils";

interface SlugInterface {
  [key: string]: string | string[] | undefined
  year: string
  slugs: string[]
}

const PostPage = (props: any) => {
    const { post, mdx } = props;
    return (
        <>
            <Head>
                <meta name="description" />
                <title>test</title>
            </Head>
            <MDXRemote {...mdx} />
        </>
    )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts()
  const paths: Array<{
    params: { year: string; slugs: string[] }
  }> = allPosts.reduce<Array<{ params: { year: string; slugs: string[] } }>>(
    (prev, { fields: { slug } }) => {
      const [year, ...slugs] = `${slug.replace('.md', '')}`.split('/')

      prev.push({ params: { year, slugs } })
      return prev
    },
    [],
  );

  return {
    paths,
    fallback: 'blocking',
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { year, slugs } = params as SlugInterface

  const slug = [year, ...(slugs as string[])].join('/')
  const posts = await getAllPosts()
  const post = posts.find((p) => p?.fields?.slug === slug)
  if (post) {
    const source = await parseMarkdownToMdx(post.body, post.path)

    return {
      props: {
        post,
        mdx: source,
      },
    }
  }
  return {
    notFound: true,
  }
}

export default PostPage;
