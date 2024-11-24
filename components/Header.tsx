import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import { SiteConfig } from "utils/config";

const Header = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    (<header className="mobile:flex mobile:fixed mobile:w-full mobile:z-20 laptop:hidden h-14 shadow items-center justify-between dark:border-b bg-white dark:bg-gray-800">
      <div className="flex px-9 font-semibold">
        <Link href={SiteConfig.pathPrefix} legacyBehavior>{SiteConfig.author.name}</Link>
      </div>
      <button
        type="button"
        id={`header ${theme} theme button`}
        aria-label={`header ${theme} theme button`}
        className="flex px-9 cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </button>
    </header>)
  );
};

export default Header;
