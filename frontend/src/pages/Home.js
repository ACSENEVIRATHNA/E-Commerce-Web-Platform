import React, { useState } from "react";
import { useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import { useProductContext } from "../hooks/useProductContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductForm from "../components/ProductForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { products, dispatch } = useProductContext();
  const { user } = useAuthContext();
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://13.48.55.164:4000/api/products", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };
    if (user) {
      fetchProducts();
    }
  },[dispatch,user, selectedProduct]);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Header />
      <div className="create-wrapper d-flex justify-content-center">
        <div className="products col-6">
          {products &&
            products.map((product) => (
              <ProductDetails key={product._id} product={product} onEdit={handleEditProduct}/>
            ))}
        </div>
        <ProductForm product={selectedProduct} onCancelEdit={handleCancelEdit}/>
      </div>
      <Footer />
    </>
  );
};

export default Home;
