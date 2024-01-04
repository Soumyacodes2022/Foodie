import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import "../App.css"
import Footer from '../Components/Footer'

const Main = () => {
  return (
    <div>
        <nav><Navbar/></nav>
        <Outlet/>
        <footer><Footer/></footer>
    </div>
  )
}

export default Main