"use client"; // use Browser

// Import React & NextJS Libraies & Icons
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// LoginForm Components
export default function LoginForm() {
  const [show, setShow] = useState("");
  const [data, setData] = useState({ name: "", email: "", phone: "", password: "" });
  const router = useRouter();

  // handleChange
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password.length < 7) {
      toast.warn("Password Should be 8 Characters", { autoClose: 500 });
      return;
    }
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, data);
      toast.success(res.data.message);
      router.push("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", { autoClose: 500 });
    }
  };

  // UI/UX Design
  return (
    <div className="relative mt-40 py-8 mx-auto w-[90%] sm:max-w-2xl h-full bg-white dark:bg-gradient-to-br dark:from-[#020617] dark:to-[#020617] dark:border dark:border-[#1e293b] dark:text-white rounded-2xl shadow-xl">
      {/* Register Form*/}
      <div className={` flex items-center justify-center transition-all duration-700`}>
        <form onSubmit={handleSubmit} className="w-[90%] space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Register</h2>

          <div className="grid sm:grid-cols-2 gap-6 py-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-[#020617] dark:border dark:border-[#1e293b text-gray-800 dark:text-gray-300 placeholder-[#64748b] px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#6a8ff7]"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-[#020617] dark:border dark:border-[#1e293b text-gray-800 dark:text-gray-300 placeholder-[#64748b] px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#6a8ff7]"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full bg-gray-100 dark:bg-[#020617] dark:border dark:border-[#1e293b text-gray-800 dark:text-gray-300 placeholder-[#64748b] px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#6a8ff7]"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={`${show ? "text" : "password"}`}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-[#020617] dark:border dark:border-[#1e293b text-gray-800 dark:text-gray-300 placeholder-[#64748b] px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#6a8ff7]"
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => {
                  setShow(!show);
                }}
                className="absolute right-0 top-1/2 -translate-1/2 "
              >
                {show ? <Eye className="text-gray-800" /> : <EyeOff className="text-gray-500" />}
              </button>
            </div>
          </div>

          {/* Register */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#6a8ff7] text-white py-3 rounded-lg hover:bg-[#5678e0] transition font-inter font-semibold text-xl"
          >
            Register
          </button>

          <p className="text-center text-base text-gray-600 dark:text-white">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
