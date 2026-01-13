"use client"; // use Browser

// React & NextJS Libraies
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Import Icons
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

// Import Auth
import { useAuth } from "../../../../context/AuthContext";

// LoginForm Components
export default function LoginForm() {
  const [show, setShow] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // get login function from context
  const [data, setData] = useState({ email: "", password: "" });

  // handleChange
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  // Handle Submit Login Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, data, {
        withCredentials: true,
      });

      // Save user info & token in context
      login(res.data.user, res.data.token);

      toast.success("Login Successful!", { autoClose: 500 });

      // Redirect based on role
      if (res.data.user.role === "admin") {
        router.push("/admin/products"); // admin goes to admin page
      } else {
        router.push("/"); // normal user goes to home page
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", { autoClose: 500 });
    }
  };

  // UI/UX Design
  return (
    <div className="relative mt-40 py-8 mx-auto w-[90%] sm:max-w-96 h-full bg-white dark:bg-gradient-to-br dark:from-[#020617] dark:to-[#020617] dark:border dark:border-[#1e293b] dark:text-white rounded-2xl shadow-xl">
      {/* LOGIN FORM */}
      <div className={` flex items-center justify-center transition-all duration-700`}>
        <form onSubmit={handleSubmit} className="w-[90%] space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Login</h2>

          {/* Email */}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-[#020617] dark:border dark:border-[#1e293b text-gray-800 dark:text-gray-300 placeholder-[#64748b] px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-[#6a8ff7]"
            placeholder="Email"
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

            {/* Hidden & SHow Button */}
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

          {/* Login */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#6a8ff7] text-white py-3 rounded-lg hover:bg-[#5678e0] transition font-inter font-semibold text-xl"
          >
            Login
          </button>

          <p className="text-center text-base text-gray-600 dark:text-white">
            Already have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </p>

          {/* Icons */}
          <div className="flex justify-center gap-4 pt-2 ">
            <Social icon={<FaGoogle />} />
            <Social icon={<FaFacebookF />} />
            <Social icon={<FaGithub />} />
            <Social icon={<FaLinkedinIn />} />
          </div>
        </form>
      </div>
    </div>
  );
}

// Social Icons
const Social = ({ icon }) => (
  <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#6a8ff7] hover:text-white transition">
    {icon}
  </div>
);
