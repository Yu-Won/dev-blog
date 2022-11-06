import Gnb from "./Gnb";

const Footer = () => {
  return (
    <footer className="mobile:flex laptop:hidden fixed bottom-0	w-screen h-14 border-t bg-white dark:bg-gray-800">
      <Gnb />
    </footer>
  );
};

export default Footer;
