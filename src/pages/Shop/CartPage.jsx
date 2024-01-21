import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [refetch, cart] = useCart();
  const { user } = useContext(AuthContext);
  const [ cartItems, setCartItems ] =  useState([]);

  //Calculate the cartitem price
  const calculatePrice = (item) => {
    return item.price * item.quantity ;
  }


  //Plus button function
  const handlePlus = (item) => {
    // console.log(item._id);
    fetch(`http://localhost:3000/carts/${item._id}`,{
      method:"PUT",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify({quantity : item.quantity + 1})
    }).then(res=>res.json()).then(()=>{
      const updateData = cartItems.map((cartItem)=>{
        if(cartItem.id === item.id){
          return{
            ...cartItem , 
            quantity: cartItem.quantity + 1
          }
        }
        return cartItem;
      })
      refetch();
      setCartItems(updateData);
      
    })
    refetch();
  }


  //Minus button function
  const handleMinus = (item) => {
    // console.log(item._id);
    if(item.quantity > 1){
      fetch(`http://localhost:3000/carts/${item._id}`,{
      method:"PUT",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify({quantity : item.quantity - 1})
    }).then(res=>res.json()).then(()=>{
      const updateData = cartItems.map((cartItem)=>{
        if(cartItem.id === item.id){
          return{
            ...cartItem , 
            quantity: cartItem.quantity - 1
          }
        }
        return cartItem;
      })
      refetch();
      setCartItems(updateData);
      
    })
    refetch();
    }
  }

  //Calculate Total Price
  const orderTotal = cart.reduce(function(total,item){
    return total + calculatePrice(item);
  },0) 

  //Delete an Item from cart
  const handleDelete = (item) => {
    
     
        fetch(`http://localhost:3000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              
            }
          });
      
    
  };

  //Delete All Method
  const handleDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete All items from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete All!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            if (true) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "All items has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    

    
   
    <div className="section-container ">
    
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col  justify-center items-center gap-8">
          {/* Banner */}
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold leading-snug text-black">
              Items Added to the <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>
      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className={`table ${cart.length === 0 ? "none" : ""}`}>
            {/* head */}
            <thead className="bg-green text-white rounded-md">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{item.name}</td>
                    <td>
                      <button className="btn btn-xs" disabled = {item.quantity<1} onClick={()=> handleMinus(item)}>-</button>
                      <input type="number" value={item.quantity} onChange={()=>console.log(item.quantity)} className="w-10 mx-2 text-center overflow-hidden appearance-none"/>
                      <button className="btn btn-xs" onClick={()=> handlePlus(item)}>+</button>
                    </td>
                    <td>${calculatePrice(item).toFixed(2)}</td>

                    <th>
                      <button
                        className="btn btn-ghost btn-xs text-red"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                
              ))}
            </tbody>
          </table>
          {cart.length === 0 ? (
            <div className=" h-40">
              <h2 className="flex justify-center items-center text-xl md:text-2xl font-bold">
                {" "}
                Nothing To Show <span className="text-green px-2">
                  {" "}
                  Here{" "}
                </span>{" "}
              </h2>
              <p className="flex flex-col md:flex-row justify-center items-center font-medium my-1">
                Add your items to the cart to Purchase.
                <span className="text-green px-2"> Happy Dinner!</span>
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-end my-5">
            <button
              className={`btn btn-ghost btn-sm bg-red text-white hover:text-red text-sm ${
                cart.length === 0 ? "none" : ""
              }`}
              onClick={handleDeleteAll}
            >
              <FaTrash />{" "}
              <span className=" text-sm font-medium">Delete All</span>
            </button>
          </div>
        </div>
      </div>
      {/* Customer Details */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3 my-4 md:my-1">
          <h3 className="font-semibold"> Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User_id: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-semibold"> Shipping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Price: ${orderTotal.toFixed(2)}</p>
          <button className="btn btn-ghost bg-green text-white hover:text-black">
            Proceed to Checkout
          </button>
        </div>
      </div>

    </div>
            

  );
};

export default CartPage;
