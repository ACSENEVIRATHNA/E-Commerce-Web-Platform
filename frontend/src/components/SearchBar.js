import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const fetchData = (value) => {
    fetch("http://localhost:4000/api/public")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((product) => {
          return (
            value &&
            product &&
            product.name &&
            product.name.toLowerCase().includes(value)
          );
        });
        console.log(results);
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <>
      <div className="col-7 d-flex justify-content-center p-3">
        <div className="input-wrapper d-flex">
          <input
            className="search-input"
            placeholder="What are you looking for...."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
          <FaSearch id="search-icon" className="search-icon" />
        </div>
      </div>
    </>
  );
};
