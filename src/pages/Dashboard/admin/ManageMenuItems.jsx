import React, { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageMenuItems = () => {
  const [menu, isMenuLoading, refetch] = useMenu();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexofLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexofLastItem - itemsPerPage;
  const currentItems = menu.slice(indexofFirstItem, indexofLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const axiosSecure = useAxiosSecure();
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this item from the menu?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${item._id}`).then((res) => {
          if (res) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "This Item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between font-bold">
        <h2>All Menu Items</h2>
        <h2>
          Total menu Items: <span className="text-orange-500">{menu.length}</span>{" "}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[900px]">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {currentItems.map((item, index) => (
            <tbody
              key={index}
            >
              {/* row 1 */}
              <tr>
                <th>{index +indexofFirstItem +1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-22 h-12">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <Link to={`/dashboard/update-item/${item._id}`}>
                    <button className="btn btn-sm btn-square text-white bg-orange-500 hover:text-black">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-square text-red"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="flex justify-center my-9">
        {Array.from({
          length: Math.ceil(menu.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 my-7 rounded-full ${
              currentPage === index + 1
                ? "text-white bg-orange-500 shadow-md"
                : "bg-gray-200 shadow-xl"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageMenuItems;
