/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from "react";
import { createProduct } from "../../../../services/product";
import Model from "../../../../UiModel/Model";
import { toast } from "react-toastify";
import {
  sizeOptions,
  fitOptions,
  colorOptions,
  materialOptions,
  careOptions,
} from "../../../../data/ProductData";

// AddProduct Component
export default function AddProduct({ closeup, onClose, onSaved }) {
  const fileRef = useRef();

  // To Store Data in State
  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    rating: "",
    flashSaleStart: "", // new: flash sale start time
    flashDurationMinutes: 120, // default 2 hours    offerImage: "",
    inStock: true,
    images: null,
    category: "",
    tags: "",
    sizes: [], // multiple selection
    colors: [], // multiple selection
    specifications: {
      material: "Cotton",
      fit: "Regular",
      care: "Machine Wash",
    },
  });

  // const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "42"];
  // const fitOptions = ["Regular", "Slim", "Loose"];
  // const colorOptions = [
  //   "Black",
  //   "White",
  //   "Red",
  //   "Blue",
  //   "Green",
  //   "Yellow",
  //   "Orange",
  //   "Brown",
  //   "Beige",
  //   "Gray",
  //   "Pink",
  //   "Purple",
  //   "Maroon",
  //   "Navy",
  //   "Olive",
  // ];

  // const materialOptions = [
  //   "Cotton",
  //   "Polyester",
  //   "Wool",
  //   "Silk",
  //   "Eau de Parfum",
  //   "Eau de Toilette",
  //   "Eau de Cologne",
  //   "Leather",
  //   "Faux Leather",
  //   "Rubber",
  // ];

  // const careOptions = [
  //   "Machine Wash",
  //   "Hand Wash",
  //   "Dry Clean",
  //   "Floral",
  //   "Citrus",
  //   "Woody",
  //   "Oriental",
  //   "Fresh",
  //   "Clean with cloth",
  //   "Avoid harsh chemicals",
  //   "Wipe with cloth",
  //   "Avoid water",
  // ];

  // Handle Submit Form
  const submit = async (e) => {
    e.preventDefault(); // Should be FIRST

    // Validate required fields
    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate images
    if (!form.images || form.images.length !== 3) {
      toast.warn("Please select exactly 3 images");
      return;
    }

    // Create FormData
    const data = new FormData();

    // Append basic fields
    data.append("name", form.name);
    data.append("description", form.description || "");
    data.append("price", form.price);
    data.append("discountPrice", form.discountPrice || "");
    data.append("offerImage", form.offerImage || "");
    data.append("rating", form.rating || "0");
    data.append("inStock", form.inStock);
    data.append("category", form.category);
    data.append("tags", form.tags || "");

    // Only add flash fields when needed
    if (form.tags === "flash-sale" || form.tags === "new-arrival") {
      if (!form.flashSaleStart) {
        toast.error("Please select sale start time");
        return;
      }
      data.append("flashSaleStart", new Date(form.flashSaleStart).toISOString());
      data.append("flashDurationMinutes", form.flashDurationMinutes);
    }

    // Append images
    for (let i = 0; i < form.images.length; i++) {
      data.append("images", form.images[i]);
    }

    // Append arrays as JSON strings
    data.append("sizes", JSON.stringify(form.sizes || []));
    data.append("colors", JSON.stringify(form.colors || []));
    data.append("specifications", JSON.stringify(form.specifications || {}));

    try {
      // Call your API
      await createProduct(data);

      // Reset file input
      if (fileRef.current) {
        fileRef.current.value = "";
      }

      // Show success message
      toast.success("Product added successfully!");

      // Callbacks
      onSaved();
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  // Handle multi-select for sizes and colors
  const handleMultiSelect = (field, value) => {
    setForm((prev) => {
      const current = prev[field];
      if (current.includes(value)) {
        // remove if already selected
        return { ...prev, [field]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  // UI/UX Design
  return (
    <Model isOpen={closeup} onClose={onClose}>
      <div>
        {/* Heading */}
        <h1 className="text-2xl mb-5 font-roboto font-bold text-center sm:text-left">Add Product</h1>

        {/* Form  */}
        <form onSubmit={submit}>
          <div className="grid place-items-center sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Name */}
            <input
              placeholder="Name"
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Price */}
            <input
              placeholder="Original Price"
              type="number"
              value={form.price ?? ""}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Discount */}
            <input
              placeholder="Discount Price"
              type="number"
              value={form.discountPrice ?? ""}
              onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
              required
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Rating */}
            <input
              placeholder="Rating"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={form.rating ?? ""}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              required
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Product Offer */}
            <input
              placeholder="Product Offer"
              type="text"
              value={form.offerImage ?? ""}
              onChange={(e) => setForm({ ...form, offerImage: e.target.value })}
              required
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Stock */}
            <select
              value={form.inStock}
              onChange={(e) => setForm({ ...form, inStock: e.target.value === "true" })}
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="true" className="dark:text-black">
                In Stock
              </option>
              <option value="false" className="dark:text-black">
                Out of Stock
              </option>
            </select>

            {/* Category */}
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="" disabled className="dark:text-black">
                Select Category
              </option>
              <option value="men" className="dark:text-black">
                Men
              </option>
              <option value="women" className="dark:text-black">
                Women
              </option>
              <option value="kids" className="dark:text-black">
                Kids
              </option>
              <option value="accessories" className="dark:text-black">
                Accessories
              </option>
            </select>

            {/* Category */}
            <select
              value={form.tags}
              onChange={(e) =>
                setForm({ ...form, tags: e.target.value, flashSaleStart: "", flashDurationMinutes: 120 })
              }
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="" disabled className="dark:text-black">
                Select Tags
              </option>
              <option value="best-seller" className="dark:text-black">
                best-seller
              </option>
              <option value="flash-sale" className="dark:text-black">
                flash-sale
              </option>
              <option value="new-arrival" className="dark:text-black">
                new-arrival
              </option>
            </select>

            {/* File */}
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files.length !== 3) {
                  toast.warn("Please select exactly 3 images");
                  e.target.value = ""; // Clear the input
                  setForm({ ...form, images: null });
                  return;
                }
                setForm({ ...form, images: e.target.files });
              }}
              className="w-62"
            />

            {/* Flash Sales */}
            {form.tags === "flash-sale" && (
              <div className="mt-4 grid grid-cols-1 gap-4">
                {/* Flash Sale Start */}
                <div>
                  <label className="font-semibold">Flash Sale Start Time:</label>
                  <input
                    type="datetime-local"
                    value={form.flashSaleStart || ""}
                    onChange={(e) => setForm({ ...form, flashSaleStart: e.target.value })}
                    className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Flash Sale Duration */}
                <div>
                  <label className="font-semibold">Flash Sale Duration (minutes):</label>
                  <input
                    type="number"
                    value={form.flashDurationMinutes || 120}
                    onChange={(e) => setForm({ ...form, flashDurationMinutes: Number(e.target.value) })}
                    min={1}
                    className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}

            {/* New Arrival Sales */}
            {form.tags === "new-arrival" && (
              <div className="mt-4 grid grid-cols-1 gap-4">
                {/* New Arrival Start */}
                <div>
                  <label className="font-semibold">New Arrival Start Time:</label>
                  <input
                    type="datetime-local"
                    value={form.flashSaleStart || ""}
                    onChange={(e) => setForm({ ...form, flashSaleStart: e.target.value })}
                    className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* New Sale Duration */}
                <div>
                  <label className="font-semibold">New Sale Duration (minutes):</label>
                  <input
                    type="number"
                    value={form.flashDurationMinutes || 120}
                    onChange={(e) => setForm({ ...form, flashDurationMinutes: Number(e.target.value) })}
                    min={1}
                    className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sizes Multi-Select */}
          <div className="mt-4">
            <p className="font-semibold my-1">Select Sizes:</p>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleMultiSelect("sizes", size)}
                  className={`px-3 py-1 rounded border ${
                    form.sizes.includes(size) ? "bg-blue-500 text-white" : "bg-white text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors Multi-Select */}
          <div className="mt-4">
            <p className="font-semibold my-1">Select Colors:</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleMultiSelect("colors", color)}
                  className={`px-3 py-1 rounded border ${
                    form.colors.includes(color) ? "bg-blue-500 text-white" : "bg-white text-black"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <select
              value={form.specifications.material}
              onChange={(e) =>
                setForm({
                  ...form,
                  specifications: { ...form.specifications, material: e.target.value },
                })
              }
              className="border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {materialOptions.map((m) => (
                <option key={m} value={m} className="dark:text-black">
                  {m}
                </option>
              ))}
            </select>

            <select
              value={form.specifications.fit}
              onChange={(e) =>
                setForm({
                  ...form,
                  specifications: { ...form.specifications, fit: e.target.value },
                })
              }
              className="border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {fitOptions.map((f) => (
                <option key={f} value={f} className="dark:text-black">
                  {f}
                </option>
              ))}
            </select>

            <select
              value={form.specifications.care}
              onChange={(e) =>
                setForm({
                  ...form,
                  specifications: { ...form.specifications, care: e.target.value },
                })
              }
              className="border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {careOptions.map((c) => (
                <option key={c} value={c} className="dark:text-black">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full my-4 sm:w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          />

          {/* Save & Cancel */}
          <div className="flex justify-evenly font-inter mt-6">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>

            {/* Save Button */}
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>

        {/* New uploaded images preview */}
        <p className="font-semibold text-xl my-4">Upload Images</p>
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 sm:place-items-start">
          {form.images &&
            Array.from(form.images).map((file, index) => (
              // eslint-disable-next-line react/jsx-key
              <div key={index}>
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="new"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            ))}
        </div>
      </div>
    </Model>
  );
}
