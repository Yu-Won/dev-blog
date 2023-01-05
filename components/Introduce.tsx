import Image from "next/image";
import Link from "next/link";
import { SiteConfig } from "utils/config";

const Introduce = () => {
  return (
    <div className="flex items-center text-center mobile:flex-row-reverse mobile:justify-center mobile:gap-7 mobile:pt-8 laptop:flex-col laptop:gap-0 laptop:py-8">
      <div className="flex flex-col">
        <div className="pb-4">
          <span> Written by </span>
          <Link href="/about">
            <a className="underline underline-offset-2 text-indigo-600 dark:text-violet-400">
              @{SiteConfig.author.name}
            </a>
          </Link>
        </div>
        <p>Hello World 👋</p>
        <p>I&apos;m {SiteConfig.author.bio}</p>
      </div>
      <div className="py-4">
        <Image
          className="rounded-full"
          src="/images/profile.jpeg"
          alt="깜돌이입니다."
          width={90}
          height={90}
        />
      </div>
    </div>
  );
};

export default Introduce;
