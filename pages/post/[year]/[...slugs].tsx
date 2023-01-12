import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostSeo } from "components/SEO";
import { getAllPosts, parseMarkdownToMdx } from "utils/mdxUtils";
import { Post } from "types";
import { SiteConfig } from "utils/config";

interface SlugInterface {
	[key: string]: string | string[] | undefined;
	year: string;
	slugs: string[];
}

const PostPage = ({
	post,
	mdx,
	slug,
}: {
	post: Post;
	mdx: MDXRemoteSerializeResult;
	slug: string;
}) => {
	const { title, tags, date, description } = post.frontMatter;
	return (
		<div className="pt-16 pb-24 px-4 mx-auto prose dark:prose-invert mobile:prose-sm tablet:prose-base prose-h1:text-center prose-blockquote:not-italic prose-blockquote:font-normal">
			<Head>
				<meta name="title" content={title} />
				{tags.map((tag) => (
					<meta key={tag} name="keywords" content={tag} />
				))}
				<meta name="description" content={description} />
			</Head>
			<PostSeo
				title={title}
				tags={tags}
				date={date}
				description={description}
				url={`${SiteConfig.url}/${slug}`}
			/>
			<MDXRemote {...mdx} />
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allPosts = await getAllPosts();
	const paths: { params: { year: string; slugs: string[] } }[] =
		allPosts.reduce<{ params: { year: string; slugs: string[] } }[]>(
			(prev, { fields: { slug } }) => {
				const [year, ...slugs] = `${slug.replace(".md", "")}`.split("/");
				prev.push({ params: { year, slugs } });
				return prev;
			},
			[],
		);

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year, slugs } = params as SlugInterface;

	const slug = [year, ...(slugs as string[])].join("/");
	const posts = await getAllPosts();
	const post = posts.find((p) => p?.fields?.slug === slug);
	if (post) {
		const source = await parseMarkdownToMdx(post.body, post.path);
		return {
			props: {
				post,
				mdx: source,
				slug,
			},
		};
	}
	return {
		notFound: true,
	};
};

export default PostPage;
