"use client";

// Import Icons
import { Trash2, Plus, Minus, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function AddToCart({ isCartOpen, setIsCartOpen }) {
  const { state, removeProduct, updateQuantity } = useCart();

  // total Price
  const totalPrice = state.products.reduce((acc, p) => acc + p.quantity * p.product.discountPrice, 0);

  // CheckoutHandler
  const checkoutHandler = async () => {
    if (state.products.length === 0) {
      toast.error("Cart is empty", { autoClose: 500 });
      return;
    }

    const orderData = {
      products: state.products.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.discountPrice,
        quantity: item.quantity,
      })),
      totalAmount: totalPrice + 29.99 + 39.99,
    };

    try {
      if (confirm("Order Placed successFully")) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/create`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        toast.success("Order Placed Successfully", { autoClose: 500 });

        const data = await res.json();

        // eslint-disable-next-line react-hooks/immutability
        state.products = [];
        setIsCartOpen(false);
      }
    } catch (err) {
      toast.error("Checkout failed", { autoClose: 500 });
    }
  };

  // UI/UX Design
  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-500 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sliding Cart - always in DOM */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 sm:w-100 bg-white dark:bg-[#222] shadow-xl z-50 p-5 overflow-y-auto transform transition-transform duration-500
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100 cursor-pointer font-bold"
          >
            <X size={25} />
          </button>
        </div>

        {/* Cart Items */}
        {state.products.length === 0 ? (
          <p className="text-gray-500 font-inter">Your cart is empty</p>
        ) : (
          state.products.map((item) => (
            <div key={item.product._id} className="flex items-center justify-between mb-4">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.product.images[0]}`}
                className="w-16 h-16 rounded"
              />
              <div className="flex-1 ml-3">
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-500">{item.product.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.product._id, item.quantity - 1);
                      } else {
                        toast.warn("Minimum quantity is 1", { autoClose: 500 });
                      }
                    }}
                    className="p-1 bg-gray-200 dark:bg-gray-600 rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="p-1 bg-gray-200 dark:bg-gray-600  rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-semibold">
                  Rs {(item.product.discountPrice * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => {
                    removeProduct(item.product._id);
                    toast.success("Product removed from cart", { autoClose: 500 });
                  }}
                  className="mt-1 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Order Summary */}
        <div className="mt-5 border-t pt-3">
          <p className="flex justify-between">
            <span>Subtotal:</span> <span>Rs {totalPrice.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Delivery:</span> <span>Rs 50.99</span>
          </p>
          <p className="flex justify-between">
            <span>Tax:</span> <span>Rs 99.99</span>
          </p>
          <p className="flex justify-between font-bold mt-2">
            <span>Total:</span> <span>Rs {(totalPrice + 29.99 + 39.99).toFixed(2)}</span>
          </p>
        </div>

        {/* Buttons */}
        <button
          onClick={checkoutHandler}
          className="w-full bg-green-500 text-white py-2 rounded mt-3 hover:bg-green-600 cursor-pointer"
        >
          Checkout
        </button>
        <button
          onClick={() => setIsCartOpen(false)}
          className="w-full bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
