"use client";

import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { customerReviews } from "../../../data/CustomerReviews"; // make sure you have this data file
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../../components/AnimationMotion/Variants";

// About Page
export default function AboutPage() {
  // UI/UX Design
  return (
    <>
      <main className="mt-20">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
          <Image
            src="/aboutHeroImage.jpg" // replace with your hero image
            alt="Famora Hero"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0  bg-opacity-40"></div>
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
              Innovating Tech, <span className="text-[#094077]">Inspiring Pakistan</span>
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-3xl mb-6 drop-shadow-md">
              At Famora, we aim to create high-quality, stylish products that empower people every day.
            </p>
          </motion.div>
        </section>

        {/* Our Journey Section */}
        <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-12 items-center font-sans">
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              When & Why We <span className="text-[#094077]">Started?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4 ">
              Founded in 2025, Famora began as a bootstrap homegrown business with a clear purpose: to
              deliver high-quality products while keeping international standards.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Our journey was fueled by passion and innovation, ensuring every product and design is
              unmatched in quality and style.
            </p>
          </motion.div>
          <div className="relative w-full h-80 md:h-96">
            <Image
              src="/famoraStatred.jpg" // replace with your journey image
              alt="Our Journey"
              fill
              priority
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* Our Objectives */}
        <section className="max-w-6xl mx-auto py-14 px-4">
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className="text-4xl font-bold mb-8 text-gray-600 dark:text-white text-center"
          >
            Quality Meets <span className="text-[#0f5091]">Purpose</span>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Empower Global Tech Industry",
                desc: "By producing world-class products, we aim to empower Pakistan's global dominance.",
              },
              {
                number: "02",
                title: "Ensure Customer Satisfaction",
                desc: "We prioritize our customers, offering unmatched quality and service.",
              },
              {
                number: "03",
                title: "Drive Purpose-Driven Business",
                desc: "We focus on innovation to grow our business with impact.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {item.number}
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#0f5091] font-sans">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Vision */}
        <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-12 items-center place-items-center bg-white dark:bg-[#1E1E1E] shadow-sm rounded-xl">
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className="w-[96%]"
          >
            <h2 className="text-4xl font-bold  text-[#0f5091] mb-4 sm:mb-8 ">
              Empower The Globe with Famora Products
            </h2>
            <p className="text-gray-600 dark:text-gray-200 font-sans text-lg mb-4">
              Our vision is to make Pakistan a global leader in quality products and innovation.
            </p>
            <p className="text-gray-600 dark:text-gray-200 font-sans text-lg">
              We aim to expand our reach while maintaining exceptional quality and local pride.
            </p>
          </motion.div>
          <div className="relative w-full h-80 md:h-96">
            <Image
              src="/pexels-kaip-996329.jpg"
              alt="Our Vision"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className="text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center"
          >
            What Makes <span className="text-[#0f5091]">Famora Different?</span>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "End-to-End Ownership",
                desc: "Complete control from design to delivery ensures high standards.",
              },
              {
                number: "02",
                title: "Stringent Quality Assurance",
                desc: "Material inspection, assembly testing, and lab testing at every step.",
              },
              {
                number: "03",
                title: "Purpose-Driven Innovation",
                desc: "Focused on building products with impact and value.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl font-sans shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {item.number}
                </div>
                <h3 className="font-semibold text-xl mb-2 text-[#0f5091]">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="max-w-7xl mx-auto py-6 px-4">
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className="text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center"
          >
            Customer <span className="text-[#0f5091]">Reviews</span>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
            {customerReviews.map((r) => (
              <div
                key={r.id}
                className="bg-white dark:bg-[#1E1E1E] shadow-lg rounded-xl p-6 w-72 h-62 flex flex-col justify-between transform hover:scale-105 transition-transform duration-500"
              >
                <div className="text-gray-300 dark:text-gray-500 text-3xl">“</div>
                <p className="text-gray-700 dark:text-gray-200 text-sm mt-2 flex-grow line-clamp-5">
                  {r.review}
                </p>
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
                <div className="flex mt-4">
                  {Array.from({ length: r.rating }, (_, i) => (
                    <AiFillStar key={i} className="text-yellow-500 dark:text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative w-[94%] max-w-5xl mx-auto overflow-hidden py-14 mt-10 rounded-3xl bg-gradient-to-br from-[#0f0797] via-[#091863] to-[#050141]">
          {/* Glow Effects */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl"></div>

          <div className="relative text-center text-white px-6">
            <h3 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-lg">
              Join Us On Our Journey
            </h3>

            <p className="mb-8 text-lg md:text-xl text-white/90">
              Discover our latest collection and wear confidence every day.
            </p>

            <Link
              href="/shop"
              className="bg-white text-purple-700 font-semibold py-3 px-10 rounded-full shadow-xl
    hover:scale-110 hover:shadow-2xl transition-all duration-300 "
            >
              Shop Now
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
