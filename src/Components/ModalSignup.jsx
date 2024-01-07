import React, { useContext } from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from './ModalLogin';
import { AuthContext } from '../contexts/AuthProvider';

const ModalSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm();

  const {createUser , loginwithEmail} = useContext(AuthContext)
  const location = useLocation();
  const navigate= useNavigate();
  const from = location.state?.from?.pathname || "/"
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email,password).then((result)=>{
      const user = result.user;
      alert("Account Created Successfully!");
      document.getElementById("my_modal_1").close()
      navigate(from,{replace:true})
    }).catch(
      (error)=> {
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    )
  };
  return (
    <div className='max-w-md w-full mx-auto   items-center my-20 shadow-xl rounded-md'>
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-2xl text-center">Create A New Account</h3>
          {/* Email */}
          <div className="form-control" method="dialog">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
              className="input input-bordered"
              {...register("password")}
            />

            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control ">
            <button
              value="signup"
              className="btn bg-green text-white hover:text-black"
            >
              Signup
            </button>
          </div>
          <p className="text-center my-2">
            Already have an Account?{" "}
            <button onClick={() => document.getElementById("my_modal_1").showModal()} className="hover:underline ml-1 text-red">
              Login Now
            </button>
          </p>
          <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            to='/'>
            ✕
          </Link>
          {/* Social Sign in */}
          <div className="text-center space-x-3 mb-2">
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </form>
      </div>
      <Modal />
    </div>
  )
}

export default ModalSignup
