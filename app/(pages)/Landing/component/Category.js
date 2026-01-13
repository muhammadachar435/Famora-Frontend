"use client";

// Import React & NextJs
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Import Files
import { fadeIn } from "../../../../components/AnimationMotion/Variants";
import { categoryTitle } from "../../../../data/categories";

// Category Component
export default function Category() {
  // UI/UX Design
  return (
    <div className=" mt-12">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className=" relative inline-block mx-4 "
      >
        {/* Heading */}
        <p className="text-[28px] sm:text-3xl md:text-4xl font-inter font-bold text-[#1b1a1a] dark:text-white">
          Explore Our Collection
        </p>
      </motion.div>

      {/* Cart */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 overflow-hidden gap-4 flex-wrap justify-center mt-4">
        {categoryTitle.map((category) => (
          <div
            key={category.id}
            className=" relative flex flex-col  items-center cursor-pointer p-4 hover:scale-101 transition-transform"
          >
            <Link href={category.path}>
              <div className="w-32 h-32 medium:w-48 medium:h-48 md:w-34 md:h-34 rounded-full overflow-hidden">
                <Image
                  src={category.image}
                  width={100}
                  height={100}
                  alt={category.name}
                  className="w-full h-full object-cover "
                />
              </div>
              <p className="mt-2 font-semibold text-lg medium:text-2xl font-roboto text-gray-900 dark:text-white text-center mx-auto">
                <span className="inline-block relative group ">
                  {" "}
                  {category.name}
                  <span className="absolute top-8 left-0 w-0 h-0.5 bg-[#685cfe] dark:bg-gray-300 transition-all duration-300 group-hover:w-full rounded"></span>
                </span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
