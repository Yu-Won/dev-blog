import Link from "next/link";
import { Post } from "types";

interface IProps {
	// populerPosts: Post[];
	populerPosts: any;
}

const ViewLayout = (props: IProps) => {
	const { populerPosts } = props;
	return (
		<ul className="flex w-9/12 mx-auto pt-4 pb-2 space-x-6">
			{populerPosts.map((post: any) => (
				<li key={post} className="w-1/2 h-36 border rounded">
					{post}
				</li>
			))}
		</ul>
	);
};

export default ViewLayout;
