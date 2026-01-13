/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef } from "react";
import { getProducts, deleteProduct } from "../../../../services/product";
import { Pencil, Trash, EllipsisVertical } from "lucide-react";
import AddProduct from "../products/AddProduct";
import EditProduct from "../products/EditProduct";
import Header from "../../../../components/header/Header";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";

// Product Components
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [closeup, setCloseup] = useState(false);
  const [EditClose, setEditCLose] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const menuRef = useRef(null);

  const load = () => getProducts().then(setProducts);

  const { user } = useAuth();
  const router = useRouter();

  // UseEffect
  useEffect(() => {
    load();
  }, []);

  // Delete Product
  const remove = async (id) => {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
      load();
      toast.success("Product Data Successfully Delete", { autoClose: 500 });
    }
  };

  // Close Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenId(null); // close menu
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter Product
  const filteredProducts = products.filter((p) => {
    const categoryMatch = categoryFilter === "all" || p.category === categoryFilter;

    const priceMatch =
      priceFilter === "all" ||
      (priceFilter === "low" && p.price < 1000) ||
      (priceFilter === "mid" && p.price >= 1000 && p.price <= 5000) ||
      (priceFilter === "high" && p.price > 5000);

    return categoryMatch && priceMatch;
  });

  useEffect(() => {
    // if no user or user is not admin, redirect to login
    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, [user]);

  if (!user || user.role !== "admin") return <p>Redirecting...</p>;

  // UI/UX Design
  return (
    <>
      {/* Table */}
      <div className="mt-36 p-4">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl font-bold">All Products</h1>
          <button
            onClick={() => {
              setCloseup(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            + Add Product
          </button>
          {closeup && <AddProduct closeup={closeup} onSaved={load} onClose={() => setCloseup(false)} />}
        </div>

        <div className="flex justify-end gap-4 mb-4  w-full max-w-3xl mx-auto ">
          {/* Category Filter */}
          <select
            className="px-3 py-1 rounded-md shadow-2xs bg-white dark:bg-[#222222] dark:text-white transition-all"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="kids">Kids</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="accessories">Accessories</option>
          </select>

          {/* Price Filter */}
          <select
            className="px-3 py-1 rounded-md shadow-2xs bg-white dark:bg-[#222222] dark:text-white transition-all"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="low">Below 1000</option>
            <option value="mid">1000 – 5000</option>
            <option value="high">Above 5000</option>
          </select>
        </div>

        {/* Table  */}
        <div
          className={` ${
            products.length > 5 ? "overflow-y-auto" : "overflow-hidden"
          } w-full max-w-3xl border  mx-auto rounded-md bg-white dark:bg-gray-800 h-full max-h-96 pb-10 overflow-x-auto md:overflow-x-hidden `}
        >
          <table className={`${products.length === 0 ? "" : "border"} w-full align-middle`}>
            <thead className="bg-gray-100 dark:bg-gray-500">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                <>
                  {filteredProducts.map((p, index) => (
                    <tr
                      key={p._id}
                      className={` ${index === products.length - 1 ? "" : ""} text-center border-t`}
                    >
                      <td className="border-r py-2">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${p.images[0]}`}
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      </td>

                      <td className="border-r">
                        <Link href={`/shop/${p._id}`}> {p.name}</Link>
                      </td>
                      <td className="border-r">{p.category}</td>
                      <td className="border-r">{p.price}</td>
                      <td className="border-r">{p.inStock ? "Yes" : "No"}</td>
                      <td className="border-r">{p.rating}</td>
                      <td className="relative align-middle">
                        <EllipsisVertical
                          className="w-5 h-5  my-auto cursor-pointer mx-auto"
                          onClick={() => setOpenId(openId === p._id ? null : p._id)} // toggle dropdown
                        />

                        {openId === p._id && (
                          <div
                            ref={menuRef}
                            className="absolute top-2 right-1 rounded-md h-auto bg-white shadow-lg z-40 px-2"
                          >
                            <button
                              onClick={() => {
                                setSelectedProductId(p._id);
                                setEditCLose(true); // open modal
                              }}
                              className="border w-20 flex items-center p-1 rounded-md text-gray-100 hover:bg-yellow-600 bg-amber-500 font-semibold my-2 cursor-pointer"
                            >
                              <Pencil className="w-5 h-5 mr-1" /> Edit
                            </button>

                            <button
                              onClick={() => remove(p._id)}
                              className="border w-20 flex items-center p-1 rounded-md text-gray-100 hover:bg-red-700 bg-red-600 font-semibold my-2 cursor-pointer"
                            >
                              <Trash className="w-5 h-5 mr-1" /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="h-20">
                  <td>
                    <p className="text-xl font-inter absolute top-1/2 mt-20 lg:mt-16 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      No Products
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Edit Model */}
          {products.map((p) => {
            return (
              <div key={p._id}>
                {EditClose && selectedProductId === p._id && (
                  <EditProduct
                    id={selectedProductId}
                    closeup={EditClose}
                    onSaved={load}
                    onClose={() => setEditCLose(false)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
