"use client";

// Import React Libraries
import { createContext, useReducer, useContext, useEffect } from "react";
import { cartReducer } from "./cartReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext"; // <-- make sure you have this

// Create Context
const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // get logged-in user
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  // Fetch cart from backend on page load (only if logged in)
  useEffect(() => {
    if (!user) {
      toast.warn("First Login !", { autoClose: 500 });
      return; // stop if not logged in
    }
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
          withCredentials: true,
        });
        dispatch({ type: "SET_CART", payload: res.data?.products || [] });
      } catch (err) {
        console.error("Fetch cart error:", err);
      }
    };
    fetchCart();
  }, [user]);

  // Add product to cart
  const addProduct = async (product) => {
    if (!user) {
      toast.warn("Please login first!", { autoClose: 500 });
      return;
    }

    const existing = state.products.find((p) => p.product._id === product._id);
    if (existing) {
      toast.warn("Product is already in the cart!", { autoClose: 500 });
      return;
    }

    dispatch({ type: "ADD_PRODUCT", payload: product });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      toast.success("Product added to cart!", { autoClose: 500 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart", { autoClose: 500 });
    }
  };

  // Remove product from cart
  const removeProduct = async (id) => {
    if (!user) {
      return;
    }

    dispatch({ type: "REMOVE_PRODUCT", payload: id });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove`,
        { productId: id },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove product", { autoClose: 500 });
    }
  };

  // Update quantity
  const updateQuantity = async (id, quantity) => {
    if (!user) {
      return;
    }

    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
        { productId: id, quantity },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity", { autoClose: 500 });
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!user) {
      toast.warn("please Login FIrst", { autoClose: 500 });
      return;
    }

    dispatch({ type: "CLEAR_CART" });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/clear`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart", { autoClose: 500 });
    }
  };

  return (
    <>
      <CartContext.Provider
        value={{ state, dispatch, addProduct, removeProduct, updateQuantity, clearCart }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
