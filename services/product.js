const BASE = "https://famora-backend-production.up.railway.app/products"

// Get Product
export const getProducts = async () => {
  const res = await fetch(BASE);
  return await res.json();
};

// Create Product
export const createProduct = async (data) => (await fetch(BASE, { method: "POST", body: data })).json();

// Delete Product
export const deleteProduct = async (id) => (await fetch(`${BASE}/${id}`, { method: "DELETE" })).json();

// Update Product
export const updateProduct = async (id, data) =>
  (await fetch(`${BASE}/${id}`, { method: "PUT", body: data })).json();

// Single Product Detail
export const getSingleProduct = async (id) => (await fetch(`${BASE}/${id}`)).json();
