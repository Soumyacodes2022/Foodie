import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Loading from '../Components/Loading';
import Swal from 'sweetalert2'

const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    if(loading){
        return <Loading/>
    }
    if(user){
        return children;
    }

  return (
   
    <Navigate to="/" state={{from : location}} replace >
       {Swal.fire({
      title: "Please Login to Continue!",
      text: "Login or Create an Account to add cart items",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login Now!"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/signup',{state:{from:location}})
      }
    })
    }
    </Navigate>
  )
}

export default PrivateRouter
