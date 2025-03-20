import React, { useState } from "react";
import "./search.css";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `http://localhost:3000/search`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ searchTerm }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        // props.setData(data);
        console.log("response data:", data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log("category:", category);
  };

  return (
    <div className="search-container">
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <select
          className="search-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="shoes">Brand</option>
          <option value="accessories">Style</option>
        </select>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
