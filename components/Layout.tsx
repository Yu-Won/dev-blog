import { ReactElement } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import About from "./About";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex mobile:flex-col laptop:flex-row w-full min-h-screen h-full font-sans">
      <Header />
      <Sidebar />
      <main className="w-full mobile:pt-16 tablet:pt-20 laptop:pt-0 laptop:border-x dark:border-zinc-500">
        {children}
      </main>
      <About />
      <Footer />
    </div>
  );
};

export default Layout;
