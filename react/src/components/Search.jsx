import React, { useState, useEffect } from "react";
import ShoeCard from "./ShoeCard";
import "./search.css";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");


   const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/shoes/${page}/10`
          );
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
    }, [page]);
  
    const handleNextPage = () => {
      setPage(page + 1);
    };
  
    const handlePreviousPage = () => {
      setPage(page - 1);
    };


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
      <br></br>

      <div className="pagination-buttons">
        <button className="pagination-button" onClick={handlePreviousPage}>
          Previous
        </button>
        <button className="pagination-button" onClick={handleNextPage}>
          Next
        </button>
      </div>
      <div className="card-container" >
        {data.map((shoe) => (
          <ShoeCard key={shoe.shoeDetails.shoe_id} data={shoe.shoeDetails} />
        ))}
      </div>

    </div>
  );
};

export default Search;
