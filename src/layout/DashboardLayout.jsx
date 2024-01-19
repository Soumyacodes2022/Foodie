import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard, MdDashboardCustomize, MdMenu } from "react-icons/md";
import { FaArrowAltCircleRight, FaEdit, FaHome, FaLocationArrow, FaPlusCircle, FaQuestion, FaQuestionCircle, FaRegUser, FaShoppingBag, FaUser, FaUsers } from 'react-icons/fa';
import logo from "/images/logo.png"
const DashboardLayout = () => {
    const sharedLink = (
    <>        
      <li><Link to="/" className='mt-3'><FaHome/>Home</Link></li>
      <li><Link to="/dashboard"><MdMenu/>Menu</Link></li>
      <li><Link to="/dashboard"><FaLocationArrow/>Orders Tracking</Link></li>
      <li><Link to="/dashboard"><FaQuestionCircle/>Customer Support</Link></li>
    </>
    )

  return (
    <div>
      <div className="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col md:items-start md:justify-start my-2">
    {/* Page content here */}
    <div className='flex items-center justify-between mx-4'>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
    <MdDashboardCustomize />
    </label>
    <button className='btn rounded-full px-6 bg-green flex items-center gap-2 text-white md:hidden'> <FaRegUser/> Logout</button>
    </div>
    <div className='mt-5 md:mt-2 mx-3'>
    <Outlet/>
    </div>

  </div> 
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li>
        <Link to="/dashboard" className='flex justify-start mb-3'>
        <img src={logo} alt="" className='w-20' />
        <span className="badge badge-primary">Admin</span>
        </Link>
      </li>
      <hr />
      <li className='mt-3'><Link to="/dashboard"><MdDashboard/>Dashboard</Link></li>
      <li><Link to="/dashboard"><FaShoppingBag/>Manage Booking</Link></li>
      <li><Link to="/dashboard"><FaPlusCircle/>Add Menu</Link></li>
      <li><Link to="/dashboard"><FaEdit/>Manage items</Link></li>
      <li className='mb-3'><Link to="/dashboard/users"><FaUsers/>All Users</Link></li>
      <hr />
      {/* Shared Nav Links */}
      {sharedLink}
    </ul>
  
  </div>
</div>
    </div>
  )
}

export default DashboardLayout
