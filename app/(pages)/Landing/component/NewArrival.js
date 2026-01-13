/* eslint-disable react-hooks/set-state-in-effect */

"use client"; // file run it server

// Import React and Nextjs Libraries
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/components/AnimationMotion/Variants";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Files
import { getProducts } from "../../../../services/product";
import ProductCard from "./ProductCard";

// New Arrival Component
export default function NewArrival() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Fetch Product Data
  useEffect(() => {
    load();
  }, []);

  // Load Data
  const load = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error, "Api Error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  // Scrolling
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // UI/UX Design
  return (
    <div className="my-14 relative ">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className=" relative inline-block mx-4 "
      >
        <p className="text-[28px] sm:text-3xl md:text-4xl font-inter font-bold text-[#1b1a1a] dark:text-white">
          New Arrivals
        </p>
      </motion.div>

      {loading ? (
        <p className="my-4 flex justify-center items-center text-2xl font-inter gap-2 text-slate-800">
          Loading
          <span className="w-4 h-4 rounded-full border-2 border-dotted border-slate-800 animate-spin [animation-duration:2s]"></span>
        </p>
      ) : products.length === 0 ? (
        <p className="my-6 text-center text-xl text-red-600 font-medium">
          ⚠️ Unable to load products. Please check your internet connection.
        </p>
      ) : (
        <>
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 flex transform -translate-y-1/2 bg-blue-500  rounded-full shadow p-0.5 z-10 cursor-pointer"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 rounded-full p-0.5 shadow z-10 cursor-pointer"
          >
            <ChevronRight className="text-white w-5 h-5" /> {/* ChevronRight  */}
          </button>

          <div ref={scrollRef} className="flex overflow-hidden space-x-4 scroll-smooth mt-8">
            {products
              .filter((product) => product.tags === "new-arrival")
              .map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>
        </>
      )}
    </div>
  );
}
