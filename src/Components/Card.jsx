import React, { useCallback, useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2'


const Card = ({ item }) => {
  const { name, recipe, image, price, _id } = item;
  const [isheartfiltered, setIsheartfiltered] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleAddToCart = (item) => {
    // console.log("button is clicked",item)
    if (user && user?.email) {
      const cartItems = {
        menuItemId: _id,
        name,
        image,
        price,
        email: user.email,
        quantity: 1,
      };
      // console.log(cartItems)

      fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItems),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.createdData){

          
          Swal.fire({
            icon: "success",
            title: "Item Added to Cart",
            showConfirmButton: false,
            timer: 1500
          });
        }
        if(data.failedData){
          Swal.fire({
            icon: "error",
            title: "Item Already Added to the cart",
            showConfirmButton: false,
            timer: 1500
          });
        }
        });
    }
    else{
      Swal.fire({
        title: "Please Login to Continue!",
        text: "Login or Create an Account to use this feature",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup',{state:{from:location}})
        }
      });
    }
  };
  const handleheartclick = () => {
    setIsheartfiltered(!isheartfiltered);
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl relative">
      <div
        className={`rating absolute top-3 right-3 p-4 bg-green heartstar ${
          isheartfiltered ? "text-red" : "text-white"
        }`}
      >
        <FaHeart
          className="h-5 w-5 cursor-pointer"
          onClick={handleheartclick}
        />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-110 transition-all duration-300"
          />
        </figure>
      </Link>

      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>

        <p>Description of the Item</p>
        <div className="card-actions justify-between items-center mt-3">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span> {item.price}
          </h5>
          <button
            className="btn bg-green text-white hover:text-black"
            onClick={() => {
              handleAddToCart(item);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
