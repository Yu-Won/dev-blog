import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PAGE_COUNT, PAGE_LIST_COUNT } from "utils/config";
import ChevronLeft from "components/icons/ChevronLeft";
import ChevronRight from "components/icons/ChevronRight";

interface IProps {
	link: string;
	page: number;
	totalCount: number;
}

const ListPagination = ({ link, page, totalCount }: IProps) => {
	const [pageList, setPageList] = useState<number[]>(
		new Array(PAGE_LIST_COUNT)
			.fill(0)
			.map(
				(value, index) =>
					index +
					1 +
					PAGE_LIST_COUNT * Math.floor((page - 1) / PAGE_LIST_COUNT),
			)
			.filter((value) => value <= Math.ceil(totalCount / PAGE_COUNT)),
	);

	const { push } = useRouter();

	const prevPage = async () => {
		if (page === 1) return;
		await push(`${link}/${page - 1}`);
	};

	const nextPage = async () => {
		if (Math.ceil(totalCount / PAGE_COUNT) === page) return;
		await push(`${link}/${page + 1}`);
	};

	useEffect(() => {
		setPageList(() =>
			new Array(PAGE_LIST_COUNT)
				.fill(0)
				.map(
					(value, index) =>
						index +
						1 +
						PAGE_LIST_COUNT * Math.floor((page - 1) / PAGE_LIST_COUNT),
				)
				.filter((value) => value <= Math.ceil(totalCount / PAGE_COUNT)),
		);
	}, [page]);

	return (
        (<div className="flex mx-auto items-center py-16 text-lg font-semibold space-x-6">
            <div className="flex items-center hover:text-indigo-600 hover:dark:text-purple-800">
				<button
					type="button"
					role="button"
					aria-label="prev page navigation button"
					onClick={prevPage}
				>
					<ChevronLeft />
				</button>
			</div>
            <ul className="flex space-x-6">
				{pageList.map((value) => (
					<li
						key={value}
						className={`${
							value === page && "text-indigo-600 dark:text-purple-800"
						} hover:text-indigo-600 hover:dark:text-purple-800`}
					>
						<Link href={`${link}/${value}`} legacyBehavior>{value}</Link>
					</li>
				))}
			</ul>
            <div className="flex items-center hover:text-indigo-600 hover:dark:text-purple-800">
				<button
					type="button"
					role="button"
					aria-label="next page navigation button"
					onClick={nextPage}
				>
					<ChevronRight />
				</button>
			</div>
        </div>)
    );
};

export default ListPagination;
