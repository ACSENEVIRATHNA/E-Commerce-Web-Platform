import { useEffect } from "react";
import LandContent from "../components/LandContent";
import { useProductContext } from "../hooks/useProductContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Landing = () => {
  const { products, dispatch } = useProductContext();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/api/public");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="header">
        <Header />
      </div>
      <div className="content1">
        <div className="products">
          {products &&
            products.map((product) => (
              <LandContent key={product._id} product={product} />
            ))}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
