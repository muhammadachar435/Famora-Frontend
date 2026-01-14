/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import { useEffect, useState } from "react";
import { getSingleProduct, updateProduct } from "../../../../services/product";
import Model from "../../../../UiModel/Model";
import { toast } from "react-toastify";
import {
  sizeOptions,
  fitOptions,
  colorOptions,
  materialOptions,
  careOptions,
} from "../../../../data/ProductData";

// Edit Product Component
export default function EditProduct({ id, closeup, onSaved, onClose }) {
  // State to Store Data
  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    rating: "",
    flashSaleStart: "", // datetime-local string
    flashDurationMinutes: 120, // default 2 hours
    offerImage: "",
    inStock: true,
    images: null,
    category: "",
    tags: "",
    sizes: [],
    colors: [],
    specifications: {
      material: "Cotton",
      fit: "Regular",
      care: "Machine Wash",
    },
  });

  useEffect(() => {
    if (id) {
      getSingleProduct(id).then((data) => {
        setForm({
          name: data.name || "",
          price: data.price || "",
          discountPrice: data.discountPrice || "",
          description: data.description || "",
          offerImage: data.offerImage || "",
          rating: data.rating || "",
          inStock: data.inStock ?? true,
          images: null, // new images
          existingImages: data.images || [], // store existing images
          category: data.category || "",
          tags: data.tags || "",
          sizes: data.sizes || [],
          colors: data.colors || [],
          flashSaleStart: data.flashSaleStart
            ? new Date(data.flashSaleStart).toLocaleString("sv-SE").slice(0, 16)
            : "",
          flashDurationMinutes: data.flashDurationMinutes || 120,
          specifications: data.specifications || {
            material: "Cotton",
            fit: "Regular",
            care: "Machine Wash",
          },
        });
      });
    }
  }, [id]);

  // handleMultiSelect
  const handleMultiSelect = (field, value) => {
    setForm((prev) => {
      const current = prev[field] || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const submit = async (e) => {
    e.preventDefault(); // No Refresh
    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("offerImage", form.offerImage);
    data.append("price", form.price);
    data.append("discountPrice", form.discountPrice);
    data.append("rating", form.rating);
    data.append("inStock", form.inStock);
    data.append("category", form.category);
    data.append("tags", form.tags);

    // Only add flash fields when needed
    if (form.tags === "flash-sale" || form.tags === "new-arrival") {
      if (!form.flashSaleStart) {
        toast.error("Please select sale start time");
        return;
      }
      data.append("flashSaleStart", new Date(form.flashSaleStart).toISOString());
      data.append("flashDurationMinutes", form.flashDurationMinutes);
    }

    // FIXED: Add missing fields as JSON strings
    data.append("sizes", JSON.stringify(form.sizes));
    data.append("colors", JSON.stringify(form.colors));
    data.append("specifications", JSON.stringify(form.specifications));

    // Handle images - only append if new images are selected
    if (form.images && form.images.length > 0) {
      for (let file of form.images) {
        data.append("images", file); // This should be "images" (plural) to match multer config
      }
    } else {
      // If no new images, send empty array to indicate we're keeping existing ones
      data.append("images", JSON.stringify([]));
    }

    try {
      // FIXED: Call updateProduct with id and data
      const response = await updateProduct(id, data);

      if (response) {
        onSaved(); // Refresh product list
        onClose();
        toast.success("Product updated successfully", { autoClose: 500 });
      }
    } catch (error) {
      toast.error("Failed to update product: " + error.message, { autoClose: 500 });
      console.error("Update error:", error);
    }
  };

  // UI Design
  return (
    <Model isOpen={closeup} onClose={onClose}>
      <div>
        {/* Heading */}
        <h1 className="text-2xl mb-5 font-roboto font-bold text-center sm:text-left">Edit Product</h1>

        <form onSubmit={submit}>
          <div className="grid place-items-center sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Name */}
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {/* Price */}
            <input
              placeholder="Original Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />{" "}
            {/* Discount */}
            <input
              placeholder="Discount Price"
              type="number"
              value={form.discountPrice}
              onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {/* Rating */}
            <input
              placeholder="Rating"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {/* ImageOffer */}
            <input
              placeholder="Image Offer"
              type="text"
              value={form.offerImage}
              onChange={(e) => setForm({ ...form, offerImage: e.target.value })}
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
              <option value="" disabled>
                -- Select Category --
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
            {/* Tags */}
            <select
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="" disabled>
                -- Select Tag --
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
            {/* Files */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files.length > 3) {
                  toast.error("Maximum 3 Images Allowed", { autoClose: 500 });
                  return;
                }
                setForm({ ...form, images: files });
              }}
              className="w-64"
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
                    min={1}
                    value={form.flashDurationMinutes}
                    onChange={(e) => setForm({ ...form, flashDurationMinutes: Number(e.target.value) })}
                    className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}
            {/* New Arrival */}
            {form.tags === "new-arrival" && (
              <div className="mt-4 grid grid-cols-1 gap-4">
                {/* New Arrival Sale Start */}
                <div>
                  <label className="font-semibold">New Arrival Sale Start Time:</label>
                  <input
                    type="datetime-local"
                    value={form.flashSaleStart || ""}
                    onChange={(e) => setForm({ ...form, flashSaleStart: e.target.value })}
                    className="w-64 border p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* New Arrival Sale Duration */}
                <div>
                  <label className="font-semibold">New Arrival Duration (minutes):</label>
                  <input
                    type="number"
                    min={1}
                    value={form.flashDurationMinutes}
                    onChange={(e) => setForm({ ...form, flashDurationMinutes: Number(e.target.value) })}
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
                setForm({ ...form, specifications: { ...form.specifications, fit: e.target.value } })
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
                setForm({ ...form, specifications: { ...form.specifications, care: e.target.value } })
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
            className="w-full my-4 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          />

          {/* Save & Cancel */}
          <div className="flex justify-evenly font-inter mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>

        {/* Images Display */}
        <div className="my-6">
          {/* Heading */}
          <p className="text-lg font-roboto bg-blue-500 inline p-1 text-white rounded-md">
            Existing Images
          </p>
          <div className="my-4 grid grid-cols-3 place-items-center lg:place-items-start gap-2">
            {/* Existing images preview */}
            {form.existingImages?.map((img, index) => (
              <div key={index}>
                <img
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img}`}
                  alt="existing"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            ))}
          </div>

          <p className="text-lg font-roboto bg-blue-500 inline p-1 text-white rounded-md">New Images</p>
          {form.images ? (
            <div className="mt-4 grid grid-cols-3 place-items-center lg:place-items-start gap-2">
              {/* New uploaded images preview */}
              {form.images &&
                Array.from(form.images).map((file, index) => (
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
          ) : (
            <p className="text-center font-inter text-lg my-6 font-semibold">No New Images Selected</p>
          )}
        </div>
      </div>
    </Model>
  );
}
