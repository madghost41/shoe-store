import React, { useState, useEffect } from "react";
import ShoeCard from "./ShoeCard";
import "./Home.css"; // Import the CSS file

const Home = (props) => {
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
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="home-container">
      <div className="home-header">HOME PAGE</div>
      <div className="button-container">
        <button onClick={handleNextPage}>Next</button>
        <button onClick={handlePreviousPage}>Previous</button>
      </div>
      <div
        className="card-container"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {data.map((shoe) => (
          <ShoeCard key={shoe.shoeDetails.shoe_id} data={shoe.shoeDetails} />
        ))}
      </div>
    </div>
  );
};

export default Home;
