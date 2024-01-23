import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
const Login = () => {
    const{
        register,
        handleSubmit,
        reset,
        formState:{ errors },
        
    } = useForm();
    const {signupWithGmail , loginwithEmail} = useAuth();
    const [errorMessage , setErrorMessage] = useState("");
    const axiosPublic = useAxiosPublic();
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
        const userInfo = {
          name: data.name,
          email: data.email
        }
        axiosPublic.post('/users',userInfo).then(()=>{
  
            alert("Logged In Successfully!");
            document.getElementById("my_modal_1").close()
            navigate(from,{replace:true})
        })
      }).catch(
        (error)=> {
          const errorMessage = error.message;
          setErrorMessage("Provide a correct Email and Password")
        }
      )
      reset()
    };


    //Using Gmail
    const handleRegister=(data)=>{
      signupWithGmail().then((response)=>{
        const user = response.user;
        const userInfo = {
          name: response?.user?.displayName,
          email: response?.user?.email
        }
        axiosPublic.post('/users',userInfo).then(()=>{
  
            alert("Logged In Successfully!");
            document.getElementById("my_modal_1").close()
            navigate("/")
  
        })
      }).catch(error=>console.log(error))
    }
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    <div className="mb-5">
    <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
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

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <Link to="/">
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </div></Link>

            <p className="text-center my-2">
              Donot have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
    <div className="text-center space-x-3">
        <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
          <FaGoogle />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaFacebookF />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaGithub />
        </button>
      </div>
    </div>
  </div>
  );
};

export default Login;
