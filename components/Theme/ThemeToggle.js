"use client";

// Import Theme bu Using Dark and Light Mode
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

// ThemeToggle Component
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // mark component as mounted after client-side render
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent SSR mismatch

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#465470]" : "bg-slate-100 text-black";

  // UI/UX Design
  return (
    <Button
      variant="outline"
      className={`${bgColor} rounded-full border-none w-8 h-8 flex items-center justify-center`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </Button>
  );
}
