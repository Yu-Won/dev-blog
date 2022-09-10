import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllPosts } from "utils/mdxUtils";
import TagContainer from "components/TagContainer";
import { Post } from "types";
import dayjs from "dayjs";

const Home = ({ posts }: { posts: Post[] }) => {
    return (
        <div className="flex flex-col w-full">
            <TagContainer />
            <ul>
                {posts
                    .slice(0, 10)
                    .map(({ frontMatter: frontmatter, fields: { slug } }) => {
                        const { date, title, tags, description } = frontmatter;
                        return (
                            <li key={slug} className="flex items-center h-52">
                                <article className="mx-auto w-9/12 border-b py-9 space-y-1.5 dark:border-zinc-500">
                                    <div className="font-bold text-2xl">
                                        <Link href={`${slug}`}>
                                            {title}
                                        </Link>
                                    </div>
                                    <div className="font-base text-base">
                                        <Link href={`${slug}`}>
                                            {description}
                                        </Link>
                                    </div>
                                    <div className="flex space-x-4">
                                        {
                                            tags.map((tag) =>
                                                <li
                                                    key={tag}
                                                    className="rounded-2xl py-1 px-4 text-sm text-white bg-violet-200 dark:bg-indigo-500"
                                                >
                                                    {tag}
                                                </li>
                                            )
                                        }
                                    </div>
                                    <div className="text-xs	">
                                        {dayjs(date).format("YYYY-MM-DD HH:mm")}
                                    </div>
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
