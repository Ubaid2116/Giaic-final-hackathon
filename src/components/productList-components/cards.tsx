"use client";
import Link from "next/link";
import ProductCard, { Product } from "../home-components/product-card";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Loader from "../home-components/loader";
import { motion } from "framer-motion";

const Cards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "productList"]{
        _id,
        name,
        slug,
        image,
        description,
        price,
        discountPrice,
        colors,
        department,
        stock,
        rating,
        reviews,
        inStock,
      }`;

      const data: Product[] = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-lg text-[#252B42]">
        <Loader />
      </div>
    );
  }

  // Animation variants for product cards
  const productCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for pagination buttons
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-col items-center justify-center text-center mt-5 mb-7 wrapper">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            variants={productCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }} // Staggered delay
          >
            <Link href={`/productList/${product.slug?.current}`} passHref>
              <div>
                <ProductCard product={product} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <motion.div
        className="flex flex-wrap justify-center items-center space-x-4 mt-16 border-[#BDBDBD] border-2 rounded-md"
        variants={productCardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.button
          className="px-4 py-2 bg-[#F3F3F3] text-[#BDBDBD] rounded-md hover:bg-gray-300 text-sm sm:px-8 sm:py-6"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          First
        </motion.button>
        <div className="flex justify-center space-x-2 mt-4 sm:mt-0">
          <motion.button
            className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            1
          </motion.button>
          <motion.button
            className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            2
          </motion.button>
          <motion.button
            className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            3
          </motion.button>
        </div>
        <motion.button
          className="px-4 py-2 text-[#23A6F0] rounded-md hover:bg-[#1D8CC8] hover:text-white text-sm sm:px-8 sm:py-6"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Next
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Cards;