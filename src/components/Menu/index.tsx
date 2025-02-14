"use client";

import { useTranslation } from "react-i18next";
import EmblaCarousel from "../module/ui/EmblaCarousel/EmblaCarousel";
const imageUrls = [
  "/assets/noodles/wonton.png",
  "/assets/noodles/wonton-pork-noodle.webp",
  "/assets/noodles/extra-noodle.png",
];

const Menu = () => {
  const { t } = useTranslation();

  const imageTitle = [t("menuItem1"), t("menuItem2"), t("menuItem3")];
  const imageDescription = [t("wonton"), t("wontonNoodle"), t("noodle")];
  return (
    <section id="menu" className="bg-flour px-6 pt-20 pb-10">
      <h1 id="menu" className="text-playfair text-5xl font-medium">
        {t("menuTitle")}
      </h1>
      <div className="p-10">
        <EmblaCarousel
          autoPlay
          wrapWithBorder
          timePerImage={2000}
          imageUrls={imageUrls}
          imageTitles={imageTitle}
          contentImages={imageDescription}
          options={{ loop: true }}
        />
      </div>
    </section>
  );
};

export default Menu;
{
  /* <div className="w-full flex flex-col gap-5 md:gap-40 h-fit md:h-[95vh] bg-flour px-6 pt-20 pb-10 md:px-8">
        <div className="flex flex-col md:flex-row items-start justify-center gap-5 md:justify-between">
          <h1 id="menu" className="text-playfair text-5xl font-medium">
            {t("menuTitle")}
          </h1>
          <button className="border-2 border-gray-700/90 shadow-xl py-2 px-4 rounded-3xl text-playfair font-medium">
            <span>{t("explore")}</span>
          </button>
        </div>
        <div className="flex flex-col w-full md:flex-row gap-5 md:gap-20 justify-center items-center">
          <div className="flex flex-col items-center border-2 md:border-4 rounded-3xl py-2 md:mt-20">
            <div className="relative w-[80vw] h-[20vh] md:w-[20vw] md:h-[30vh] md:hover:scale-125 transition duration-700">
              <Image
                fill
                loading="lazy"
                alt="image"
                src="/assets/noodles/wonton.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            <span className="text-playfair md:text-2xl md:font-medium">
              {t("menuItem1")}
            </span>
          </div>
          <div className="flex flex-col items-center border-2 md:border-4 rounded-3xl py-2 md:mb-20">
            <div className="relative w-[80vw] h-[30vh] md:w-[20vw] md:h-[30vh] scale-75 md:hover:scale-100 transition duration-700">
              <Image
                fill
                loading="lazy"
                alt="image"
                src="/assets/noodles/wonton-pork-noodle.webp"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <span className="text-playfair md:text-2xl md:font-medium">
              {t("menuItem2")}
            </span>
          </div>
          <div className="flex flex-col items-center border-2 md:border-4 rounded-3xl py-2 md:mt-20">
            <div className="relative w-[80vw] h-[20vh] md:w-[20vw] md:h-[30vh] md:hover:scale-125 transition duration-700">
              <Image
                fill
                loading="lazy"
                alt="image"
                src="/assets/noodles/extra-noodle.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            <span className="text-playfair md:text-2xl md:font-medium">
              {t("menuItem3")}
            </span>
          </div>
        </div>
      </div> */
}
