import React, { useState, useEffect } from "react";

const ShoeCard = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/shoes");
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        console.log('Fetched Shoes!', json_response)
        setData(json_response);
      } catch (error) {
        console.error('Error fetching socks:', error);
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
