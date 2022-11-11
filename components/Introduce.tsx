import Image from "next/image";
import Link from "next/link";

const Introduce = () => {
  return (
    <div className="flex flex-col text-center py-8">
      <span>Hello World 👋</span>
      <span>I&apos;m frontend engineer</span>
      <div className="py-4">
        <Image
          className="rounded-full"
          src="/images/profile.jpeg"
          alt="깜돌이입니다."
          width={90}
          height={90}
        />
      </div>
      <Link href="https://mature-store-9e8.notion.site/8d69e75fef4d413d83dbc9400d27f399">
          <a>
            <span>Detailed Resume</span>
          </a>
      </Link>
    </div>
  );
};

export default Introduce;
