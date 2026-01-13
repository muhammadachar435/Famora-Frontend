/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

"use client";

// Import React Icons & Files
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

// Component StoreProductCard
export default function StoreProductCard({ product, category }) {
  const [hovered, setHovered] = useState(false);
  const { addProduct } = useCart();

  // Inside your component
  const handleAddToCart = () => {
    addProduct(product);
  };

  // UI/Ux Design
  return (
    <div className="relative mx-auto w-80 sm:w-90 flex-shrink-0 rounded-2xl shadow-md pb-4 bg-white dark:bg-[#222222] hover:scale-101 duration-500 transition-all">
      <Link href={`${category === "all" ? `/shop/${product._id}` : `/${category}/${product._id}`}`}>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${hovered ? product.images[1] : product.images[0]}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full h-auto sm:h-auto rounded-2xl rounded-b-none"
        />
      </Link>

      <div className="flex justify-between items-center my-5 mx-2">
        <p className="rounded-full w-12 text-center ring ring-blue-400 text-blue-500 text-xs font-bold py-1 ">
          {product.offerImage}
        </p>
        <button
          onClick={handleAddToCart}
          className=" text-white bg-blue-700 font-sans font-semibold hover:bg-blue-900 hover:text-white cursor-pointer flex items-center py-1 px-2 rounded-md duration-500 transition-all"
        >
          <ShoppingBag className="w-4 h-4" /> <span className="ml-2">Add to Cart</span>
        </button>
      </div>

      <div>
        <div className="grid grid-cols-1 place-items-start mx-2">
          <Link
            href={`${category === "all" ? `/shop/${product._id}` : `/${category}/${product._id}`}`}
            className="font-semibold text-base font-roboto text-[#2e2e2e] dark:text-white transition-all duration-500"
          >
            {product.name}
          </Link>
        </div>
        <p className="text-left text-lg px-2 py-1 mt-1 text-[#222222] dark:text-white font-semibold">
          {product.discountPrice.toLocaleString("en-PK", { style: "currency", currency: "PKR" })}
          <span className="line-through mx-2 text-gray-500 dark:text-gray-300 font-medium">
            {product.price.toLocaleString("en-PK", { style: "currency", currency: "PKR" })}
          </span>
        </p>
      </div>
    </div>
  );
}
