import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const [isheartfiltered, setIsheartfiltered] = useState(false)
  const handleheartclick=()=>{
    setIsheartfiltered(!isheartfiltered)
  }
  return (
    
      <div className="card w-96 bg-base-100 shadow-xl relative">
        <div className={`rating absolute top-3 right-3 p-4 bg-green heartstar ${isheartfiltered ? "text-red":"text-white"}`}>
          <FaHeart className="h-5 w-5 cursor-pointer" onClick={handleheartclick}/>
        </div>
        <Link to= {`/menu/${item._id}`}>
        <figure>
          <img
            src= {item.image}
            alt="Shoes"
            className="hover:scale-110 transition-all duration-300"
          />
        </figure>
        </Link>
        
        <div className="card-body">
        <Link to= {`/menu/${item._id}`}><h2 className="card-title">{item.name}</h2></Link>
          
          <p>Description of the Item</p>
          <div className="card-actions justify-between items-center mt-3">
            <h5 className="font-semibold"><span className="text-sm text-red">$</span> {item.price}</h5>
            <button className="btn bg-green text-white hover:text-black">Buy Now</button>
          </div>
        </div>
      </div>
    
  );
};

export default Card;
