"use client";

// Import React,NextJS Libraries & Icons
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Import Files
import { useCart } from "../../../../context/CartContext";

// ProductCard Component
export default function ProductCard({ product }) {
  // States
  const { addProduct } = useCart();
  const [hovered, setHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(""); // Flash sale timer
  const isFlash = product.tags?.includes("flash-sale");
  const isNew = product.tags?.includes("new-arrival");

  // UseEffect
  useEffect(() => {
    if ((!isFlash && !isNew) || !product.flashSaleStart) return;

    const duration = Number(product.flashDurationMinutes) || 120;
    const flashEnd = new Date(product.flashSaleStart);
    flashEnd.setMinutes(flashEnd.getMinutes() + duration);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = flashEnd - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("Sale ended");
        return;
      }

      const h = Math.floor(diff / 1000 / 60 / 60);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);

  // Inside your component
  const handleAddToCart = () => {
    if (timeLeft === "Sale ended") {
      toast.error("This sale has ended, you cannot add this product to the cart.", { autoClose: 500 });
      return;
    }
    addProduct(product);
  };

  // UI/UX Design
  return (
    <div className="relative mx-5 w-80 sm:w-90 flex-shrink-0 rounded-2xl shadow-md pb-4 bg-white dark:bg-[#222222] hover:scale-101 duration-500 transition-all">
      {isFlash && timeLeft && (
        <div className="absolute top-2 left-2 bg-red-600 animate-pulse text-white px-2 py-1 rounded text-xs font-bold z-10">
          {timeLeft}
        </div>
      )}

      {isNew && timeLeft && (
        <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs font-bold z-10">
          NEW
        </div>
      )}

      <Link href={`/shop/${product._id}`}>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${
            hovered ? product.images[1] : product.images[0]
          }`}
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
            href={`/shop/${product._id}`}
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
