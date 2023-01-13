import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import Introduce from "./Introduce";

const About = () => {
	const [mounted, setMounted] = useState<boolean>(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="mobile:hidden laptop:flex shrink-0 w-52 ml-auto flex-col py-12">
			<button
				type="button"
				id={`${theme} theme button`}
				aria-label={`${theme} theme button`}
				className="flex w-6 h-6 cursor-pointer mx-auto"
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			>
				{theme === "dark" ? <MoonIcon /> : <SunIcon />}
			</button>
			<Introduce />
		</div>
	);
};

export default About;
