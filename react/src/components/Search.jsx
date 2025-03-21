import React, { useState, useEffect } from "react";
import ShoeCard from "./ShoeCard";
import "./search.css";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryName, setCategoryName] = useState("all");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = searchTerm
          ? `http://localhost:3000/search`
          : `http://localhost:3000/shoes/${page}/10`;
        const options = searchTerm
          ? {
              method: "POST",
              body: JSON.stringify({ searchTerm, categoryName, page, limit: 10 }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          : {};
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        console.log("Fetched Shoes!", json_response);
        setData(json_response);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    };

    fetchData();
  }, [searchTerm, categoryName, page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
    console.log("categoryName:", categoryName);
  };

  return (
    <div className="center">
      <div className="search-container">
        <header className="search-header">
          <h1>Welcome to the Shoe Store</h1>
          <p>Find your perfect pair of shoes</p>
        </header>

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
            value={categoryName}
            onChange={handleCategoryNameChange}
          >
            <option value="all">All</option>
            <option value="brand">Brand</option>
            <option value="style">Style</option>
            <option value="price">Price</option>
            <option value="size">Size</option>
          </select>
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
      <br></br>

      <div className="pagination-buttons">
        <button className="pagination-button" onClick={handlePreviousPage}>
          Previous
        </button>
        <button className="pagination-button" onClick={handleNextPage}>
          Next
        </button>
      </div>
      <div className="card-container">
        {data.length > 0 ? (
          data.map((shoe) => (
            <ShoeCard key={shoe.shoeDetails.shoe_id} data={shoe.shoeDetails} />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Search;
