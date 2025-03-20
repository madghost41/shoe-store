import React, { useState, useEffect } from "react";

const ShoeCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = `${import.meta.env.VITE_MONGO_DB_URL}/api/shoes`;
        if (!data) {
          throw new Error("API URL is not defined in environment variables");
        }

        const response = await fetch(`${data}/api/shoes`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Data could not be fetched! Server response: ${errorText}`
          );
        }

        const json_response = await response.json();
        console.log("Fetched shoes data:", json_response); // Log the data to the console
        setData(json_response);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>Shoe</div>
    </>
  );
};

export default ShoeCard;
