import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import Gnb from "./Gnb";

const Sidebar = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="mobile:hidden laptop:flex w-20 h-screen flex-col text-center justify-evenly">
      <div className="mx-auto w-7 h-5">
        {theme === "dark" ? (
          <Link href="/">
            <a>
              <Image
                src="/images/dark_small_logo.png"
                alt="dark small logo"
                width={20}
                height={20}
                className="w-auto h-auto"
              />
            </a>
          </Link>
        ) : (
          <Link href="/">
            <a>
              <Image
                src="/images/light_small_logo.png"
                alt="large small logo"
                width={20}
                height={20}
                className="w-auto h-auto"
              />
            </a>
          </Link>
        )}
      </div>
      <Gnb />
    </aside>
  );
};

export default Sidebar;
