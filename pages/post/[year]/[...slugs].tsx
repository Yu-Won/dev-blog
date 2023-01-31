import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostSeo } from "components/SEO";
import { getAllPosts, parseMarkdownToMdx } from "utils/mdxUtils";
import { Post } from "types";
import { SiteConfig } from "utils/config";
import PageNavigation from "components/Pagination/PageNavigation";

interface SlugInterface {
	[key: string]: string | string[] | undefined;
	year: string;
	slugs: string[];
}

const PostPage = ({
	post,
	prevPost,
	nextPost,
	mdx,
	slug,
}: {
	post: Post;
	prevPost: Post | null;
	nextPost: Post | null;
	mdx: MDXRemoteSerializeResult;
	slug: string;
}) => {
	const { title, tags, date, description } = post.frontMatter;
	// const storage = globalThis?.sessionStorage;
	// const link = storage?.getItem("currentPath") || "/";

	return (
		<div className="pt-16 pb-24 px-4 mx-auto prose dark:prose-invert mobile:prose-sm tablet:prose-base prose-h1:text-center prose-blockquote:not-italic prose-blockquote:font-normal prose-a:text-sky-600">
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
			<PageNavigation prevPost={prevPost} nextPost={nextPost} />
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
	const curIndex = posts.findIndex(
		(p) => p?.fields?.slug === post?.fields?.slug,
	);

	if (post) {
		const source = await parseMarkdownToMdx(post.body, post.path);
		return {
			props: {
				post,
				prevPost: posts[curIndex - 1] ? posts[curIndex - 1] : null,
				nextPost: posts[curIndex + 1] ? posts[curIndex + 1] : null,
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
