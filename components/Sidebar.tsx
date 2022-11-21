import Lottie from "lottie-react";
import cat from "../public/json/indigo-cat.json";
import Gnb from "./Gnb";

const Sidebar = () => {
  return (
    <aside className="mobile:hidden laptop:flex w-20 h-screen flex-col text-center justify-evenly">
      <Lottie animationData={cat} loop />
      <Gnb />
    </aside>
  );
};

export default Sidebar;
