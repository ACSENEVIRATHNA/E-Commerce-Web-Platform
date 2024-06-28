import React from "react";
import { useProductContext } from "../hooks/useProductContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

const ProductDetails = ({ product ,onEdit }) => {
  const { dispatch } = useProductContext();
  const { user } = useAuthContext();

  let imageData = `http://13.48.55.164:4000/api/public/image/${product._id}?timestamp=${new Date().getTime()}`;

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `http://13.48.55.164:4000/api/products/${product._id}`,
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

  const edit = () => {
    onEdit(product);
  }

  return (
    <div className="product col-3 d-flex">
      {product.image && (
        <img
          className="image img-fluid"
          alt={product.name}
          src={imageData}
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
        <button className="edit" onClick={edit}>
          <MdEditDocument className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
