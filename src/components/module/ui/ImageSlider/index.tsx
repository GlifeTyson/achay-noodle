import { classNames } from "@/utils/common";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import Image from "next/image";

type TImageSlideProps = {
  imageUrls: string[];
  className?: string;
};

const ImageSlider: React.FC<TImageSlideProps> = (props) => {
  const { imageUrls, className = "" } = props;
  return (
    <div>
      {imageUrls.length > 0 ? (
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className={classNames({
            "w-full md:w-[80vw] lg:w-full h-[20vh] md:h-[30vh] lg:h-[30vh] rounded-xl md:rounded-none":
              true,
            [className]: true,
          })}
        >
          {imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full shrink-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Chưa có hình ảnh</p>
      )}
    </div>
  );
};

export default ImageSlider;
