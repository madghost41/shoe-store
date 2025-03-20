import React from "react";
;

const ShoeCard = ({ data }) => {
  // console.log("Shoe data:", data);



//  const handleDelete = async (shoe_id) => {
//    try {
//      // Make an API request to delete the sock with the given sockId
//      const response = await fetch(
//        `${import.meta.env.VITE_MONGO_DB_URL}/${shoe_id}`,
//        {
//          method: "DELETE",
//        }
//      );
//      if (!response.ok) {
//        throw new Error("Shoe could not be deleted!");
//      }
//      // Update the state or fetch the updated data from the server
//      const updatedData = data.filter((shoe) => sock._id !== sockId); // Remove the deleted sock from the data array
//      setData(updatedData); // Update the state with the updated data
//    } catch (error) {
//      console.error("Error deleting sock:", error);
//    }
//  };

  return (
    <>
       <div
        className="card card-background"
        style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}
      >
        <div className="card-body">
          <h5 className="card-title">Shoe Details</h5>
          <div className="card-text">Size: {data.size}</div>
          <div className="card-text">Brand: {data.brand}</div>
          <div className="card-text">Price: ${data.price}</div>
          <div className="card-text">Style: {data.style}</div>
          <div className="card-text">Rating: {data.rating}</div>
          <button>Add to Cart</button>
        </div> 
        </div>
      
    </>
  );
};

export default ShoeCard;
