import { useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import { useProductContext } from "../hooks/useProductContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductForm from "../components/ProductForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { products, dispatch } = useProductContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/api/products",{
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };
    if(user){
      fetchProducts();
    }
    
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className="products">
          {products &&
            products.map((product) => (
              <ProductDetails key={product._id} product={product} />
            ))}
        </div>
        <div className="form">
          <ProductForm/>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
