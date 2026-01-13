"use client";

// Import React & NextJS Libraries
import { motion } from "framer-motion";
import { fadeIn } from "@/components/AnimationMotion/Variants";
import { AiFillStar } from "react-icons/ai"; // full star icon
import Image from "next/image";

// Import Files
import { customerReviews } from "../../../../data/CustomerReviews";

// CustomerReviews Components
export default function CustomerReviews() {
  // UI/UX Design
  return (
    <div className="mx-0">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className=" relative inline-block  mx-4"
      >
        {/* Heading */}
        <p className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold text-[#1b1a1a] dark:text-white">
          Testimonials
        </p>
      </motion.div>
      <div className="m-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
        {customerReviews.map((r) => (
          <div
            key={r.id}
            className="bg-white dark:bg-[#1E1E1E] shadow-lg rounded-xl p-6 w-72 sm:w-78 h-66 flex flex-col justify-between transform hover:scale-105 transition-transform duration-500"
          >
            {/* Quote Icon */}
            <div className="text-gray-300 dark:text-gray-500 text-3xl">“</div>

            {/* Review Text */}
            <p className="text-gray-700 dark:text-gray-200 text-sm mt-2 flex-grow line-clamp-5">
              {r.review}
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center mt-4">
              <Image
                src={r.photo}
                width={50}
                height={50}
                alt={r.name}
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <h4 className="text-gray-900 dark:text-white font-semibold">{r.name}</h4>
                <p className="text-gray-500 text-xs">@{r.name.split(" ").join("").toLowerCase()}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex mt-4">
              {Array.from({ length: r.rating }, (_, i) => (
                <AiFillStar key={i} className="text-yellow-500 dark:text-yellow-400" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
