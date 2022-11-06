import { useTheme } from "next-themes";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="mobile:flex laptop:hidden h-14 shadow items-center justify-between dark:border-b bg-white dark:bg-gray-800">
      <div className="px-9">uon</div>
        <button
          className="flex px-9 cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {
            theme === "dark" ?
              <MoonIcon className="w-6 h-6" />
              : <SunIcon className="w-6 h-6" />
          }
        </button>
    </header>
  );
};

export default Header;
