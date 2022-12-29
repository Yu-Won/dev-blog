import Link from "next/link";
import { TagWithCount } from "types";

interface IProps {
  tags: TagWithCount[];
}

const TagContainer = (props: IProps) => {
  const { tags } = props;
  return (
    <div className="mx-auto w-9/12 mobile:pt-4 tablet:pt-8 laptop:pt-20 border-b dark:border-zinc-500">
      <ul className="flex overflow-auto h-12 w-full space-x-6 items-center">
        {tags.map((tagValue) => (
          <li
            key={tagValue.tag}
            className="w-fit whitespace-nowrap py-1.5 space-x-2 hover:text-zinc-500 dark:hover:text-zinc-300"
          >
            <Link href={`/tag/${tagValue.tag}/1`}>{tagValue.tag}</Link>
            <span className="text-sm text-indigo-600 dark:text-purple-800">
              {tagValue.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagContainer;
