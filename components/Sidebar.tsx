import Gnb from "./Gnb";

const Sidebar = () => {
  return (
    <aside className="mobile:hidden laptop:flex w-20 h-screen flex-col text-center justify-evenly">
      <div>uon</div>
      <Gnb />
    </aside>
  );
};

export default Sidebar;
