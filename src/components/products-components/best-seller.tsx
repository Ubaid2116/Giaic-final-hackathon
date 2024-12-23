import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Floating Phone",
    description:
      "A sleek and stylish floating phone that protects from water damage.",
    price: 16.48,
    discountPrice: 6.48,
    imageUrl: "/products1.jpeg",
  },
  {
    id: 2,
    name: "Smart Watch",
    description:
      "Smartwatch with advanced features for fitness and productivity.",
    price: 120.0,
    discountPrice: 90.0,
    imageUrl: "/products2.jpeg",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description:
      "Compact, high-quality wireless earbuds with excellent sound clarity.",
    price: 75.99,
    discountPrice: 50.99,
    imageUrl: "/products3.jpeg",
  },
  {
    id: 4,
    name: "Laptop Stand",
    description:
      "An ergonomic laptop stand designed to improve posture and comfort.",
    price: 25.99,
    discountPrice: 15.99,
    imageUrl: "/products4.jpeg",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    description:
      "Precision gaming mouse with customizable buttons and RGB lighting.",
    price: 45.99,
    discountPrice: 35.99,
    imageUrl: "/products5.jpeg",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with crystal-clear sound and deep bass.",
    price: 60.0,
    discountPrice: 45.0,
    imageUrl: "/products6.jpeg",
  },
  {
    id: 7,
    name: "Portable Power Bank",
    description:
      "High-capacity power bank to keep your devices charged on the go.",
    price: 35.99,
    discountPrice: 25.99,
    imageUrl: "/products7.jpeg",
  },
  {
    id: 8,
    name: "Ergonomic Desk Chair",
    description:
      "Comfortable and adjustable desk chair designed for long working hours.",
    price: 150.0,
    discountPrice: 120.0,
    imageUrl: "/products8.jpeg",
  },
];

const BestSeller = () => {
  return (
    <div className="bg-[#FAFAFA] py-7 mt-10 wrapper">
      <div>
        <h2 className="px-28 font-bold text-[#252B42] text-[24px]">
          BESTSELLER PRODUCTS
        </h2>
      </div>
      <div className="border-b border-[#ECECEC] mt-8"></div>
      <div className="flex flex-wrap justify-center gap-6 mt-10 px-4 sm:px-14">
        {/* Product Cards */}
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="w-[280px] h-[460px] bg-white rounded-sm shadow-md overflow-hidden"
          >
            <div className="relative w-full h-[300px]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-[#252B42] font-bold text-[16px]">
                {product.name}
              </h3>
              <p className="text-[#737373] text-[14px] font-bold mt-2">
                {product.description}
              </p>
              <p className="text-[#BDBDBD] font-bold text-[16px] mt-4">
                ${product.price}{" "}
                <span className="text-[#23856D] font-bold text-[16px] ml-3">
                  ${product.discountPrice}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
