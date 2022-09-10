import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

const About = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div className="mobile:hidden laptop:flex w-72 ml-auto flex-col">
            <button
                className="cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {
                    theme === "dark" ?
                        <FontAwesomeIcon icon={faMoon} size="xl" />
                        : <FontAwesomeIcon icon={faSun} size="xl" />
                }
            </button>
            <div>자기소개</div>
            <div>태그</div>
        </div>
    )
};

export default About;
