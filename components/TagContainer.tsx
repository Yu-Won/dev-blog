import Link from "next/link";
import { TagWithCount } from "types";

interface IProps {
    tags: TagWithCount[]
}

const TagContainer = (props: IProps) => {
    const { tags } = props;
    return (
        <div className="flex mx-auto w-9/12 mobile:pt-12 tablet:pt-24 border-b dark:border-zinc-500">
            <ul className="flex w-full overflow-x-scroll whitespace-nowrap float-left space-x-6">
                {tags.map((tagValue) => (
                    <li
                        key={tagValue.tag}
                        className="flex items-center relative whitespace-nowrap py-1.5 space-x-2"
                    >
                        <Link href={`/tag/${tagValue.tag}`}>
                            {tagValue.tag}
                        </Link>
                        <div
                            className="text-sm text-violet-200 dark:text-indigo-500"
                        >
                            {tagValue.count}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TagContainer;
