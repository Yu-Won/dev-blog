import { ReactElement } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
};

export default Layout;
