import Gnb from "./Gnb";

const Sidebar = () => {
    return (
        <aside className="mobile:hidden laptop:flex w-14 border-r flex-col text-center justify-evenly">
            <div>로고</div>
            <Gnb />
        </aside>
    )
};

export default Sidebar;
