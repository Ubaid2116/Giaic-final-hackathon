"use client";
import Image from "next/image";
import React from "react";
import { FiChevronRight, FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useCart } from "@/components/cart-components/CartContext";
import { useParams } from "next/navigation";
import Footer from "@/components/team-components/footer";
import Header from "@/components/productList-components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = [
  {
    id: "9",
    image: "/dress1.jpeg",
    name: "Casual Dress",
    department: "Women's Wear",
    price: "20.00",
    discountedPrice: "10.00",
    colors: ["bg-[#1E90FF]", "bg-[#FF7F50]", "bg-[#FFD700]", "bg-[#6A5ACD]"],
    reviews: 3,
    description: "A comfortable casual dress perfect for daily wear.",
  },
  {
    id: "10",
    image: "/dress2.jpeg",
    name: "Formal Gown",
    department: "Women's Wear",
    price: "25.00",
    discountedPrice: "15.00",
    colors: ["bg-[#2E8B57]", "bg-[#FFA07A]", "bg-[#4682B4]", "bg-[#D2691E]"],
    reviews: 5,
    description:
      "An elegant formal gown ideal for evening events and formal occasions.",
  },
  {
    id: "11",
    image: "/dress3.jpeg",
    name: "Party Dress",
    department: "Event Wear",
    price: "18.00",
    discountedPrice: "12.00",
    colors: ["bg-[#FF6347]", "bg-[#40E0D0]", "bg-[#FFDAB9]", "bg-[#8B008B]"],
    reviews: 4,
    description: "A stylish party dress that stands out in any gathering.",
  },
  {
    id: "12",
    image: "/card4.png",
    name: "Summer Dress",
    department: "Seasonal Wear",
    price: "30.00",
    discountedPrice: "20.00",
    colors: ["bg-[#FF4500]", "bg-[#2F4F4F]", "bg-[#FF1493]", "bg-[#00BFFF]"],
    reviews: 6,
    description:
      "A light and breezy summer dress to keep you cool and stylish.",
  },
  {
    id: "13",
    image: "/card5.png",
    name: "Winter Coat",
    department: "Outerwear",
    price: "22.00",
    discountedPrice: "14.00",
    colors: ["bg-[#4B0082]", "bg-[#228B22]", "bg-[#FF00FF]", "bg-[#1E90FF]"],
    reviews: 8,
    description: "A cozy winter coat to keep you warm during chilly days.",
  },
  {
    id: "14",
    image: "/dress6.jpeg",
    name: "Evening Gown",
    department: "Event Wear",
    price: "27.00",
    discountedPrice: "18.00",
    colors: ["bg-[#FF4500]", "bg-[#7B68EE]", "bg-[#00CED1]", "bg-[#F08080]"],
    reviews: 7,
    description:
      "A stunning evening gown for special occasions and formal dinners.",
  },
  {
    id: "15",
    image: "/dress7.jpeg",
    name: "Office Dress",
    department: "Professional Wear",
    price: "35.00",
    discountedPrice: "25.00",
    colors: ["bg-[#8A2BE2]", "bg-[#5F9EA0]", "bg-[#D2691E]", "bg-[#FFD700]"],
    reviews: 9,
    description:
      "A sleek office dress designed for a professional and modern look.",
  },
  {
    id: "16",
    image: "/card8.png",
    name: "Cocktail Dress",
    department: "Event Wear",
    price: "24.00",
    discountedPrice: "16.00",
    colors: ["bg-[#00FA9A]", "bg-[#FF7F50]", "bg-[#6A5ACD]", "bg-[#FF69B4]"],
    reviews: 5,
    description:
      "An elegant cocktail dress that blends sophistication with style.",
  },
  {
    id: "17",
    image: "/dress9.jpeg",
    name: "Traditional Dress",
    department: "Cultural Wear",
    price: "28.00",
    discountedPrice: "19.00",
    colors: ["bg-[#FF4500]", "bg-[#FF6347]", "bg-[#32CD32]", "bg-[#6B8E23]"],
    reviews: 6,
    description:
      "A traditional dress celebrating cultural heritage with a modern twist.",
  },
  {
    id: "18",
    image: "/dress10.jpeg",
    name: "Maxi Dress",
    department: "Women's Wear",
    price: "19.00",
    discountedPrice:"9.00",
    colors: ["bg-[#FFA07A]", "bg-[#8A2BE2]", "bg-[#2E8B57]", "bg-[#4682B4]"],
    reviews: 4,
    description: "A flowing maxi dress for a comfortable and chic look.",
  },
  {
    id: "19",
    image: "/dress11.jpeg",
    name: "Jacket Dress",
    department: "Outerwear",
    price: "23.00",
    discountedPrice: "12.50",
    colors: ["bg-[#FF4500]", "bg-[#00CED1]", "bg-[#FFD700]", "bg-[#9400D3]"],
    reviews: 7,
    description: "A versatile jacket dress that combines warmth with style.",
  },
  {
    id: "20",
    image: "/card12.png",
    name: "Designer Dress",
    department: "Women's Wear",
    price: "26.50",
    discountedPrice: "17.50",
    colors: ["bg-[#6495ED]", "bg-[#FF69B4]", "bg-[#BA55D3]", "bg-[#7FFF00]"],
    reviews: 8,
    description:
      "A high-end designer dress for an exclusive and luxurious look.",
  },
];

