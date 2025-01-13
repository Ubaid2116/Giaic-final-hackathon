"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiChevronRight, FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CartItem, useCart } from "@/components/cart-components/CartContext";
import { useParams } from "next/navigation";
import Footer from "@/components/team-components/footer";
import Header from "@/components/productList-components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "@/sanity/lib/client";
import { Product } from "@/components/home-components/product-card";
import { urlFor } from "@/sanity/lib/image";
import Loader from "@/components/home-components/loader";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const query = `*[_type == "productList" && slug.current == $id][0]`;
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleAddToCart = () => {
    if (!product) {
      console.log("Product data is missing!");
      return;
    }

    // Check if the product is out of stock
    if (!product.inStock) {
      toast.error(
        "This product is out of stock and cannot be added to the cart.",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
      return;
    }

    const item: CartItem = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.discountPrice || product.price,
      quantity: 1,
      imageUrl: urlFor(product.image).url(),
      inStock: product.inStock,
      stock: product.stock,
    };

    addToCart(item);

    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleAddToWishlist = () => {
    if (!product) {
      console.log("Product data is missing!");
      return;
    }

    // Check if the product is in stock
    if (product.inStock) {
      toast.error(
        "This product is in stock and cannot be added to the wishlist.",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
      return;
    }

    const item: CartItem = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.discountPrice || product.price,
      quantity: 1,
      imageUrl: urlFor(product.image).url(),
      inStock: product.inStock,
      stock: product.stock,
    };

    console.log("Adding to Wishlist:", item);
    addToWishlist(item);
    toast.success(`${product.name} added to wishlist!`, {
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
              ${product.discountPrice || product.price}
            </p>
            <p className="text-[#737373] font-bold text-[14px] mt-1">
              Availability :{" "}
              <span
                className={`font-bold text-[14px] ${
                  product.inStock ? "text-[#23A6F0]" : "text-[#E74040]"
                }`}
              >
                {product.inStock
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </p>
          </div>

          <div className="mt-8">
            <p className="text-[#858585] text-[14px]">{product.description}</p>
            <div className="border-b-2 border-[#BDBDBD] mt-8"></div>
          </div>

          {/* Colored Rounded Divs */}
          <div className="flex justify-center sm:justify-start mt-8 gap-4">
            {product.colors?.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>

          {/* Action Buttons with Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-14">
            <button className="px-6 py-1 md:px-6 md:py-4 bg-[#23A6F0] hover:bg-blue-400 text-[#FFFFFF] rounded-md text-[14px] font-bold">
              Select Options
            </button>
            <button
              className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold"
              onClick={handleAddToWishlist}
            >
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
