"use client";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { motion, useScroll } from "motion/react";
import Image from "next/image";
import React from "react";

const items = [
  {
    id: "introduce",
    label: "Giới thiệu",
  },
  {
    id: "menu",
    label: "Thực đơn",
  },
  {
    id: "member",
    label: "Thành viên",
  },
  {
    id: "contact",
    label: "Liên hệ",
  },
];
const Header = () => {
  const scrollToSection = useScrollToSection();
  const { scrollYProgress } = useScroll();
  const firstTwoItems = items.slice(0, 2);
  const lastTwoItems = items.slice(2, 3);
  return (
    <header className="fixed top-0 left-0 right-0 bg-flour/90 border border-flour rounded-b-3xl z-10 shadow-2xl text-playfair">
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
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain rounded-b-xl"
              />
            </div>
          </li>
        </div>
        <ul className="flex justify-center items-center py-4 text-xs md:text-base">
          <div className="w-1/2 flex justify-center gap-3 md:justify-end md:gap-10 md:pr-20">
            {firstTwoItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="hover:transition hover:duration-500 hover:ease-out md:hover:scale-125"
                >
                  <span className="font-semibold md:font-bold">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </div>
          <div className="w-40" />
          <div className="w-1/2 flex justify-start pl-3 gap-3 md:justify-start md:gap-10 md:pl-20">
            {lastTwoItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="hover:transition hover:duration-500 hover:ease-out md:hover:scale-125"
                >
                  <span className="font-semibold md:font-bold">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
