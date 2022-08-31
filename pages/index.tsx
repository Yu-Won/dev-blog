import { GetStaticProps } from 'next'
import Link from "next/link";
import { getAllPosts } from "../utils/mdxUtils";

const Home = ({ posts }: { posts: any[] }) => {
    return (
        <>
            <>HOME</>
            <ul>
                {posts
                    .slice(0, 10)
                    .map(({ frontMatter: frontmatter, fields: { slug } }) => {
                        const { date, title, tags, description } = frontmatter;
                        return (
                            <li key={slug}>
                                <Link
                                    href={`/${slug}`}
                                >
                                    {title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
};

export const getStaticProps: GetStaticProps = async () => {
    const recentPosts = (await getAllPosts()).slice(0, 10);
    return {
        props: { posts: recentPosts.map((post) => ({ ...post, path: '' })) }
    };
};

export default Home;
