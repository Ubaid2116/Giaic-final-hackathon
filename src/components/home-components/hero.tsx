import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative bg-[url('/hero.png')] bg-cover bg-center sm:bg-[top_center] lg:bg-center h-[400px] sm:h-[600px] lg:h-[716px] wrapper">
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Text Content */}
      <div className="absolute top-40 lg:left-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:transform-none lg:text-left text-center text-white px-4">
        <h2 className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold tracking-wide mb-2 sm:mb-4 mr-10">
          SUMMER 2020
        </h2>
        <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[58px] font-bold mb-4 sm:mb-6 leading-tight mr-10">
          NEW COLLECTION
        </h1>
        <p className="text-[14px] sm:text-[16px] md:text-[20px] leading-relaxed mb-4 sm:mb-8 mr-10">
          We know how large objects will act
        </p>
        <p className="text-[14px] sm:text-[16px] md:text-[20px] leading-relaxed mb-4 sm:mb-8 -mt-3 md:-mt-9 mr-10">
          {" "}
          but things on a small scale.
        </p>
        <Link href={"/products"}>
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#2DC071] text-white font-bold rounded hover:bg-green-700 transition-all mr-10">
            SHOP NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
