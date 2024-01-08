import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../App.css";
import Footer from "../Components/Footer";
import  { AuthContext } from "../contexts/AuthProvider";
import Loading from "../Components/Loading";

const Main = () => {
  const {loading} = useContext(AuthContext)
  return (
    
    <div>
      {
        loading ? <Loading/> : 
      <div> 
        <Navbar />
        <Outlet />
        <Footer />
      </div>
      

      
      
      }
        
        
      
      
    </div>
    
  );
};

export default Main;
