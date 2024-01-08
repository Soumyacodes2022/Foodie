import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Update_Profile = () => {
    const{
        register,
        handleSubmit,
        formState:{ errors },
        
    } = useForm();

    const {updateUserProfile} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit =(data)=>{
        const name = data.name;
        const photoURL = data.photoURL;
        updateUserProfile(name,photoURL).then(()=>{
            navigate(from, {replace:true});
        }).catch((error)=>{

        })
    }
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h3 className='font-bold text-center'>Update Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input {...register("name")} type="text" placeholder="Your Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input {...register("photoURL")} type="text" placeholder="Photo URL" className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-green text-white font-semibold hover:text-black">Update</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Update_Profile
