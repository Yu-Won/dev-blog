import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllPosts, getAllTagsFromPosts } from "utils/mdxUtils";
import TagContainer from "components/TagContainer";
import { Post, TagWithCount } from "types";
import dayjs from "dayjs";

interface IProps {
    posts: Post[],
    tags: TagWithCount[]
}

const Home = (props: IProps) => {
    const { posts, tags } = props;
    return (
        <div className="flex flex-col w-full">
            <TagContainer tags={tags} />
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
    const allTags = await getAllTagsFromPosts();
    return {
        props: {
            posts: recentPosts.map((post) => ({ ...post, path: '' })),
            tags: allTags
        }
    };
};

export default Home;
