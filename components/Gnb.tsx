const Gnb = () => {
    return (
        <ul className="flex laptop:flex-col mx-auto mobile:w-3/5 mobile:justify-evenly laptop:h-3/5 items-center">
            <li className="flex mx-auto">
                <a
                    target="_blank"
                    href="mailto:shallwedance0419@gmail.com"
                    rel="noreferrer"
                >
                    메일
                </a>
            </li>
            <li className="flex mx-auto">
                <a
                    target="_blank"
                    href="https://github.com/Yu-Won"
                    rel="noreferrer"
                >
                    깃허브
                </a>
            </li>
            <li className="flex mx-auto">
                <a
                    target="_blank"
                    href="https://github.com/Yu-Won"
                    rel="noreferrer"
                >
                    링크드인
                </a>
            </li>
        </ul>
    )
};

export default Gnb;
