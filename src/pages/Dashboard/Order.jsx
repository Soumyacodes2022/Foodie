import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("Access-Token");
  const userEmail = user?.email || "";
  const axiosSecure = useAxiosSecure();
  
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", userEmail],
    queryFn: async () => {
      const res = axiosSecure.get(
        `/payments?email=${userEmail}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  const formatDate = (createdAt)=>{
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString(); 
  }
  
  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-32 flex flex-col  justify-center items-center gap-8">
          {/* Banner */}
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold leading-snug text-black">
              Track Your <span className="text-green">Order</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className={`table ${orders.length === 0 ? "none" : ""}`}>
            {/* head */}
            <thead className="bg-green text-white rounded-md">
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>Transaction Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="font-bold">{item.transactionid}</td>
                  <td>
                    {item.price}
                  </td>
                  <td className="text-rose-500">{item.status}</td>

                  <th>
                    <button
                      className="btn btn-ghost btn-xs text-red"
                      
                    >
                      Contact
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 ? (
            <div className=" h-40">
              <h2 className="flex justify-center items-center text-xl md:text-2xl font-bold">
                {" "}
                Nothing To Show <span className="text-green px-2">
                  {" "}
                  Here{" "}
                </span>{" "}
              </h2>
              <p className="flex flex-col md:flex-row justify-center items-center font-medium my-1">
                Purchase Something to view Order Details.
                <span className="text-green px-2"> Happy Dinner!</span>
              </p>
            </div>
          ) : (
            ""
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Order;
