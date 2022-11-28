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
        .slice(0, 10)
        .map(({ frontMatter: frontmatter, fields: { slug } }) => {
          const { date, title, tags, description } = frontmatter;
          return (
            <li key={slug} className="flex items-center h-52">
              <article className="mx-auto w-9/12 border-b py-9 space-y-1.5 dark:border-zinc-500">
                <div className="font-bold text-2xl">
                  <Link href={`${slug}`}>{title}</Link>
                </div>
                <div className="font-base text-base">
                  <Link href={`${slug}`}>{description}</Link>
                </div>
                <div className="w-fit mobile:grid mobile:grid-cols-2 mobile:gap-1 tablet:flex tablet:space-x-4">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="w-fit rounded-2xl py-1 px-4 text-sm text-white bg-violet-200 dark:bg-indigo-500"
                    >
                      {tag}
                    </li>
                  ))}
                </div>
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
