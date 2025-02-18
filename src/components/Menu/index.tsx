"use client";

import { useTranslation } from "react-i18next";
import EmblaCarousel from "../module/ui/EmblaCarousel/EmblaCarousel";
const imageUrls = [
  "/assets/noodles/wonton.png",
  "/assets/noodles/wonton-pork-noodle.webp",
  "/assets/noodles/extra-noodle.png",
];
const pricing = ["35,000 VND", "40,000 VND", "10,000 VND"];

const Menu = () => {
  const { t } = useTranslation();

  const imageTitles = [t("menuItem1"), t("menuItem2"), t("menuItem3")];
  const imageDescriptions = [t("wonton"), t("wontonNoodle"), t("noodle")];
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
          imageTitles={imageTitles}
          imageDescriptions={imageDescriptions}
          subContent={pricing}
          options={{ loop: true }}
        />
      </div>
    </section>
  );
};

export default Menu;
