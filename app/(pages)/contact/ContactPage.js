"use client";

import { motion } from "framer-motion";
import { fadeIn } from "../../../components/AnimationMotion/Variants";

// Import Icons
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";

// Import Header
import Header from "../../../components/header/Header";

// Contact Component
export default function ContactPage() {
  // UI/UX Design
  return (
    <div className="mt-40">
      <div className="py-20 mb-20 w-[96%] mx-auto rounded-md bg-gradient-to-br from-[#020024] via-[#040b30] to-[#020024] flex items-center justify-center px-5">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
            className="text-white"
          >
            <p className="text-orange-500 uppercase tracking-wider mb-2">Contact Us</p>
            <h2 className="text-4xl font-bold mb-4">Get In Touch With Us</h2>
            <p className="text-gray-300 mb-8">
              Feel free to contact us anytime. We reply within 24 hours.
            </p>

            {/* Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-3 rounded">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-gray-300 text-sm">Hyderabad, Sindh, Pakistan</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-3 rounded">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-300 text-sm">famora32@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-3 rounded">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-300 text-sm">+92 300 1234567</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-10">
              <h4 className="mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <SocialIcon>
                  <FaFacebookF />
                </SocialIcon>
                <SocialIcon>
                  <FaTwitter />
                </SocialIcon>
                <SocialIcon>
                  <FaYoutube />
                </SocialIcon>
                <SocialIcon>
                  <FaPinterestP />
                </SocialIcon>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white  dark:text-black rounded-xl p-8">
            <form className="space-y-4">
              <Input
                label="Name"
                className="border-gray-200 focus:border focus:border-blue-500 outline-none 0 rounded-md"
              />
              <Input
                label="Email"
                className="border-gray-200 focus:border focus:border-blue-500 outline-none 0 rounded-md"
              />
              <Input
                label="Subject"
                className="border-gray-200 focus:border focus:border-blue-500 outline-none 0 rounded-md"
              />
              <div>
                <label className="text-sm font-medium">Your Message</label>
                <textarea className="w-full border border-gray-200 focus:border focus:border-blue-500 outline-none rounded p-3 mt-1 h-32" />
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Input
function Input({ label }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input className="w-full border border-gray-200 focus:border focus:border-blue-500 outline-none rounded p-3 mt-1" />
    </div>
  );
}

// Component Social Icons
function SocialIcon({ children }) {
  return (
    <div className="bg-orange-500 hover:bg-orange-600 cursor-pointer p-3 rounded text-white">
      {children}
    </div>
  );
}
