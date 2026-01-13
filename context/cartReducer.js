// CartReducer Component
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, products: action.payload };

    case "ADD_PRODUCT":
      const existing = state.products.find((p) => p.product._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          products: state.products.map((p) =>
            p.product._id === action.payload._id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      } else {
        return { ...state, products: [...state.products, { product: action.payload, quantity: 1 }] };
      }

    case "REMOVE_PRODUCT":
      return { ...state, products: state.products.filter((p) => p.product._id !== action.payload) };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        products: state.products.map((p) =>
          p.product._id === action.payload.id
            ? { ...p, quantity: Math.max(1, action.payload.quantity) }
            : p
        ),
      };

    case "CLEAR_CART":
      return { ...state, products: [] };

    default:
      return state;
  }
};
