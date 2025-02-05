import Image from "next/image";
import React from "react";
const content = {
  title: "Best seller tại quán",
  imageUrls: [],
  buttonContent: "Khám phá",
};
const Menu = () => {
  return (
    <section id="menu">
      <div className="w-full flex flex-col gap-5 md:gap-40 h-fit md:h-[95vh] bg-flour px-6 pt-20 pb-10 md:px-8">
        <div className="flex flex-col md:flex-row items-start justify-center gap-5 md:justify-between">
          <h1 id="menu" className="text-playfair text-5xl font-medium">
            {content.title}
          </h1>
          <button className="border-2 border-gray-700/90 shadow-xl py-2 px-4 rounded-3xl text-playfair font-medium">
            <span>{content.buttonContent}</span>
          </button>
        </div>
        <div className="flex flex-col w-full md:flex-row gap-5 md:gap-20 justify-center items-center">
          <div className="flex flex-col items-center border-2 md:border-4 rounded-3xl py-2 md:mt-20">
            <div className="relative w-[80vw] h-[20vh] md:w-[20vw] md:h-[30vh] md:hover:scale-125 transition duration-700">
              <Image
                fill
                priority
                alt="image"
                src="/assets/noodles/wonton.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            <span className="text-playfair md:text-2xl md:font-medium">
              Hoành thánh
            </span>
          </div>
          <div className="flex flex-col items-center border-2 md:border-4 rounded-3xl py-2 md:mb-20">
            <div className="relative w-[80vw] h-[30vh] md:w-[20vw] md:h-[30vh] scale-75 md:hover:scale-100 transition duration-700">
              <Image
                fill
                priority
                alt="image"
                src="/assets/noodles/wonton-pork-noodle.webp"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <span className="text-playfair md:text-2xl md:font-medium">
              Mì hoành thánh
            </span>
          </div>
          <div className="flex flex-col items-center border-2 md:border-4 rounded-3xl py-2 md:mt-20">
            <div className="relative w-[80vw] h-[20vh] md:w-[20vw] md:h-[30vh] md:hover:scale-125 transition duration-700">
              <Image
                fill
                priority
                alt="image"
                src="/assets/noodles/extra-noodle.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
            <span className="text-playfair md:text-2xl md:font-medium">
              Mì tươi
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
