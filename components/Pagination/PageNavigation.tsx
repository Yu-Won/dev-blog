import Link from "next/link";
import { Post } from "types";
import ArrowLeft from "components/icons/ArrowLeft";
import ArrowRight from "components/icons/ArrowRight";

interface IProps {
	[key: string]: Post | null;
}

const PageNavigation = (props: IProps) => {
	const { prevPost, nextPost } = props;
	return (
		<div className="flex justify-between mt-20 items-center mobile:flex-col-reverse tablet:flex-row">
			<div className="mobile:w-full tablet:w-[48%]">
				{nextPost && (
					<Link href={`/post/${nextPost.fields.slug}`}>
						<a className="flex dark:text-indigo-200 no-underline items-center space-x-4 group bg-gray-100/50 dark:bg-slate-900/50 pl-0 pr-4 py-2">
							<div className="overflow-hidden">
								<div className="group-hover:animate-arrow-left">
									<ArrowLeft />
								</div>
							</div>
							<div className="min-w-0 w-full">
								<div className="pt-2 pb-1 text-sm">이전 포스트</div>
								<div className="text-lg font-semibold truncate">
									{nextPost.frontMatter.title}
								</div>
							</div>
						</a>
					</Link>
				)}
			</div>
			<div className="mobile:w-full mobile:mb-9 tablet:mb-0 tablet:w-[48%] justify-end">
				{prevPost && (
					<Link href={`/post/${prevPost.fields.slug}`}>
						<a className="flex dark:text-indigo-200 no-underline items-center space-x-4 group bg-gray-100/50 dark:bg-slate-900/50 pl-4 py-2">
							<div className="min-w-0 w-full text-right">
								<div className="pt-2 pb-1 text-sm">다음 포스트</div>
								<div className="text-lg font-semibold truncate">
									{prevPost.frontMatter.title}
								</div>
							</div>
							<div className="flex justify-end overflow-hidden">
								<div className="group-hover:animate-arrow-right">
									<ArrowRight />
								</div>
							</div>
						</a>
					</Link>
				)}
			</div>
		</div>
	);
};

export default PageNavigation;
