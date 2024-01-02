import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

const Main = () => {
  return (
    <div>
        <nav><Navbar/></nav>
        <Outlet/>
        <footer>Footer</footer>
    </div>
  )
}

export default Main