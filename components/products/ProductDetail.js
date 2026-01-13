/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

// Import  React Icons and Nextjs Router
import { useState } from "react";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Import FIle
import { useCart } from "../../context/CartContext";

// ProductDetail Component
export default function ProductDetail({ data }) {
  const [active, setActive] = useState(0);
  const [close, setClose] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedcolors, setselectedcolors] = useState("");
  const { addProduct } = useCart();
  const router = useRouter();

  // Inside your component
  const handleAddToCart = () => {
    addProduct(data);
  };

  // UI/Ux Design
  return (
    <div className="mb-4 w-[96%] mx-auto p-2 rounded-md">
      <button
        onClick={() => router.back()}
        className="hidden md:flex items-center font-inter text-lg py-2 px-4 
             cursor-pointer rounded-md text-blue-600 dark:text-white bg-gray-50 dark:bg-black/20 transition-all duration-300
             transform hover:-translate-y-1 active:scale-95 my-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2 text-blue-600 dark:text-white" />
        Back
      </button>

      <div className="lg:flex justify-between lg:space-x-6 xl:space-x-20 lg:pt-10">
        <div className="sm:flex justify-evenly">
          <div className="hidden sm:flex flex-col  w-44 h-1/2 gap-y-6 lg:gap-y-10 ">
            {data.images.map((img, index) => (
              <img
                key={index}
                onClick={() => setActive(index)}
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img}`}
                className={`w-20 h-auto rounded-md cursor-pointer border mx-auto my-auto transition-all duration-200
${active === index ? "scale-105 shadow-md" : "opacity-70 hover:opacity-100 hover:scale-105"}
`}
              />
            ))}
          </div>

          <div>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.images[active]}`}
              alt="img"
              className="w-76 sm:w-104 rounded-xl shadow-md mx-auto"
            />
          </div>

          <div className=" sm:hidden flex items-center justify-center my-8">
            {data.images.map((img, index) => (
              <img
                key={index}
                onClick={() => setActive(index)}
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img}`}
                className={`w-20 h-auto rounded-md cursor-pointer border mx-auto my-auto transition-all duration-200
${active === index ? "scale-105 shadow-md" : "opacity-70 hover:opacity-100 hover:scale-105"}
`}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:max-w-xl p-4 lg:p-0 mx-auto mt-8 lg:mt-0 ">
          <p className="border-b border-gray-300 pb-4 font-inter font-semibold text-lg sm:text-2xl lg:text-3xl w-[94%]">
            {data.name}
          </p>

          <div className="font-inter py-4 w-[94%]">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">Product Description</p>
              <button
                onClick={() => setClose(!close)}
                className="flex items-center justify-center transition-all duration-500 "
              >
                <span
                  className={`transition-transform duration-500 text-xl font-bold
    ${close ? "rotate-180" : "rotate-0"}`}
                >
                  {close ? <Minus /> : <Plus />}
                </span>
              </button>
            </div>
            {/* Description Section */}
            {close && (
              <div className="font-inter space-y-3 border-b border-gray-300">
                {/*  Additional fields (only if they exist AND not in description) */}
                <p className="text-[#424444] dark:text-white">{data.description}</p>
                <p className=" text-[#424444] dark:text-white font-sans">
                  {" "}
                  <span className="font-semibold text-black dark:text-white">Material:</span>{" "}
                  {data.specifications.material}
                </p>
                <p className=" text-[#424444] dark:text-white font-sans">
                  <span className="font-semibold text-black  dark:text-white">Fit:</span>{" "}
                  {data.specifications.fit}
                </p>
                <p className=" text-[#424444] dark:text-white font-sans">
                  <span className="font-semibold text-black  dark:text-white">Clothes Wash:</span>{" "}
                  {data.specifications.care}
                </p>
                <p className=" text-[#424444] dark:text-white font-sans">
                  <span className="font-semibold text-black  dark:text-white">Colors:</span>{" "}
                  {data.colors.join(", ")}
                </p>

                {/* colors */}

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold text-black font-sans  dark:text-white">Colors:</span>
                  {data.colors.map((colors, i) => (
                    <button
                      key={i}
                      onClick={() => setselectedcolors(colors)}
                      className={`px-4 py-2 rounded-md border text-sm font-semibold transition-all duration-300
        ${
          selectedcolors === colors
            ? "bg-green-500 text-white "
            : "border-gray-300 hover:bg-black dark:hover:bg-gray-400 hover:text-white"
        }`}
                    >
                      {colors}
                    </button>
                  ))}
                </div>
                {/* end colors ui */}

                <div className="flex items-center gap-3 flex-wrap pb-4">
                  <span className="font-semibold text-black font-sans  dark:text-white">Sizes:</span>
                  {data.sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border text-sm font-semibold transition-all duration-300
        ${
          selectedSize === size
            ? "bg-blue-500 text-white "
            : "border-gray-300 hover:bg-black dark:hover:bg-gray-400 hover:text-white"
        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {/* end sizes */}
              </div>
            )}
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 cursor-pointer text-xs sm:text-lg hover:bg-blue-700 font-inter mt-6 text-white font-semibold py-2 px-5 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 w-full max-w-xl justify-center mx-auto"
            >
              <span>Add to Cart | </span>
              <span className="bg-yellow-400 text-black px-2 py-0.5 rounded font-bold">
                Rs.{data.discountPrice}
              </span>
              <span className="line-through text-gray-300">Rs.{data.price}</span>
            </button>
            <p className="text-gray-700 dark:text-gray-100 text-sm md:text-base font-sans text-center my-4">
              Pay in 3 Installments of{" "}
              <span className="text-[#501dce] font-semibold">
                Rs. {Math.floor(data.discountPrice / 3)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
