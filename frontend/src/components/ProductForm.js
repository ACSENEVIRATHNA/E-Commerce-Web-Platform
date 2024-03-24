import { useState } from "react";
import axios from "axios";
import { useProductContext } from "../hooks/useProductContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductForm = () => {
  const { dispatch } = useProductContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("image", image);
    try {
      const response = await axios.post("http://localhost:4000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`, // Important for file uploads
        },
      });
      const json = response.data;

      if (response.status === 200) {
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setImage(null);
        setError(null);
        console.log("New product added", json);
        dispatch({ type: "CREATE_PRODUCT", payload: json });
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>ADD NEW PRODUCT</h3>
      <label>Product name:</label>
      <input className="input"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Product description:</label>
      <input className="input"
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <label>Product category:</label>
      <select className="select"
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value=''>Categories</option>
        <option value='Laptop'>Laptops</option>
        <option value='Monitor'>Monitors</option>
        <option value='Gaming Casing'>Gaming Casings</option>
        <option value='Desktop'>Desktops</option>
        <option value='Keyboard'>Keyboards</option>
      </select>
      <label>Product price:</label>
      <input className="input"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <label>Product image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button>Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
