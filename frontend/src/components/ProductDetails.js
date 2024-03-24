import React from "react";
import { useProductContext } from "../hooks/useProductContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/products/" + product._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="product col-4 d-flex">
      {product.image && (
        <img
          className="image img-fluid"
          alt={product.name}
          src={`http://localhost:4000/api/public/image/${product._id}`}
        />
      )}
      <div className="name">{product.name}</div>
      <div className="desc">
        <p className="desc">{product.description}</p>
      </div>
      <div className="price">Rs. {product.price}</div>
      <div className="control">
        <button className="delete" onClick={handleClick}>
          <MdDelete className="icon" />
        </button>
        <button className="edit" onClick={handleClick}>
          <MdEditDocument className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
