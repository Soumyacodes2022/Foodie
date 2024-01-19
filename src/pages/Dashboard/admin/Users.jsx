import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaClosedCaptioning, FaTrash, FaTrashAlt, FaUsers } from "react-icons/fa";

const Users = () => {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users`);
      return res.json();
    },
  });
  console.log(users);
  return (
    <div>
      <div className="flex items-center justify-between m-4 text-xl font-bold">
        <h4>All Users</h4>
        <h4>Total users: <span className="text-green">{users.length}</span></h4>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[900px]">
          {/* head */}
          <thead className="bg-green text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {
            users.map((user,index)=>(
              <tbody key={index}>
            {/* row 1 */}
            <tr >
              <th>{index+1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === "admin" ? (<span className="font-semibold">Admin</span>) : (<button className="btn btn-circle btn-sm bg-indigo-500 text-white hover:text-black"><FaUsers/></button>)}</td>
              <td><button className="btn btn-circle btn-sm bg-orange-500 text-white hover:text-black"><FaTrashAlt/></button></td>
            </tr>
            
          </tbody>
            ))
          }
        </table>
      </div>
    </div>
  );
};

export default Users;
