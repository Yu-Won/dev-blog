import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col h-full mx-auto items-center justify-center mobile:pt-60 laptop:pt-0">
      <h1 className="flex font-bold text-5xl">404</h1>
      <span className="pt-4">Oh! An error has occurred! 🙀</span>
      <span className="pb-4">please go back and try again.</span>
      <div className="flex bg-violet-400 dark:bg-indigo-500 px-4 py-1.5 rounded-2xl font-medium">
        <Link href="/">go back</Link>
      </div>
    </div>
  );
};

export default Custom404;
