import { createContext, useReducer } from "react";

export const ProductContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      console.log("setting", action.payload);
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      console.log("Rendering product", action.payload);
      return {
        products: [action.payload, ...state.products],
      };
    case "DELETE_PRODUCT":
      console.log("Deleting product", action.payload._id);
      return {
        products: state.products.filter((p) => p._id !== action.payload._id),
      };
    case "UPDATE_PRODUCT":
      console.log("Updating product:", action.payload._id);
      return {
        ...state,
        products: state.products.map((p) => {
          if (p._id === action.payload._id) {
            // If the product _id matches, return the updated payload
            return action.payload;
          } else {
            // Otherwise, return the original product
            return p;
          }
        }),
      };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null,
  });
  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
