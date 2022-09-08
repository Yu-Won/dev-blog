import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

const About = () => {
    return (
        <div className="mobile:hidden laptop:flex w-72 border-l ml-auto flex-col">
            <div>
                <FontAwesomeIcon icon={faMoon} size="xl" />
            </div>
            <div>자기소개</div>
            <div>태그</div>
        </div>
    )
};

export default About;
