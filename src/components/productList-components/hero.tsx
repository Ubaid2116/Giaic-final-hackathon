import Image from "next/image";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

const Hero = () => {
  return (
    <div className="px-6 mt-4">
      <div className="bg-[#FAFAFA] px-5 py-4 pb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[#252B42] font-bold text-[24px]">Shop</h2>
          <p className="text-[#252B42] font-bold text-[14px] flex items-center gap-1">
            Home <FiChevronRight className="text-[#BDBDBD] text-[25px]" />{" "}
            <span className="text-[#737373]">Shop</span>
          </p>
        </div>

        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
          {[
            "product1.png",
            "product2.png",
            "product3.png",
            "product4.png",
            "product5.png",
          ].map((product, index) => (
            <div
              key={index}
              className="relative group w-full sm:w-[calc(20%-1rem)] md:w-[calc(20%-1rem)]"
            >
              <div className="relative group">
                <Image
                  src={`/${product}`}
                  alt="product"
                  height={223}
                  width={240}
                  className="object-cover"
                />
                {/* Text on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-[#FFFFFF] transition-opacity duration-300">
                  <h3 className="text-[16px] font-bold">Trending Apparel</h3>
                  <p className="text-[14px]">Explore 5 Stylish Products</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Section below images */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-8 px-4 sm:px-28">
        {/* Left side - Showing all 12 results */}
        <div className="text-[#737373] text-[14px] font-bold text-center sm:text-left w-full sm:w-auto">
          <p>Showing all 12 results</p>
        </div>

        {/* Center section - Box Icon and Hamburger */}
        <div className="flex justify-center items-center gap-3 text-center sm:text-center w-full sm:w-auto mt-4 sm:mt-0">
          <p className="text-[#737373] text-[14px] font-bold">Views:</p>
          <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#DDDDDD] text-[#252B42]">
            <Image src={"/grid-icon.png"} alt="icon" width={14} height={14} />
          </div>
          <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#DDDDDD] text-[#737373]">
            <Image src={"/list-icon.png"} alt="icon" height={16} width={16} />
          </div>
        </div>

        {/* Right section - Popularity Dropdown and Filter Button */}
        <div className="flex items-center gap-4 text-center sm:text-left w-full sm:w-auto mt-4 sm:mt-0">
          <select className="bg-[#F9F9F9] border border-[#DDDDDD] py-3 px-2 text-[#737373] text-[14px] rounded-md w-full sm:w-auto">
            <option value="popularity">Popularity</option>
            <option value="price_low_to_high">Price: Low to High</option>
            <option value="price_high_to_low">Price: High to Low</option>
          </select>
          <button className="bg-[#23A6F0] text-white py-3 px-5 rounded-md hover:bg-[#1c8a9b] transition-all duration-300 font-bold text-[14px] w-full sm:w-auto">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
