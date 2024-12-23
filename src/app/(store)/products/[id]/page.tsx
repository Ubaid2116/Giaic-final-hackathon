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
import { useState } from "react";

const products = [
  {
    id: "1",
    name: "Floating Phone",
    description:
      "A sleek floating phone cover that keeps your phone safe and dry in the pool.",
    price: 16.48,
    discountPrice: 6.48,
    imageUrl: "/products1.jpeg",
    additionalImages: ["/products1-2.jpeg", "/products1-3.jpeg"],
    reviews: 10,
  },
  {
    id: "2",
    name: "Smart Watch",
    description:
      "Stay ahead with this sleek Smartwatch, featuring heart rate monitoring, fitness tracking, and notifications. Perfect for your active lifestyle.",
    price: 120.0,
    discountPrice: 90.0,
    imageUrl: "/products2.jpeg",
    additionalImages: ["/products2-2.jpeg", "/products2-3.jpeg"],
    reviews: 5,
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    description:
      "Premium wireless earbuds with noise cancellation and touch controls for a seamless audio experience.",
    price: 75.99,
    discountPrice: 50.99,
    imageUrl: "/products3.jpeg",
    additionalImages: ["/products3-2.jpeg", "/products3-3.jpeg"],
    reviews: 15,
  },
  {
    id: "4",
    name: "Laptop Stand",
    description:
      "An ergonomic laptop stand designed to improve posture, reduce strain, and enhance productivity.",
    price: 25.99,
    discountPrice: 15.99,
    imageUrl: "/products4.jpeg",
    additionalImages: ["/products4-2.jpeg", "/products4-3.jpeg"],
    reviews: 8,
  },
  {
    id: "5",
    name: "Gaming Mouse",
    description:
      "Precision gaming mouse with customizable buttons and RGB lighting.",
    price: 45.99,
    discountPrice: 35.99,
    additionalImages: ["/products5-2.jpeg", "/products5-3.jpeg"],
    imageUrl: "/products5.jpeg",
    reviews: 4,
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with crystal-clear sound and deep bass.",
    price: 60.0,
    discountPrice: 45.0,
    additionalImages: ["/products6-2.jpeg", "/products6-3.jpeg"],
    imageUrl: "/products6.jpeg",
    reviews: 6,
  },
  {
    id: "7",
    name: "Portable Power Bank",
    description:
      "High-capacity power bank to keep your devices charged on the go.",
    price: 35.99,
    discountPrice: 25.99,
    additionalImages: ["/products7-2.jpeg", "/products7-3.jpeg"],
    imageUrl: "/products7.jpeg",
    reviews: 3,
  },
  {
    id: "8",
    name: "Ergonomic Desk Chair",
    description:
      "Comfortable and adjustable desk chair designed for long working hours.",
    price: 150.0,
    discountPrice: 120.0,
    additionalImages: ["/products8-2.jpeg", "/products8-3.jpeg"],
    imageUrl: "/products8.jpeg",
    reviews: 4,
  },
];

const ProductPage = () => {
  const params = useParams();
  const { addToCart } = useCart();

  const product = products.find((product) => product.id === params?.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const [currentImage, setCurrentImage] = useState<string>(product.imageUrl);
  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrl); // Track selected image

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setSelectedImage(imageUrl); // Update the selected image
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
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
      </ClerkProvider>
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
            src={currentImage}
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
              {product.discountPrice && (
                <span className="line-through text-[#BDBDBD] mr-2">
                  ${product.price}
                </span>
              )}
              ${product.discountPrice}
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
      {/* Thumbnails Section */}
      <div className="flex gap-4 mt-10 md:mt-2 ml-4 sm:ml-14">
        {product.additionalImages.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer ${
              selectedImage === image ? "border-2 border-[#23A6F0]" : ""
            }`} // Add border if image is selected
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image}
              alt="product"
              width={100}
              height={75}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductPage;
