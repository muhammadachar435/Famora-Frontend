/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"; // file run it server

// Import React and Nextjs Libraries
import { useEffect, useRef, useState } from "react";

// Import Animation
import { motion } from "framer-motion";
import { fadeIn } from "@/components/AnimationMotion/Variants";

// Import Data Fetch
import { getProducts } from "../../services/product";
import StoreProductCard from "./StoreProductCard";

// MenProduct Component
export default function ProductPage({ title, category }) {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const menuRef = useRef();

  // Close Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // close menu
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch Product Data
  const load = () => getProducts().then(setProducts);
  useEffect(() => {
    load();
  }, []);

  //   handleSelect
  const handleSelect = (value) => {
    setPriceFilter(value); // set the filter
    setIsOpen(false); // close dropdown
  };

  //   Product Prices Filter
  const productFilter = products.filter((product) => {
    // Product Empty
    if (!product.category) return false;

    // Check Category
    if (category !== "all") {
      if (product.category.toLowerCase().trim() !== category.toLowerCase().trim()) {
        return false;
      }
    }

    // Product Search
    if (!product.name.toLowerCase().includes(searchText.toLowerCase())) return false;

    // discount price not available
    if (!product.discountPrice) return false; // BLOCK broken products

    // price=> "3,412" (replace) => "3144" => string convert Integer
    const price = parseFloat(String(product.discountPrice).replace(/[^0-9.]/g, ""));

    if (isNaN(price)) return false; //  safety

    if (priceFilter === "all") return true;
    if (priceFilter === "low") return price < 1000;
    if (priceFilter === "mid") return price >= 1000 && price <= 3000;
    if (priceFilter === "midHigh") return price > 3000 && price <= 5000;
    if (priceFilter === "high") return price > 5000;

    return true;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [category, searchText, priceFilter]);

  const totalPages = Math.ceil(productFilter.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const paginatedProducts = productFilter.slice(startIndex, endIndex);

  // UI/UX Design
  return (
    <div className="relative ">
      {/* Heading */}
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className=" relative inline-block mx-4 mt-4 sm:mt-8"
      >
        <p className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-[#373a3a] dark:text-white">
          {title}
        </p>
      </motion.div>

      {/* Search & Filter */}
      <div className=" flex items-center justify-between sm:mx-6 my-10 ">
        {/* Search Box */}
        <div className="flex items-center w-full min-w-44 max-w-66 mr-4 sm:mr-0 sm:max-w-96 bg-white dark:bg-gray-800 rounded-md shadow-md px-4 py-2  hover:shadow-lg transition ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="bg-transparent w-full outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        {/* Price */}
        <div className="relative inline-block text-left w-28 sm:w-40">
          {/* Dropdown button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group inline-flex justify-between items-center w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-black shadow hover:bg-gray-200"
          >
            Price
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-full rounded-xl bg-white shadow-xl ring-1 ring-black/5 z-50"
            >
              <button
                onClick={() => handleSelect("all")}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-black"
              >
                All Prices
              </button>
              <button
                onClick={() => handleSelect("low")}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-black"
              >
                Below 1000
              </button>
              <button
                onClick={() => handleSelect("mid")}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-black"
              >
                1000 - 3000
              </button>
              <button
                onClick={() => handleSelect("midHigh")}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-black"
              >
                3000 - 5000
              </button>
              <button
                onClick={() => handleSelect("high")}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-black"
              >
                Above 5000
              </button>
            </div>
          )}
        </div>{" "}
      </div>

      {/* Product Map */}
      {products.length > 0 ? (
        productFilter.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-10 mt-16">
            {paginatedProducts.map((product) => (
              <StoreProductCard key={product._id} product={product} category={category} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center my-20">
            <p className="text-2xl font-semibold text-gray-500">No Products Found</p>
            <p className="text-sm text-gray-400 mt-1">Try changing your price filter.</p>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center mt-20">
          <span className="ml-3 text-blue-600 font-medium text-lg">Loading products...</span>
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-20 space-x-3 sm:space-x-16">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-white dark:text-black   rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded font-inter ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:text-black dark:bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-white dark:text-black rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
