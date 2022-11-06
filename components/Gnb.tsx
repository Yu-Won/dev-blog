import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

const Gnb = () => {
    return (
        <ul className="flex laptop:flex-col mx-auto mobile:w-3/5 mobile:justify-evenly laptop:h-3/5 items-center">
            <li className="flex mx-auto">
                <a
                    target="_blank"
                    href="mailto:shallwedance0419@gmail.com"
                    rel="noreferrer"
                >
                    <EnvelopeIcon className="w-6 h-6" />
                </a>
            </li>
            <li className="flex mx-auto">
                <a
                    target="_blank"
                    href="https://github.com/Yu-Won"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faGithub} size="xl" />
                </a>
            </li>
            <li className="flex mx-auto">
                <a
                    target="_blank"
                    href="https://github.com/Yu-Won"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedin} size="xl" />
                </a>
            </li>
        </ul>
    )
};

export default Gnb;
