import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
    return (
        <header className="mobile:flex laptop:hidden h-14 shadow items-center justify-between bg-white">
            <div className="px-9">로고</div>
            <div className="px-9">
                <FontAwesomeIcon className="cursor-pointer" icon={faMoon} size="xl" />
            </div>
        </header>
    )
};

export default Header;
