import React from "react";

const LandContent = ({ product }) => {
  return (
    <>
      <div className="product col-2">
        {console.log(product.image)}
        <div className="img-container">
          {product.image && (
            <img
              className="pro-image"
              alt={product.name}
              src={`http://localhost:4000/api/public/image/${product._id}`}
            />
          )}
        </div>
        <div className="name">{product.name}</div>
        <p className="desc">{product.description}</p>
        <div className="price">Rs. {product.price}</div>
      </div>
    </>
  );
};

export default LandContent;
