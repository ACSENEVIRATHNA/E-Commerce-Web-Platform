import React from "react";
import { useProductContext } from "../hooks/useProductContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("http://localhost:3000/api/products/" + product._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="product">
      {product.image && (
        <img
          className="image"
          alt={product.name}
          src={`http://localhost:3000/api/public/image/${product._id}`}
        />
      )}
      <div className="name">{product.name}</div>
      <p className="desc">{product.description}</p>
      <div className="price">Rs. {product.price}</div>
      <button className="delete" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};

export default ProductDetails;
