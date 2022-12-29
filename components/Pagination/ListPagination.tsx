import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PAGE_COUNT } from "utils/config";
import ChevronLeft from "components/icons/ChevronLeft";
import ChevronRight from "components/icons/ChevronRight";

interface IProps {
  link: string;
  page: number;
  totalCount: number;
}

const ListPagination = ({ link, page, totalCount }: IProps) => {
  const [pageList] = useState<boolean[]>(
    new Array(Math.ceil(totalCount / PAGE_COUNT)).fill(false)
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

  return (
    <div className="flex mx-auto items-center py-16 text-lg font-semibold space-x-6">
      <div className="flex items-center hover:text-indigo-600 hover:dark:text-purple-800">
        <button type="button" onClick={prevPage}>
          <ChevronLeft />
        </button>
      </div>
      <ul className="flex space-x-6">
        {pageList.map((list, index) => (
          <li
            key={index}
            className={`${
              index + 1 === page && "text-indigo-600 dark:text-purple-800"
            } hover:text-indigo-600 hover:dark:text-purple-800`}
          >
            <Link href={`${link}/${index + 1}`}>{index + 1}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center hover:text-indigo-600 hover:dark:text-purple-800">
        <button type="button" onClick={nextPage}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ListPagination;
