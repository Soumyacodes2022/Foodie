import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("Access-Token");
  const userEmail = user?.email || "";

  
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", userEmail],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/payments?email=${userEmail}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  console.log(orders);
  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col  justify-center items-center gap-8">
          {/* Banner */}
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold leading-snug text-black">
              Track Your <span className="text-green">Order</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
