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
			{posts.map(({ frontMatter: frontmatter, fields: { slug } }) => {
				const { date, title, tags, description } = frontmatter;
				return (
					<li key={slug} className="flex items-center h-52">
						<article className="flex flex-col mx-auto w-9/12 h-full py-3 justify-center border-b dark:border-zinc-500 hover:text-zinc-500 dark:hover:text-zinc-300">
							<Link href={`/post/${slug}`}>
								<a>
									<div className="font-bold text-2xl pb-3">{title}</div>
									<div className="font-base text-base pb-2">{description}</div>
									<ul className="flex flex-wrap w-full gap-1.5 pb-2.5">
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
								</a>
							</Link>
						</article>
					</li>
				);
			})}
		</ul>
	);
};

export default ListLayout;
