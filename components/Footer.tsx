import Gnb from "./Gnb";

const Footer = () => {
    return (
        <footer className="mobile:flex laptop:hidden fixed bottom-0	w-screen h-14 bg-white border-t">
            <Gnb />
        </footer>
    )
};

export default Footer;
