"use client";
import CustomPopover from "@/components/module/ui/CustomPopover";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { classNames } from "@/utils/common";
import { flags, headerItems } from "@/utils/constants";
import { ChevronRight, Globe } from "lucide-react";
import { motion, useScroll } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { scrollToSection, headerRef, currentSection } = useScrollToSection();
  const { scrollYProgress } = useScroll();
  const firstTwoItems = headerItems.slice(0, 2);
  const lastItem = headerItems.slice(2, 4);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (i18n.isInitialized) {
      setIsClient(true);
    }
  }, [i18n.isInitialized]);

  if (!isClient) return null;

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 bg-flour/90 border border-flour rounded-b-3xl z-10 shadow-2xl text-playfair"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-primary/70"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      <nav className="container mx-auto px-4 relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-7 md:-top-8">
          <li className="w-fit cursor-pointer transition duration-300 ease-out hover:scale-125">
            <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-b-xl shadow-lg">
              <Image
                src={"/assets/logo.png"}
                alt="logo"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain rounded-b-xl"
                onClick={scrollToTop}
              />
            </div>
          </li>
        </div>
        <ul className="flex justify-center items-center py-4 text-xs md:text-base">
          <div className="w-1/2 flex justify-center gap-3 md:justify-end md:gap-10 md:pr-20">
            {firstTwoItems.map((item, index) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={classNames({
                    "hover:transition hover:duration-500 hover:ease-out md:hover:scale-125":
                      true,
                    "transition duration-500 scale-125":
                      currentSection === item.id,
                  })}
                >
                  <span className="text-xs md:text-base font-semibold md:font-bold">
                    {t(`headerTitle${index + 1}`)}
                  </span>
                </button>
              </li>
            ))}
          </div>
          <div className="w-40" />
          <div className="w-1/2 flex justify-center items-center gap-5 md:justify-between md:gap-10 md:pl-20">
            {lastItem.map((item, index) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={classNames({
                    "hover:transition hover:duration-500 hover:ease-out md:hover:scale-125":
                      true,
                    "transition duration-500 scale-125":
                      currentSection === item.id,
                  })}
                >
                  <span className="text-xs md:text-base font-semibold md:font-bold">
                    {t(`headerTitle${index + 3}`)}
                  </span>
                </button>
              </li>
            ))}
            <CustomPopover
              wrapperClassName="w-50 py-0 mt-4"
              childrenClassName="px-0 py-0"
              label={
                <div
                  className="w-11 h-7 border border-gray-400 rounded-md flex items-center p-2 justify-center"
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                >
                  <Globe className="size-4 md:size-5" />
                  <ChevronRight
                    className={classNames({
                      "transition duration-300 size-4 md:size-5": true,
                      "rotate-90": expanded,
                    })}
                  />
                </div>
              }
            >
              <div className="flex flex-col justify-center items-center">
                {flags.map((flag, index) => (
                  <button
                    key={index}
                    className={classNames({
                      "flex justify-start gap-2 items-center px-2 py-3 rounded w-full hover:bg-gray-600/30":
                        true,
                      "bg-gray-600/40 hover:bg-gray-600/40":
                        i18n.language === flag.lang,
                    })}
                    onClick={() => {
                      i18n.changeLanguage(flag.lang);
                    }}
                  >
                    <div className="relative w-10 h-7">
                      <Image
                        fill
                        loading="lazy"
                        alt="flag"
                        src={flag.flagUrl}
                        className="object-contain size-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <span className="text-sm text-playfair">
                      {flag.language}
                    </span>
                  </button>
                ))}
              </div>
            </CustomPopover>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
