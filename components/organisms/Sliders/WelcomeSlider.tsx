import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import Text from "@/atoms/Text/Text";

function WelcomeSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swipeInProgress, setSwipeInProgress] = useState(false);
  const [widthDifference, setWidthDifference] = useState(0);

  const slider = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    {
      id: 0,
      imageUrl: "/assets/illustrations/welcome.svg",
      title: "Welcome to CipherSafe!",
      subTitle: "This is your super safe place for managing passwords.",
      description: "CipherSafe keeps your important info protected.",
    },
    {
      id: 1,
      imageUrl: "/assets/illustrations/robust-encryption.svg",
      title: "Robust Encryption",
      subTitle: "We use special codes to protect your passwords really well.",
      description:
        "CipherSafe locks your passwords tight using the strongest codes. That means only you can access them.",
    },
    {
      id: 2,
      imageUrl: "/assets/illustrations/cross-platform.svg",
      title: "Seamless Cross-Platform Sync",
      subTitle: "Access your passwords anytime, anywhere!",
      description: "CipherSafe syncs your passwords on all devices",
    },
  ];

  // Functions related to Swipe Event
  const handleTouchStart = (event: React.TouchEvent) => {
    if (!swipeInProgress) {
      touchStartX.current = event.touches[0].clientX;
      setSwipeInProgress(true);
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (touchStartX.current && swipeInProgress) {
      const newWidthDifference = event.touches[0].clientX - touchStartX.current;
      setWidthDifference(newWidthDifference);
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
    setSwipeInProgress(false);
  };

  // UseEffect used to scroll slide
  useEffect(() => {
    if (slider.current) {
      slider.current.scrollLeft = activeSlide * slider.current.clientWidth;
    }
  }, [activeSlide]);

  // UseEffect used to get active slide on basis of swipe width difference.
  useEffect(() => {
    if (widthDifference > 0) {
      const newActiveSlide = activeSlide === 0 ? activeSlide : activeSlide - 1;
      setActiveSlide(newActiveSlide);
      setSwipeInProgress(false);
    } else if (widthDifference < 0) {
      const newActiveSlide =
        activeSlide === slides.length - 1 ? activeSlide : activeSlide + 1;
      setActiveSlide(newActiveSlide);
      setSwipeInProgress(false);
    }
  }, [widthDifference]);

  // UseEffect used to trigger the scroll event of slide on every 5 secs of Interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newActiveSlide =
        activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
      setActiveSlide(newActiveSlide);
    }, 5000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex flex-col w-full sm:w-[90%] md:w-full xl:w-[90%] justify-around">
      {/* Slides */}
      <div
        className="flex overflow-hidden scroll-smooth"
        onTouchEnd={handleTouchEnd}
        onTouchMoveCapture={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={slider}
      >
        {slides.map((slide) => (
          <div
            className="flex flex-col items-center lg:items-start p-2 xs:p-5 gap-3 min-w-full"
            key={`key-slide-${slide.id}`}
          >
            <Image
              alt={`${slide.title} Image`}
              className="w-fit max-h-[225px] xl:max-h-[300px] 2xl:max-h-[350px] object-fill object-center md:object-left rounded-none p-1"
              height={0}
              src={slide.imageUrl}
              width={0}
            />
            <div className="flex flex-col gap-3">
              <Text variant="heading1" color="primaryInverse">
                {slide.title}
              </Text>
              <Text variant="subHeading1" color="secondaryInverse">
                {slide.subTitle}
              </Text>
              <Text variant="paragraph" color="defaultInverse">
                {slide.description}
              </Text>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex justify-center gap-5">
        {slides.map((slide, index) => (
          <div
            className={`w-5 h-1 my-2 cursor-pointer ${
              activeSlide === index
                ? "bg-white dark:bg-gray-200"
                : "bg-[#ffffff77]"
            }`}
            key={`key-slidebar-${slide.id}`}
            onClick={() => setActiveSlide(slide.id)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default WelcomeSlider;
