import { useTheme } from "next-themes";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/outline";
import Introduce from "./Introduce";

const About = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div className="mobile:hidden laptop:flex w-72 ml-auto flex-col py-12">
            <button
                className="flex w-6 h-6 cursor-pointer mx-auto"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {
                    theme === "dark" ?
                        <MoonIcon className="w-full h-full" />
                        : <SunIcon className="w-full h-full" />
                }
            </button>
            <Introduce />
        </div>
    )
};

export default About;
