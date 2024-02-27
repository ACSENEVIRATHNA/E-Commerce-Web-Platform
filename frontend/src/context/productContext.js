import { createContext, useReducer } from "react";

export const ProductContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      return {
        products: [action.payload, ...state.products],
      };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((p) => p._id !== action.payload._id),
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
