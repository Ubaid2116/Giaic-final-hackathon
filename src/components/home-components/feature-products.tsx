import Image from "next/image";
import { Product } from "../../../types";
import ProductCard from "@/components/home-components/product-card";
import Link from "next/link";

const FeatureProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: "9",
      image: "/dress1.jpeg",
      name: "Casual Dress",
      department: "Women's Wear",
      originalPrice: "$20.00",
      discountedPrice: "$10.00",
      colors: ["bg-[#1E90FF]", "bg-[#FF7F50]", "bg-[#FFD700]", "bg-[#6A5ACD]"],
    },
    {
      id: "10",
      image: "/dress2.jpeg",
      name: "Formal Gown",
      department: "Women's Wear",
      originalPrice: "$25.00",
      discountedPrice: "$15.00",
      colors: ["bg-[#2E8B57]", "bg-[#FFA07A]", "bg-[#4682B4]", "bg-[#D2691E]"],
    },
    {
      id: "11",
      image: "/dress3.jpeg",
      name: "Party Dress",
      department: "Event Wear",
      originalPrice: "$18.00",
      discountedPrice: "$12.00",
      colors: ["bg-[#FF6347]", "bg-[#40E0D0]", "bg-[#FFDAB9]", "bg-[#8B008B]"],
    },
    {
      id: "12",
      image: "/card4.png",
      name: "Summer Dress",
      department: "Seasonal Wear",
      originalPrice: "$30.00",
      discountedPrice: "$20.00",
      colors: ["bg-[#FF4500]", "bg-[#2F4F4F]", "bg-[#FF1493]", "bg-[#00BFFF]"],
    },
    {
      id: "13",
      image: "/card5.png",
      name: "Winter Coat",
      department: "Outerwear",
      originalPrice: "$22.00",
      discountedPrice: "$14.00",
      colors: ["bg-[#4B0082]", "bg-[#228B22]", "bg-[#FF00FF]", "bg-[#1E90FF]"],
    },
    {
      id: "14",
      image: "/dress6.jpeg",
      name: "Evening Gown",
      department: "Event Wear",
      originalPrice: "$27.00",
      discountedPrice: "$18.00",
      colors: ["bg-[#FF4500]", "bg-[#7B68EE]", "bg-[#00CED1]", "bg-[#F08080]"],
    },
    {
      id: "15",
      image: "/dress7.jpeg",
      name: "Office Dress",
      department: "Professional Wear",
      originalPrice: "$35.00",
      discountedPrice: "$25.00",
      colors: ["bg-[#8A2BE2]", "bg-[#5F9EA0]", "bg-[#D2691E]", "bg-[#FFD700]"],
    },
    {
      id: "16",
      image: "/card8.png",
      name: "Cocktail Dress",
      department: "Event Wear",
      originalPrice: "$24.00",
      discountedPrice: "$16.00",
      colors: ["bg-[#00FA9A]", "bg-[#FF7F50]", "bg-[#6A5ACD]", "bg-[#FF69B4]"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center mt-28 mb-7 overflow-x-hidden wrapper">
      <div>
        <h3 className="text-[#737373] text-[20px]">Featured Products</h3>
        <h2 className="text-[#252B42] text-[24px] font-bold mt-2">
          BESTSELLER PRODUCTS
        </h2>
        <p className="text-[#737373] text-[14px] mt-2">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Product Cart Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mt-6 w-full">
        {products.map((product, index) => (
          <Link key={index} href={`/productList/${product.id}`} passHref>
            <div>
              {/* Wrap ProductCard with Link */}
              <ProductCard product={product} />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-[#23856D] sm:h-[990px] md:h-[713px] w-full mt-16 pt-7 flex items-center justify-between flex-col md:flex-row">
        {/* Text Section */}
        <div className="text-white space-y-4 ml-4 sm:ml-12 md:ml-36 text-center sm:text-left">
          <h3 className="text-[20px]">SUMMER 2020</h3>
          <h2 className="text-[40px] sm:text-[50px] md:text-[58px] font-bold">
            Vita Classic <br /> <span>Product</span>
          </h2>
          <p className="text-[14px] sm:text-[16px]">
            We know how large objects will act, We know <br />
            <span>how objects will act, We know</span>
          </p>

          {/* Price and Button Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-8 pb-7">
            <h3 className="text-[24px] font-bold">{`$16.48`}</h3>
            <button className="text-[14px] font-bold bg-[#2DC071] py-4 px-10 rounded-md hover:bg-green-600 mt-4 sm:mt-0">
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full sm:w-[400px] md:w-[510px] flex-shrink-0">
          <Image
            src={"/classic.png"}
            alt="classic"
            width={510}
            height={685}
            className="w-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-16 flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-auto">
          <Image
            src={"/universe.png"}
            alt="universe"
            height={704}
            width={682}
            className="w-full"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left w-full md:w-auto mt-6 md:mt-0">
          <h3 className="text-[#BDBDBD] font-bold text-[16px]">SUMMER 2020</h3>
          <h2 className="text-[#252B42] font-bold text-[30px] sm:text-[40px] mt-8">
            Part of the Neural <br /> Universe
          </h2>
          <p className="text-[#737373] text-[14px] sm:text-[20px] mt-7">
            We know how large objects will act, <br />
            but things on a small scale.
          </p>
          <div className="flex gap-5 mt-5 justify-center md:justify-start">
            <button className="text-white text-[14px] font-bold py-3 px-8 rounded-md bg-[#23A6F0] hover:bg-transparent hover:text-blue-500 md:bg-[#2DC071] md:hover:bg-transparent md:hover:text-[#2DC071]">
              Buy Now
            </button>
            <button className="text-[#23A6F0] text-[14px] font-bold py-3 px-8 rounded-md border-2 border-[#23A6F0] hover:bg-[#23A6F0] hover:text-white md:border-[#2DC071] md:text-[#2DC071] md:hover:bg-transparent md:hover:bg-green-500">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
