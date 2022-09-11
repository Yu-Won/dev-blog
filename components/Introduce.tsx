import Image from "next/image";

const Introduce = () => {
    return (
        <div className="flex flex-col text-center py-8">
            <p>Hello World 👋</p>
            <p>I&apos;m frontend engineer</p>
            <div className="py-4">
                <Image
                    className="rounded-full"
                    src="/images/profile.jpeg"
                    alt="깜돌이입니다."
                    width={90}
                    height={90}
                />
            </div>
            <p>Detailed Resume</p>
        </div>
    )
};

export default Introduce;
