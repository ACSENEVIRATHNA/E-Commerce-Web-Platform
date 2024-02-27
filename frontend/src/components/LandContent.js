import React from "react";

const LandContent = ({ product }) => {
  return (
    <>
    
      <div className="product">
        {console.log(product.image)}
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
      </div>
    </>
  );
};

export default LandContent;
