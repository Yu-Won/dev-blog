import Link from "next/link";
import { TagWithCount } from "types";

interface IProps {
  tags: TagWithCount[];
}

const TagContainer = (props: IProps) => {
  const { tags } = props;
  return (
    <div className="mx-auto w-9/12 mobile:pt-12 tablet:pt-32 border-b dark:border-zinc-500">
      <ul className="flex absolute mobile:top-16 tablet:top-36 laptop:top-20 overflow-auto h-12 mobile:w-3/4 tablet:w-[76%] laptop:w-[56%] desktop:w-[60%] space-x-6 items-center">
        {tags.map((tagValue) => (
          <li
            key={tagValue.tag}
            className="w-fit items-center whitespace-nowrap py-1.5 space-x-2"
          >
            <Link href={`/tag/${tagValue.tag}`}>{tagValue.tag}</Link>
            <span className="text-sm text-violet-400 dark:text-indigo-500">
              {tagValue.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagContainer;
