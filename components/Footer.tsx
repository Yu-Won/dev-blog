import { useCallback, useEffect, useRef, useState } from "react";
import Gnb from "./Gnb";

const Footer = () => {
  const delta = 5;
  const scrollTargetRef = useRef<HTMLElement | null>(null);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [mobileDisplay, setMobileDisPlay] = useState<string>("flex");

  const handleScroll = useCallback(() => {
    let currentScrollTop = window.scrollY;
    if (Math.abs(lastScrollTop - currentScrollTop) <= delta) {
      return;
    }
    if (scrollTargetRef.current) {
      if (currentScrollTop > lastScrollTop && currentScrollTop > 56) {
        setMobileDisPlay("invisible");
      } else {
        if (
          currentScrollTop + window.innerHeight <
          document.body.offsetHeight
        ) {
          setMobileDisPlay("flex");
        }
      }
    }
    setLastScrollTop(() => currentScrollTop);
  }, [lastScrollTop]);

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 200);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <footer
      ref={scrollTargetRef}
      className={`mobile:flex laptop:hidden fixed  ${
        mobileDisplay === "flex"
          ? "bottom-0 animate-footer-up"
          : "bottom-[-60px]"
      }	w-screen h-14 border-t bg-white dark:bg-gray-800`}
    >
      <Gnb />
    </footer>
  );
};

export default Footer;
