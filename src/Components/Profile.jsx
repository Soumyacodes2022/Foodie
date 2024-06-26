import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Profile = ({user}) => {
    const {logOut}  = useAuth()
    const handleLogOut = () => {
        logOut().then(()=>{

        }).catch(error =>{

        })
    }
    return (
        <div>

            <div className="drawer drawer-end z-10">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {
                                user.photoURL ? <img alt="Tailwind CSS Navbar component" src={user.photoURL} /> : <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            }
                        </div>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to='/update-profile'>Profile</Link></li>
                        <li><Link to='/order'>Order</Link></li>
                        <li><a>Settings</a></li>
                        {/* To Be Updated (Only for Admin) */}
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        <li><a onClick={handleLogOut}>Log Out</a></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile
