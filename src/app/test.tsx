// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FiChevronRight, FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import { CartItem, useCart } from "@/components/cart-components/CartContext";
// import Footer from "@/components/team-components/footer";
// import Header from "@/components/productList-components/header";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { client } from "@/sanity/lib/client";
// import { PortableText } from "@portabletext/react";
// import Loader from "@/components/home-components/loader";
// import { urlFor } from "@/sanity/lib/image";
// import { TypedObject } from "sanity";
// import { SanityImageSource } from "@sanity/image-url/lib/types/types";
// import { useParams } from "next/navigation";

// interface Product {
//   _id: string;
//   name: string;
//   image: SanityImageSource;
//   category: string;
//   price: number;
//   originalPrice?: number;
//   description: string;
//   discountPrice?: number;
//   reviews: number;
//   additionalImages: SanityImageSource[];
//   slug: {
//     current: string;
//   };
//   inStock: boolean;
//   stock: number;
// }

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { addToCart, addToWishlist } = useCart();
//   const [currentImage, setCurrentImage] = useState<string>("");
//   const [selectedImage, setSelectedImage] = useState<string>("");

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const query = `*[_type == "product" && slug.current == $id][0]`;
//         const product = await client.fetch(query, { id });

//         if (!product) {
//           throw new Error("Product not found");
//         }

//         setProduct(product);
//         if (product?.image) {
//           setCurrentImage(urlFor(product.image).url());
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setError(
//           error instanceof Error ? error.message : "Failed to load product"
//         );
//         toast.error("Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!product) {
//       console.log("Product data is missing!");
//       return;
//     }

//     // Check if the product is out of stock
//     if (!product.inStock || product.stock <= 0) {
//       toast.error(
//         "This product is out of stock and cannot be added to the cart.",
//         {
//           position: "bottom-right",
//           autoClose: 3000,
//         }
//       );
//       return;
//     }

//     try {
//       // Call the API to update the stock
//       const response = await fetch("/api/updateStock", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           productId: product._id,
//           quantity: 1, // Assuming user buys 1 item
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to update stock");
//       }

//       // Update the local state with the new stock quantity
//       setProduct((prevProduct) => {
//         if (!prevProduct) return null;
//         return {
//           ...prevProduct,
//           stock: data.newStock,
//           inStock: data.newStock > 0,
//         };
//       });

//       // Add the product to the cart
//       const item: CartItem = {
//         id: product._id,
//         name: product.name,
//         description: product.description,
//         price: product.discountPrice || product.price,
//         quantity: 1,
//         imageUrl: urlFor(product.image).url(),
//         inStock: product.inStock,
//         stock: product.stock,
//       };

//       addToCart(item);

//       toast.success(`${product.name} added to cart!`, {
//         position: "bottom-right",
//         autoClose: 3000,
//       });
//     } catch (error) {
//       console.error("Error updating stock:", error);
//       toast.error("Failed to update stock. Please try again.", {
//         position: "bottom-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleAddToWishlist = () => {
//     if (!product) {
//       console.log("Product data is missing!");
//       return;
//     }

//     // Check if the product is in stock
//     if (product.inStock) {
//       toast.error(
//         "This product is in stock and cannot be added to the wishlist.",
//         {
//           position: "bottom-right",
//           autoClose: 3000,
//         }
//       );
//       return;
//     }

//     const item: CartItem = {
//       id: product._id,
//       name: product.name,
//       description: product.description,
//       price: product.discountPrice || product.price,
//       quantity: 1,
//       imageUrl: urlFor(product.image).url(),
//       inStock: product.inStock,
//       stock: product.stock,
//     };

//     console.log("Adding to Wishlist:", item);
//     addToWishlist(item);
//     toast.success(`${product.name} added to wishlist!`, {
//       position: "bottom-right",
//       autoClose: 3000,
//     });
//   };

//   if (loading) return <Loader />;
//   if (error)
//     return <div className="text-center text-red-500 py-10">{error}</div>;
//   if (!product)
//     return <div className="text-center py-10">Product not found</div>;

//   return (
//     <div className="bg-[#FAFAFA]">
//       <ClerkProvider
//         publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
//       >
//         <Header />
//       </ClerkProvider>
//       <div>
//         <p className="text-[#252B42] mt-5 font-bold text-[14px] flex py-8 px-4 sm:px-16 gap-1">
//           Home <FiChevronRight className="text-[#BDBDBD] text-[25px]" />{" "}
//           <span className="text-[#737373]">Shop</span>
//         </p>
//       </div>
//       <div className="px-4 sm:px-14 flex flex-col sm:flex-row">
//         {/* Carousel Section */}
//         <div className="relative w-full sm:w-[506px] mb-4 sm:mb-0">
//           {/* Main Image */}
//           <div className="w-full h-[250px] sm:h-[450px] mb-4 relative">
//             {currentImage ? (
//               <Image
//                 src={currentImage}
//                 alt={product.name || "Product Image"}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-md"
//               />
//             ) : (
//               <div className="bg-gray-300 w-full h-full rounded-md"></div>
//             )}
//           </div>

//           {/* Additional Thumbnails */}
//           <div className="flex gap-4 justify-start mt-2">
//             {product.additionalImages.slice(0, 2).map((image, index) => (
//               <div
//                 key={index}
//                 className="cursor-pointer border border-gray-200 rounded-md overflow-hidden"
//               >
//                 <Image
//                   src={urlFor(image).width(100).height(75).url()}
//                   alt={`Additional Image ${index + 1}`}
//                   width={100}
//                   height={75}
//                   className={`rounded-md ${
//                     selectedImage === urlFor(image).url()
//                       ? "border-2 border-blue-500"
//                       : ""
//                   }`}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div className="ml-0 sm:ml-10 text-center sm:text-left">
//           <h2 className="text-[#252B42] text-[20px] mt-12 md:mt-0">
//             {product.name}
//           </h2>

//           {/* Star Reviews Section */}
//           <div className="flex justify-center sm:justify-start items-center mt-2">
//             <div className="flex text-[#F3CD03] gap-2">
//               {[...Array(5)].map((_, index) =>
//                 index < product.reviews ? (
//                   <FaStar key={index} size={22} />
//                 ) : (
//                   <FaRegStar key={index} size={22} />
//                 )
//               )}
//             </div>
//             <span className="ml-2 text-[#737373] font-bold text-[14px]">
//               {product.reviews} Reviews
//             </span>
//           </div>

//           {/* Price and Availability */}
//           <div className="mt-6">
//             <p className="text-[#252B42] font-bold text-[24px]">
//               {product.discountPrice && (
//                 <span className="line-through text-[#BDBDBD] mr-2">
//                   ${product.price}
//                 </span>
//               )}
//               ${product.discountPrice || product.price}
//             </p>
//             <p className="text-[#737373] font-bold text-[14px] mt-1">
//               Availability :{" "}
//               <span
//                 className={`font-bold text-[14px] ${
//                   product.inStock ? "text-[#23A6F0]" : "text-[#E74040]"
//                 }`}
//               >
//                 {product.inStock
//                   ? `In Stock (${product.stock} available)`
//                   : "Out of Stock"}
//               </span>
//             </p>
//           </div>
//           <div className="mt-8 text-[#737373] text-[16px]">
//             <PortableText
//               value={product.description as unknown as TypedObject[]}
//             />
//             <div className="border-b-2 border-[#BDBDBD] mt-8"></div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-center sm:justify-start gap-4 mt-14">
//             <button className="px-6 py-1 md:px-6 md:py-4 bg-[#23A6F0] hover:bg-blue-400 text-[#FFFFFF] rounded-md text-[14px] font-bold">
//               Select Options
//             </button>
//             <button
//               className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold"
//               onClick={handleAddToCart}
//             >
//               <FiShoppingCart />
//             </button>
//             <button
//               className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold"
//               onClick={handleAddToWishlist}
//             >
//               <FiHeart />
//             </button>
//             <button className="w-12 h-12 bg-[#FFFFFF] hover:bg-[#F1F1F1] text-[#252B42] border border-[#BDBDBD] rounded-full flex items-center justify-center text-[20px] font-bold">
//               <FiEye />
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// }






"use client";

import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "@/components/cart-components/CartContext";
import Header from "@/components/productList-components/header";
import Footer from "@/components/team-components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe.js has not loaded properly.");
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      } else {
        console.error("No session ID returned.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <Header />
      </ClerkProvider>
      <div className="wrapper">
        <div className="bg-[#FAFAFA] min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-[#252B42] mb-8 text-center">
              Shopping Cart
            </h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="bg-[#F3F4F6] text-sm text-[#252B42]">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-4 px-4 flex items-center space-x-3">
                        {/* Product Image */}
                        <div className="w-16 h-16 relative">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                        {/* Product Name */}
                        <span className="text-sm font-medium text-[#252B42] pt-[10px]">
                          {item.name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2 justify-center">
                          <button
                            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-all"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-all"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <button
                          className="text-red-600 hover:text-red-800 transition-all"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/3">
                <h2 className="text-xl font-bold text-[#252B42] mb-4">
                  Order Summary
                </h2>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-600">
                    Subtotal
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-[#252B42]">
                    Total
                  </span>
                  <span className="text-lg font-bold text-[#252B42]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#23A6F0] hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
