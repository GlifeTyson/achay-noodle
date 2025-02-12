"use client";
import EmblaCarousel from "@/components/module/ui/EmblaCarousel/EmblaCarousel";
import "@/components/module/ui/EmblaCarousel/embla.css";
import { imageUrls } from "@/utils/constants";
import { EmblaOptionsType } from "embla-carousel";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import React from "react";
import { useTranslation } from "react-i18next";
// import ImageSlider from "@/components/module/ui/ImageSlider";

const optionsEmblaCarousel: EmblaOptionsType = { loop: true };

const variants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 1, // Stagger children by 1 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const Landing = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [scrollInto, setScrollInto] = React.useState("");
  const { t } = useTranslation();
  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("Page scroll: ", latest);
    if (latest > 1100) {
      setScrollInto("menu");
    } else if (latest > 1800) {
      setScrollInto("member");
    } else if (latest > 2000) {
      setScrollInto("contact");
    } else {
      setScrollInto("introduce");
    }
  });

  return (
    <section id="introduce" className="relative w-full h-[100vh] bg-flour">
      <motion.div
        style={{
          scaleX: scrollYProgress,
          color: "red",
          height: 2,
          zIndex: 999,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-full"
        style={{ backgroundImage: "url('/assets/landing.jpg')" }}
      />
      <div className="absolute bg-black/40 w-full h-full rounded-b-full" />
      <div className="relative flex flex-col gap-5 w-full max-w-5xl mx-auto h-full pt-[20vh] px-10 text-center">
        <div>
          <motion.h1
            id="introduce"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 1, bounce: 0.5 },
            }}
            className="text-playfair text-3xl md:text-5xl font-extrabold text-white"
          >
            {t("landingTitle")}
          </motion.h1>
          <motion.h2
            initial={{ transform: "translateX(-200px)" }}
            animate={{ transform: "translateX(0px)" }}
            transition={{ type: "spring", visualDuration: 0.4, bounce: 0.5 }}
            className="text-playfair text-2xl md:text-3xl font-extrabold text-white"
          >
            {t("landingSince")}
          </motion.h2>
        </div>
        <div>
          <motion.p
            variants={variants}
            initial={"hidden"}
            animate={"visible"}
            className="text-playfair text-white text-sm md:text-2xl"
          >
            {t("landingDescribe1")}
            {t("landingDescribe2")}
            {t("landingDescribe3")}
          </motion.p>
        </div>
        <div className="mt-0 md:mt-10 w-full h-full mx-auto">
          {/* <ImageSlider imageUrls={imageUrls} /> */}
          <EmblaCarousel
            autoPlay
            imageUrls={imageUrls}
            options={optionsEmblaCarousel}
          />
        </div>
      </div>
    </section>
  );
};

export default Landing;
