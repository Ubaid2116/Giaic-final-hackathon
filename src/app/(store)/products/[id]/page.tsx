"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import { FiChevronRight, FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CartItem, useCart } from "@/components/cart-components/CartContext";
import Footer from "@/components/team-components/footer";
import Header from "@/components/productList-components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Loader from "@/components/home-components/loader";
import { urlFor } from "@/sanity/lib/image";
import { TypedObject } from "sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  image: SanityImageSource;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  discountPrice?: number;
  reviews: number;
  additionalImages: SanityImageSource[];
  slug: {
    current: string;
  };
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const query = `*[_type == "product" && slug.current == $id][0]`;
        const product = await client.fetch(query, { id });

        if (!product) {
          throw new Error("Product not found");
        }

        setProduct(product);
        if (product?.image) {
          setCurrentImage(urlFor(product.image).url());
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load product"
        );
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product)
    return <div className="text-center py-10">Product not found</div>;

  const handleImageClick = (image: SanityImageSource) => {
    const imageUrl = urlFor(image).url();
    setCurrentImage(imageUrl);
    setSelectedImage(imageUrl);
  };

  const handleAddToCart = () => {
    if (product) {
      const item: CartItem = {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.discountPrice || product.price,
        quantity: 1,
        imageUrl: urlFor(product.image).url(),
      };

      addToCart(item);

      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      console.log("Product data is missing!");
    }
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
        <div className="relative w-full sm:w-[506px] mb-4 sm:mb-0">
          {/* Main Image */}
          <div className="w-full h-[250px] sm:h-[450px] mb-4 relative">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.name || "Product Image"}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full rounded-md"></div>
            )}
          </div>

          {/* Additional Thumbnails */}
          <div className="flex gap-4 justify-start mt-2">
            {product.additionalImages.slice(0, 2).map((image, index) => (
              <div
                key={index}
                className="cursor-pointer border border-gray-200 rounded-md overflow-hidden"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={urlFor(image).width(100).height(75).url()}
                  alt={`Additional Image ${index + 1}`}
                  width={100}
                  height={75}
                  className={`rounded-md ${
                    selectedImage === urlFor(image).url()
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                />
              </div>
            ))}
          </div>
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
              ${product.discountPrice || product.price}
            </p>
            <p className="text-[#737373] font-bold text-[14px] mt-1">
              Availability :{" "}
              <span className="text-[#23A6F0] font-bold text-[14px]">
                In Stock
              </span>
            </p>
          </div>
          <div className="mt-8 text-[#737373] text-[16px]">
            <PortableText
              value={product.description as unknown as TypedObject[]}
            />
            <div className="border-b-2 border-[#BDBDBD] mt-8"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-14">
            <button className="px-6 py-1 md:px-6 md:py-4 bg-[#23A6F0] hover:bg-blue-400 text-[#FFFFFF] rounded-md text-[14px] font-bold">
              Select Options
            </button>
            <button className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold">
              <FiHeart />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold"
            >
              <FiShoppingCart />
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
}
