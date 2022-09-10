import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
    const { theme, setTheme } = useTheme();
    return (
        <header className="mobile:flex laptop:hidden h-14 shadow items-center justify-between dark:border-b bg-white dark:bg-gray-800">
            <div className="px-9">uon</div>
            <button
                className="px-9 cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {
                    theme === "dark" ?
                        <FontAwesomeIcon icon={faMoon} size="xl" />
                        : <FontAwesomeIcon icon={faSun} size="xl" />
                }
            </button>
        </header>
    )
};

export default Header;
