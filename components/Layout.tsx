import { ReactElement } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import About from "./About";

/*
* structure -> medium
*  laptop보다 작을 때 부터 헤더가 생기고 기존에 있던 정보들이 하단으로 이동
*  헤더 메인(카테고리) 내 개인 정보
* */

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <div className="flex mobile:flex-col laptop:flex-row w-screen h-screen">
            <Header />
            <Sidebar />
            <main>{children}</main>
            <About />
            <Footer />
        </div>
    )
};

export default Layout;
