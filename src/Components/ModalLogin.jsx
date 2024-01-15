import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
const Modal = () => {
    const{
        register,
        handleSubmit,
        formState:{ errors },
        
    } = useForm();
    const {signupWithGmail , loginwithEmail} = useContext(AuthContext)
    const [errorMessage , setErrorMessage] = useState("");

    //Redirecting on correct credentials
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    
    //Using Email, Password Manually
    const onSubmit = (data) => {
      const email = data.email;
      const password = data.password;
      loginwithEmail(email,password).then((result)=>{
        const user = result.user;
        alert("Login Successfull");
        document.getElementById("my_modal_1").close();
        navigate(from, {replace:true});
      }).catch(
        (error)=> {
          const errorMessage = error.message;
          setErrorMessage("Provide a correct Email and Password")
        }
      )
    };


    //Using Gmail
    const handleLogin= () => {
      signupWithGmail().then((result)=>{
        const user = result.user;
        alert("Login Successfull");
        navigate(from, {replace:true});
      }).catch(error => console.log(error))
    }
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box overflow-hidden">
      <div className="modal-action mt-0 flex flex-col justify-center ">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-center">Welcome!</h3>
            {/* Email */}
            <div className="form-control" method="dialog">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                
                {...register("email")}
              />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label ">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* Error */}
            {
              errorMessage ? <p className="text-red text-sm italic">{errorMessage}</p> : ""
            }
            {/* Login Button */}
            <div className="form-control ">
              <button
                value="Login"
                className="btn bg-green text-white hover:text-black"
              >
                Login
              </button>
            </div>
            <p className="text-center my-2">
              Don't have an Account?{" "}
              <Link to="/signup" className="hover:underline ml-1 text-red">
                Signup Now
              </Link>
            </p>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    htmlFor="my_modal_1"
                    onClick={() => document.getElementById("my_modal_1").close()}>
                      ✕
            </button>

          </form>
            {/* Social Sign in */}
            <div className="text-center space-x-3 mb-2">
                <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLogin}>
                    <FaGoogle/>
                </button>
                <button className="btn btn-circle hover:bg-green hover:text-white">
                    <FaFacebookF/>
                </button>
                <button className="btn btn-circle hover:bg-green hover:text-white">
                    <FaGithub/>
                </button>
            </div>
        </div>
        
      </div>
    </dialog>
  );
};

export default Modal;