const ProductPage = () => {
  const params = useParams();
  const { addToCart } = useCart();

  const product = products.find((product) => product.id === params?.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.discountedPrice.replace("$", "")),
      quantity: 1,
      imageUrl: product.image,
    });

    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="bg-[#FAFAFA]">
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>{" "}
      <div>
        <p className="text-[#252B42] mt-5 font-bold text-[14px] flex py-8 px-4 sm:px-16 gap-1">
          Home <FiChevronRight className="text-[#BDBDBD] text-[25px]" />{" "}
          <span className="text-[#737373]">Shop</span>
        </p>
      </div>
      <div className="px-4 sm:px-14 flex flex-col sm:flex-row">
        {/* Carousel Section */}
        <div className="relative w-full sm:w-[506px] h-[250px] sm:h-[450px] mb-4 sm:mb-0">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        {/* Product Details Section */}
        <div className="ml-0 sm:ml-10 text-center sm:text-left">
          <h2 className="text-[#252B42] text-[20px] mt-12 md:mt-0">
            {product.name}
          </h2>
          {/* Star Reviews Section */}
          <div className="flex justify-center sm:justify-start items-center mt-2">
            <div className="flex text-[#F3CD03] gap-2">
              {[...Array(5)].map((_, index) =>
                index < product.reviews ? (
                  <FaStar key={index} size={22} />
                ) : (
                  <FaRegStar key={index} size={22} />
                )
              )}
            </div>
            <span className="ml-2 text-[#737373] font-bold text-[14px]">
              {product.reviews} Reviews
            </span>
          </div>

          {/* Price and Availability */}
          <div className="mt-6">
            <p className="text-[#252B42] font-bold text-[24px]">
              {product.discountedPrice && (
                <span className="line-through text-[#BDBDBD] mr-2">
                  ${product.price}
                </span>
              )}
              ${product.discountedPrice}
            </p>
            <p className="text-[#737373] font-bold text-[14px] mt-1">
              Availability :{" "}
              <span className="text-[#23A6F0] font-bold text-[14px]">
                In Stock
              </span>
            </p>
          </div>

          <div className="mt-8">
            <p className="text-[#858585] text-[14px]">{product.description}</p>
            <div className="border-b-2 border-[#BDBDBD] mt-8"></div>
          </div>

          {/* Colored Rounded Divs */}
          <div className="flex justify-center sm:justify-start mt-8 gap-4">
            <div className="w-8 h-8 bg-[#23A6F0] rounded-full"></div>
            <div className="w-8 h-8 bg-[#2DC071] rounded-full"></div>
            <div className="w-8 h-8 bg-[#E77C40] rounded-full"></div>
            <div className="w-8 h-8 bg-[#252B42] rounded-full"></div>
          </div>

          {/* Action Buttons with Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-14">
            <button className="px-6 py-1 md:px-6 md:py-4 bg-[#23A6F0] hover:bg-blue-400 text-[#FFFFFF] rounded-md text-[14px] font-bold">
              Select Options
            </button>
            <button className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold">
              <FiHeart />
            </button>
            <button className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold">
              <FiShoppingCart onClick={handleAddToCart} />
            </button>
            <button className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold">
              <FiEye />
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductPage;
