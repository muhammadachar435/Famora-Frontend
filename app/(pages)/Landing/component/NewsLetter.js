/* eslint-disable react-hooks/immutability */
"use client";

import { useState } from "react";

// Import React Libraries & Icons
import { motion } from "framer-motion";
import { fadeIn } from "@/components/AnimationMotion/Variants";
import Confetti from "react-confetti";
import { FaEnvelopeOpenText, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

// NewsLetter Component
export default function NewsLetter() {
  const [emailSubscribe, setEmailsubscribe] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // HandleSubscribe
  const handleSubscribe = async () => {
    if (!emailSubscribe) return alert("Enter email");

    const res = await fetch("http://localhost:5000/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailSubscribe }),
    });

    if (res.status === 200) {
      setSubscribed(true);
      setShowConfetti(true);
      setEmailsubscribe("");
      setTimeout(() => setShowConfetti(false), 5000);
    } else if (res.status === 409) {
      toast.warn("Already Subscribe", { autoClose: 500 });
    } else {
      toast.error("Something Issue Try Again", { autoClose: 500 });
    }
  };

  // UI/UX Design
  return (
    <section className="px-6 py-10 text-center relative overflow-hidden">
      {showConfetti && <Confetti numberOfPieces={250} recycle={false} />}

      {!subscribed ? (
        <div className="flex flex-col items-center mt-8">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-3 font-inter text-gray-800 dark:text-white">
              Level Up Your Shopping Experience!
            </h3>
            <p className="text-center text-gray-600 mb-10 font-sans small:text-sm tablet:text-base dark:text-gray-300">
              Stay updated with new arrivals, flash sales, and exclusive Famora deals delivered to your
              inbox.
            </p>
          </motion.div>

          {/* Input & Button with icon and animation */}
          <div className="flex justify-center items-center gap-2 animate-fadeIn delay-300">
            <input
              type="email"
              placeholder="Enter your email"
              value={emailSubscribe}
              onChange={(e) => setEmailsubscribe(e.target.value)}
              className="border border-gray-300 rounded-l-md px-4 py-3 w-48 sm:w-72 lg:w-80 outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition duration-300 ease-in-out hover:scale-105"
            />
            <button
              onClick={handleSubscribe}
              className="bg-purple-600 text-white px-2 sm:px-6 lg:px-8 py-3 rounded-r-md hover:bg-purple-700 shadow-lg transition-transform transform hover:scale-110 flex items-center cursor-pointer gap-2"
            >
              <FaPaperPlane /> Subscribe
            </button>
          </div>

          {/* Small animated text */}
          <p className="text-gray-900 text-sm mt-2 animate-pulse dark:text-white">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-6 animate-fadeIn">
          <FaEnvelopeOpenText className="text-6xl text-green-600 animate-bounce" />
          <p className="text-green-700 text-2xl font-bold dark:text-white">Thank you for subscribing!</p>
          <p className="text-gray-600 dark:text-white">Check your inbox for confirmation.</p>
        </div>
      )}
    </section>
  );
}
