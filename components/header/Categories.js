"use client";

// Import React & NextJS Libraies
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Import Files
import CategoryModel from "../../UiModel/categoryModel";
import { categories, category } from "../../data/categories";

// Categories Component
export default function Categories({ isOpen, setIsOpen, ref }) {
  const [active, setActive] = useState(0);
  const activeKey = category[active].key;

  // UI/UX Design
  return (
    <CategoryModel isOpen={isOpen}>
      <div
        ref={ref}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center justify-between my-6 mx-3"
      >
        {/* Left menu */}
        <div className="border-r border-gray-400 dark:border-gray-500 w-40">
          {category.map((item) => (
            <p
              key={item.id}
              onMouseEnter={() => setActive(item.id)}
              className={`cursor-pointer py-2 text-lg font-semibold ${
                active === item.id ? "text-blue-500 border-b-2 border-blue-500 inline-block" : ""
              }`}
            >
              {item.title}
            </p>
          ))}
        </div>

        {/* Right grid */}
        <div className="grid grid-cols-2 gap-8 w-96 ">
          {categories
            .filter((c) => c.group === activeKey)
            .slice(0, 4)
            .map((item) => (
              <Link key={item.id} href={item.path} className="text-center hover:scale-105 transition">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 font-medium">{item.name}</p>
              </Link>
            ))}
        </div>
      </div>
    </CategoryModel>
  );
}
