import { Product } from "../../../types";
import Link from "next/link";
import ProductCard from "../home-components/product-card";

const Cards: React.FC = () => {
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
    {
      id: "17",
      image: "/dress9.jpeg",
      name: "Traditional Dress",
      department: "Cultural Wear",
      originalPrice: "$28.00",
      discountedPrice: "$19.00",
      colors: ["bg-[#FF4500]", "bg-[#FF6347]", "bg-[#32CD32]", "bg-[#6B8E23]"],
    },
    {
      id: "18",
      image: "/dress10.jpeg",
      name: "Maxi Dress",
      department: "Women's Wear",
      originalPrice: "$19.00",
      discountedPrice: "$9.00",
      colors: ["bg-[#FFA07A]", "bg-[#8A2BE2]", "bg-[#2E8B57]", "bg-[#4682B4]"],
    },
    {
      id: "19",
      image: "/dress11.jpeg",
      name: "Jacket Dress",
      department: "Outerwear",
      originalPrice: "$23.00",
      discountedPrice: "$12.50",
      colors: ["bg-[#FF4500]", "bg-[#00CED1]", "bg-[#FFD700]", "bg-[#9400D3]"],
    },
    {
      id: "20",
      image: "/card12.png",
      name: "Designer Dress",
      department: "Women's Wear",
      originalPrice: "$26.50",
      discountedPrice: "$17.50",
      colors: ["bg-[#6495ED]", "bg-[#FF69B4]", "bg-[#BA55D3]", "bg-[#7FFF00]"],
    },    
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center mt-5 mb-7 overflow-x-hidden wrapper">
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

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center items-center space-x-4 mt-16 border-[#BDBDBD] border-2 rounded-md">
        <button className="px-4 py-2 bg-[#F3F3F3] text-[#BDBDBD] rounded-md hover:bg-gray-300 text-sm sm:px-8 sm:py-6">
          First
        </button>

        {/* Page Numbers */}
        <div className="flex justify-center space-x-2 mt-4 sm:mt-0">
          <button className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6">
            1
          </button>
          <button className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6">
            2
          </button>
          <button className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6">
            3
          </button>
        </div>

        <button className="px-4 py-2 text-[#23A6F0] rounded-md hover:bg-[#1D8CC8] hover:text-white text-sm sm:px-8 sm:py-6">
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;
