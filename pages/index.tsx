import { GetStaticProps } from 'next'
import Link from "next/link";
import { getAllPosts } from "../utils/mdxUtils";
import { Post } from "../types";

const Home = ({ posts }: { posts: Post[] }) => {
    return (
        <div className="w-full">
            <ul>
                {posts
                    .slice(0, 10)
                    .map(({ frontMatter: frontmatter, fields: { slug } }) => {
                        const { date, title, tags, description } = frontmatter;
                        return (
                            <li key={slug} className="flex items-center h-52">
                                <article className="mx-auto w-9/12 border-b py-9">
                                    <div>
                                        <Link href={`${slug}`}>
                                            {title}
                                        </Link>
                                    </div>
                                    <div>
                                        <Link href={`${slug}`}>
                                            {description}
                                        </Link>
                                    </div>
                                    <div className="flex">
                                        {tags.map((tag) => <li key={tag}>{tag}</li>)}
                                    </div>
                                    <div>{date}</div>
                                </article>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export const getStaticProps: GetStaticProps = async () => {
    const recentPosts = (await getAllPosts()).slice(0, 10);
    return {
        props: { posts: recentPosts.map((post) => ({ ...post, path: '' })) }
    };
};

export default Home;
