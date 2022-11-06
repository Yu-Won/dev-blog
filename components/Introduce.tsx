import Image from "next/image";

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
      <span>Detailed Resume</span>
    </div>
  );
};

export default Introduce;
