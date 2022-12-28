import Link from "next/link";
import dayjs from "dayjs";
import { Post } from "types";

interface IProps {
  posts: Post[];
}

const ListLayout = (props: IProps) => {
  const { posts } = props;
  return (
    <ul>
      {posts
        .slice(0, 100)
        .map(({ frontMatter: frontmatter, fields: { slug } }) => {
          const { date, title, tags, description } = frontmatter;
          return (
            <li key={slug} className="flex items-center h-52">
              <article className="flex flex-col mx-auto w-9/12 h-full justify-center border-b space-y-1.5 dark:border-zinc-500">
                <div className="font-bold text-2xl">
                  <Link href={`/${slug}`}>{title}</Link>
                </div>
                <div className="font-base text-base">
                  <Link href={`/${slug}`}>{description}</Link>
                </div>
                <ul className="flex flex-wrap w-full gap-1.5">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="w-fit rounded-2xl py-1 px-4 text-sm text-white bg-indigo-600 dark:bg-purple-800"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="text-xs">
                  {dayjs(date).format("YYYY-MM-DD HH:mm")}
                </div>
              </article>
            </li>
          );
        })}
    </ul>
  );
};

export default ListLayout;
