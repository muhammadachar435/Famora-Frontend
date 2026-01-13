/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { usePathname } from "next/navigation";
import ProductPage from "../../../components/products/ProductPage";

export default function shopPage() {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className="mt-31">
      <ProductPage title="Shop" category="all" />
    </div>
  );
}
