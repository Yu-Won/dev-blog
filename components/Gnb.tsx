import { SiteConfig } from "utils/config";
import EnvelopeIcon from "./icons/EnvelopeIcon";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

const GnbList: { id: number; link: string; component: () => JSX.Element }[] = [
  {
    id: 1,
    link: `mailto:${SiteConfig.author.contacts.email}`,
    component: EnvelopeIcon,
  },
  {
    id: 2,
    link: `${SiteConfig.author.contacts.github}`,
    component: GithubIcon,
  },
  {
    id: 3,
    link: `${SiteConfig.author.contacts.linkedin}`,
    component: LinkedinIcon,
  },
];

const Gnb = () => {
  return (
    <ul className="flex laptop:flex-col mx-auto mobile:w-3/5 mobile:justify-evenly laptop:h-3/5 items-center">
      {GnbList.map((gnb) => (
        <li key={gnb.id} className="flex mx-auto">
          <a target="_blank" href={gnb.link} rel="noreferrer">
            <gnb.component />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Gnb;
