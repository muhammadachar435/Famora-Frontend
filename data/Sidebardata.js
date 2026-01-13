// import React Icons
import { Home, ShoppingBag, Layers, Info, Phone, User, Users, Baby } from "lucide-react";

// Sidebar Data Component
export const sidebarData = [
  {
    id: 1,
    title: "Home",
    pathName: "/",
    icon: Home,
  },
  {
    id: 2,
    title: "Shop",
    pathName: "/shop",
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: "Categories",
    // pathName: "/categories",
    icon: Layers,
    dropdown: [
      { id: 1, title: "Men", path: "/men", icon: User },
      { id: 2, title: "Women", path: "/women", icon: Users },
      { id: 3, title: "Kids", path: "/kids", icon: Baby },
    ],
  },
  {
    id: 4,
    title: "About",
    pathName: "/about",
    icon: Info,
  },
  {
    id: 5,
    title: "Contact",
    pathName: "/contact",
    icon: Phone,
  },
];
