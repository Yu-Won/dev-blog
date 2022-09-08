import { ReactElement } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import About from "./About";

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <div className="flex mobile:flex-col laptop:flex-row w-screen h-screen">
            <Header />
            <Sidebar />
            <main className="w-full">
                {children}
            </main>
            <About />
            <Footer />
        </div>
    )
};

export default Layout;
