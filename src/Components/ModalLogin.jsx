import React from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const Modal = () => {
    const{
        register,
        handleSubmit,
        formState:{ errors },
        
    } = useForm();

    const onSubmit = (data) => console.log(data);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
      <div className="modal-action mt-0 flex flex-col justify-center">
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
                <button className="btn btn-circle hover:bg-green hover:text-white">
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
