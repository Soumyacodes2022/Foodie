import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [refetch, cart] = useCart();
  console.log(cart);
  const {user} = useContext(AuthContext)
  //Delete an Item from cart
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  const handleDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
                text: "Your file has been deleted.",
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
                <>
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
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>

                    <th>
                      <button
                        className="btn btn-ghost btn-xs text-red"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                </>
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
              <p className="flex justify-center items-center font-medium my-1">Add your items to the cart to Purchase.<span className="text-green px-2"> Happy Dinner!</span></p>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-end my-5">
            <button
              className={`btn btn-ghost btn-sm bg-red text-white text-sm ${
                cart.length === 0 ? "none" : ""
              }`}
              onClick={handleDeleteAll}
            >
              <FaTrash />{" "}
              <span className="text-white text-sm font-medium">Delete All</span>
            </button>
          </div>
        </div>
      </div>
      {/* Customer Details */}
      <div>
      {/* TODO */}
      </div>
    </div>
  );
};

export default CartPage;
