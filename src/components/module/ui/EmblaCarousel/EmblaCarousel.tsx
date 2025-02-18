"use client";
import { classNames } from "@/utils/common";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  imageUrls: string[];
  options?: EmblaOptionsType;
  autoPlay?: boolean;
  timePerImage?: number;
  vertical?: boolean;
  size?: "small" | "default";
  imageTitles?: string[];
  imageDescriptions?: string[];
  wrapWithBorder?: boolean;
  subContent?: string[];
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const {
    options,
    imageUrls,
    imageTitles,
    imageDescriptions,
    subContent,
    autoPlay = false,
    vertical = false,
    wrapWithBorder = false,
    timePerImage = 2000,
    size = "default",
  } = props;

  const plugins: AutoplayType[] = [];

  if (autoPlay) {
    plugins.push(
      Autoplay({
        playOnInit: true,
        delay: timePerImage,
      })
    );
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    vertical ? { ...options, axis: "y" } : options,
    plugins
  );

  const tweenFactor = useRef(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity);
  }, [emblaApi, tweenOpacity, setTweenFactor]);

  return (
    <section
      className={classNames({
        embla: true,
        "w-full h-full flex flex-col justify-center": true,
        "w-[80vw]": size === "small",
      })}
    >
      <div ref={emblaRef} className="embla__viewport">
        <div
          className={classNames({
            embla__container: true,
            "flex flex-col touch-pan-y touch-pinch-zoom mt-[1rem] h-[20vh] md:h-[40vh]":
              !!vertical,
          })}
        >
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className={classNames({
                "embla__slide flex flex-row items-center md:gap-4": true,
                "p-5": !!imageTitles?.[index] && !!imageDescriptions?.[index],
                "border-4 border-primary/50 rounded-3xl": !!wrapWithBorder,
              })}
            >
              <div
                className={classNames({
                  "relative w-full h-[25vh] md:h-[40vh]": true,
                  "w-1/2":
                    !!imageTitles?.[index] && !!imageDescriptions?.[index],
                })}
              >
                <Image
                  fill
                  loading="lazy"
                  src={imageUrl}
                  alt="Your alt text"
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {imageTitles?.[index] && (
                <div className="flex flex-col justify-center gap-3 md:gap-10 text-playfair text-left font-medium w-1/2 h-full">
                  <div className="text-3xl">
                    <b>{imageTitles[index]}</b>
                  </div>
                  {imageDescriptions?.[index] && (
                    <div className="italic line-clamp-4">
                      {imageDescriptions?.[index]}
                    </div>
                  )}
                  {subContent?.[index] && (
                    <span className="text-base lg:text-2xl">
                      <b>{subContent?.[index]}</b>
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            vertical={vertical}
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            vertical={vertical}
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
