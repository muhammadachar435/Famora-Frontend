// Import NextJS Libraies & Icons
import Link from "next/link";
import { FaXTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa6";

// Footer Component
export default function Footer() {
  //  UI/UX Design
  return (
    <footer className=" pt-6 mt-4">
      <div className="w-full mx-auto">
        {/* Card */}
        <div className=" bg-white bg-gradient-to-tr dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 shadow-sm px-10 pt-12 pb-8 ">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-black text-white dark:text-black dark:bg-white flex items-center justify-center font-bold text-2xl">
                  F
                </div>
                <span className="text-xl font-semibold font-inter">Famora</span>
              </div>

              <p className="text-sm text-gray-600  dark:text-gray-300 font-inter max-w-sm">
                Famora helps you discover premium fashion products with modern style, quality, and
                comfort all in one place.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-5 text-gray-700  dark:text-gray-300">
                <FaXTwitter className="cursor-pointer hover:text-blue-500 duration-500 transition-all" />
                <FaLinkedinIn className="cursor-pointer hover:text-blue-500 duration-500 transition-all" />
                <FaFacebookF className="cursor-pointer hover:text-blue-500 duration-500 transition-all" />
                <FaInstagram className="cursor-pointer hover:text-red-500 duration-500 transition-all" />
              </div>
            </div>

            {/* Shop*/}
            <div>
              <h4 className="font-semibold mb-4 dark:text-white font-inter">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 font-roboto">
                <li>
                  <Link href="/men" className="hover:text-blue-500 duration-500 transition-all">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/women" className="hover:text-blue-500 duration-500 transition-all">
                    women
                  </Link>
                </li>
                <li>
                  <Link href="/kids" className="hover:text-blue-500 duration-500 transition-all">
                    Kids
                  </Link>
                </li>
                <li>
                  <Link href="/accessories" className="hover:text-blue-500  duration-500 transition-all">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support*/}
            <div>
              <h4 className="font-semibold font-inter mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600  dark:text-gray-300 font-roboto">
                <li>
                  <Link href="/contact" className="hover:text-blue-500 duration-500 transition-all">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-500 duration-500 transition-all">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold font-inter mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600  dark:text-gray-300 font-roboto">
                <li>
                  <Link href="/about" className="hover:text-blue-500 duration-500 transition-all">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-500  duration-500 transition-all">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-500 duration-500 transition-all">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500  dark:text-gray-300">
            <p className=" duration-500 transition-all">
              © {new Date().getFullYear()} StylePeak. All rights reserved.
            </p>

            <div className="flex gap-6 mt-3 md:mt-0">
              <Link href="#" className="hover:text-blue-500  duration-500 transition-all">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-500 duration-500 transition-all">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-500 duration-500 transition-all">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
