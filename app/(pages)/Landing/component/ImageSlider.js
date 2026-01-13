"use client";

// Import React ,Nextjs & Icons
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Images
const images = ["/img1.jpeg", "/img2.jpg", "/img3.jpg", "/img4.jpg", "/img5.jpg"];

// ImageSlider Component
export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide (fixed)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // UI/Ux Design
  return (
    <>
      <div className="relative w-full h-75 sm:h-[500px] xl:h-[550px] overflow-hidden mt-27 lg:mt-31">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image src={src} fill className="object-cover" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
          <ChevronLeft size={32} />
        </button>

        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
          <ChevronRight size={32} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex
                  ? "bg-gradient-to-r from-[#2d2f83] to-[#3b3bbf]  scale-110"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Shop Now */}
      <div className="flex justify-center my-8">
        <Link
          href="/shop"
          className="inline-block rounded-sm bg-gradient-to-r from-[#2d2f83] to-[#3b3bbf] w-full text-center max-w-75 sm:max-w-[600px] py-2
               text-xl font-roboto font-semibold text-white
               shadow-sm transition-all duration-300
               hover:bg-[#e225a0] hover:scale-101
               focus:outline-none  "
        >
          Shop Now
        </Link>
      </div>
    </>
  );
}
