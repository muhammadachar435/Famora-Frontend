"use client";

// Import React & NextJS Libraries
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Import Icons
import { CircleUserRound, LogIn, ChevronDown, LogOut } from "lucide-react";
import { IoMdMenu } from "react-icons/io";
import { MdMenuOpen, MdOutlineShoppingBag } from "react-icons/md";

// Import Theme [DarkMode]
import { ThemeToggle } from "../Theme/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "@/context/CartContext";
// Import Data
import Sidebar from "./Sidebar";
import { sidebarData } from "../../data/Sidebardata";
import Categories from "./Categories";
import AddToCart from "../AddToCart";

// Header Component
export default function Header() {
  // UI State
  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const [notifyDialog, setNotifyDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // useRef
  const userRef = useRef();
  const categoriesRef = useRef();

  // router for path Use
  const router = useRouter();
  const pathName = usePathname();

  // Check For User Login/Logout
  const { user, logout } = useAuth();

  // To Store Cart Data in State
  const { state } = useCart();

  const productCount = state.products.length; // number of products in cart

  // useEffect() use by close by dialog box
  useEffect(() => {
    function handleUser(e) {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setOpen(false);
        setNotifyDialog(false);
      }

      // Close Categories dropdown if click is outside
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleUser);
    return () => {
      document.removeEventListener("mousedown", handleUser);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // User Profile
  function handleUser() {
    setNotifyDialog(false);
    setOpen(true);
  }

  // HandleLogout
  const handleLogout = async () => {
    await logout(); // clear context + cookie
    router.push("/login"); // redirect to login page
  };

  // UI Design
  return (
    <>
      {/* 🔹 Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-yellow-400 dark:border-b dark:border-gray-600 ">
        <div className="w-full bg-gradient-to-r from-[#171844] to-[#3b3bbf] py-1 ">
          <p className="text-white text-xl sm:text-[22px] font-extrabold uppercase font-roboto text-center">
            Winter <span className="text-[#fd8134]">Special Offer</span>
          </p>

          <p className="text-white text-base uppercase font-roboto text-center">
            Discount Up To 50% OFF
          </p>
        </div>

        <div className="w-full flex justify-between items-center z-50 bg-white dark:bg-black py-2 shadow-sm p-2">
          <div className="flex space-x-2 items-center">
            {/* Sidebar Toggle Icon */}
            {
              <span className=" lg:hidden">
                {sidebar ? (
                  <MdMenuOpen
                    className="w-7 h-7 cursor-pointer text-gray-800 text-gray-800 dark:text-white"
                    onClick={() => setSidebar(!sidebar)}
                  />
                ) : (
                  <IoMdMenu
                    className="w-7 h-7 cursor-pointer text-gray-800 text-gray-800 dark:text-white"
                    onClick={() => setSidebar(!sidebar)}
                  />
                )}
              </span>
            }
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold uppercase font-inter flex items-center gap-1 scale-105 transition-transform duration-300 pl-2"
            >
              <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="logo"
                className="w-28 hidden lg:flex outline-none animate-spin-slow"
              />
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {sidebarData.map((data) => {
              return (
                <ul key={data.id}>
                  {pathName === data.pathName ? (
                    <li>
                      <Link
                        href={`${data.pathName ? data.pathName : ""}`}
                        className={`px-2 py-0.5 font-inter text-lg transition-all duration-300
          ${
            pathName === data.pathName
              ? ` ${isOpen ? "" : "border-b-2 border-[#685cfe]"} text-black dark:text-white`
              : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          } cursor-pointer `}
                      >
                        {data.pathName ? (
                          <span>{data.title}</span>
                        ) : (
                          <button
                            onMouseEnter={() => setIsOpen(true)}
                            className="cursor-pointer flex items-center justify-between outline-none"
                          >
                            {data.title} <ChevronDown className="ml-1" />
                          </button>
                        )}
                      </Link>
                    </li>
                  ) : (
                    <li className="px-2 font-medium font-inter my-2 text-lg">
                      <Link href={`${data.pathName ? data.pathName : ""}`} className="relative group">
                        {data.pathName ? (
                          <button onMouseEnter={() => setIsOpen(false)} className="cursor-pointer">
                            {data.title}
                          </button>
                        ) : (
                          <button
                            onMouseEnter={() => setIsOpen(true)}
                            className={`cursor-pointer flex items-center justify-between outline-none`}
                          >
                            {data.title} <ChevronDown className="ml-1" />
                          </button>
                        )}
                        {data.pathName ? (
                          <span className="absolute top-5.5 left-0 w-0 h-0.5 bg-[#685cfe] transition-all duration-300 group-hover:w-full rounded-full"></span>
                        ) : (
                          <span className="absolute top-6.5 left-0 w-0 h-0.5 bg-[#685cfe] transition-all duration-300 group-hover:w-full rounded-full"></span>
                        )}
                      </Link>
                    </li>
                  )}
                </ul>
              );
            })}
          </div>

          {/* 3rd Icon Like SignIN/SignOut , Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme  */}
            <ThemeToggle />

            {/* Shopping Cart */}
            <button
              onClick={() => {
                setIsCartOpen(!isCartOpen);
              }}
              className="relative hover:scale-101 cursor-pointer"
            >
              <MdOutlineShoppingBag className="w-7 h-7 " />
              {productCount > 0 && (
                <div className="absolute -top-2 -right-1 w-4.5 h-4.5 rounded-full bg-blue-400 dark:bg-blue-700 flex items-center justify-center text-xs text-white font-inter font-semibold">
                  {productCount}
                </div>
              )}
            </button>

            {/* User Account*/}
            <div className="relative flex items-center">
              {/* Dialog Box */}
              <div
                onClick={handleUser}
                className=" w-8 h-8 rounded-full bg-gradient-to-r from-[#6b74df] to-[#4a50c4] flex justify-center items-center shadow-md cursor-pointer duration-200 transition-all hover:scale-101"
              >
                <CircleUserRound className="text-white " />
                {/* Login Profile */}
                {open && (
                  <div
                    ref={userRef}
                    className=" absolute top-28 -translate-x-[40%] w-44  -translate-y-1/2 bg-white text-gray-500 dark:bg-[#222222] dark:text-white shadow-lg border border-gray-200 rounded-md py-1 dark:border-gray-700"
                  >
                    {/* <div className="h-[1px] bg-slate-200 my-1"></div> */}
                    <div className="py-2 px-4  list-none text-sm font-inter font-300 space-y-4">
                      {user ? (
                        <div className="w-full">
                          <p className="text-base font-inter font-semibold my-2 max-w-50 truncate">
                            {user.email}
                          </p>

                          <button
                            onClick={handleLogout}
                            className="text-white rounded-md font-inter text-base bg-red-500 cursor-pointer flex items-center p-1 hover:text-white hover:scale-101 my-4"
                          >
                            <LogOut className="mr-3 ml-1" />
                            Sign Out
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-base text-gray-500 dark:text-white">
                            Please sign in to continue.
                          </p>
                          <button
                            onClick={handleLogout}
                            className="text-white rounded-md font-inter text-base bg-blue-500 cursor-pointer flex items-center py-1 px-2 hover:text-white hover:scale-101 my-2"
                          >
                            <LogIn className="mr-3 " />
                            Sign In
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* End Dialog Box */}
            </div>
          </div>
        </div>
      </nav>
      {/* End Navbar */}

      {/* Catgeoies */}
      {isOpen && <Categories isOpen={isOpen} setIsOpen={setIsOpen} ref={categoriesRef} />}

      {/* 🔹 Sidebar Menu */}
      {sidebar && (
        <nav
        className={`fixed top-0 left-0 shadow-2xl h-screen w-75 p-4 bg-white dark:bg-[#222222] rounded-md z-40 text-black transition-all duration-300 ease-in-out font-semibold text-lg }`}
        >
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </nav>
      )}

      {isCartOpen && <AddToCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
    </>
  );
}
