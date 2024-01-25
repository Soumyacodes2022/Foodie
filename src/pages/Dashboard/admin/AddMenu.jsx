import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const AddMenu = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  //Image Hosting Key
  // const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY
  // const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const image_hosting_api = `https://api.cloudinary.com/v1_1/dgmlhn6jy/image/upload`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("cloud_name", "dgmlhn6jy")
    formData.append("upload_preset", "foodi_image_uploader");
    await axiosPublic
      .post(image_hosting_api, formData)
      .then(res => console.log(res))
      .catch(error => console.log(error));
    // if(imgHost.data.success){
    //   const newMenuItem = {
    //     name:data.name,
    //     category: data.category,
    //     image: imgHost.data.data.display_url,
    //     price: parseFloat(data.price),
    //     recipe:data.recipe
    //   }
    //   const postMenuItem = await axiosSecure.post('/menu', newMenuItem)
    //   if(postMenuItem.status === 200){
    //     Swal.fire({
    //       title: "Added!",
    //       text: "This Item has been Added to the Menu!",
    //       icon: "success",
    //     })
    //   }
    // }
  };

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto">
      <h2 className="text-2xl font-bold my-5">
        Upload A New <span className=" text-green">Menu Item</span>
      </h2>
      {/* Form Items */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st Row */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
          </div>

          {/* 2nd Row */}
          <div className="flex flex-col md:flex-row my-12 gap-5">
            {/* Recipe Name */}
            <div className="form-control w-1/2">
              <div className="label">
                <span className="label-text">Recipe Category*</span>
              </div>
              <select
                className="select select-bordered w-full"
                {...register("category", { required: true })}
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="drinks">Drinks</option>
                <option value="dessert">Dessert</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* Prices */}
            <div className="form-control w-1/2">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
                {...register("price", { required: true })}
              />
            </div>
          </div>

          {/* 3rd Row */}
          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Recipe Details*</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Tell Something about the recipe"
                {...register("recipe", { required: true })}
              ></textarea>
            </label>
          </div>

          {/* 4th Row */}
          <div className="form-control my-12">
            <input
              type="file"
              className="file-input file-input-bordered w-1/3"
              {...register("image", { required: true })}
            />
          </div>

          {/* 5th Row */}

          <button className="btn bg-green text-white hover:text-black w-1/3 md:w-1/6 px-5">
            Add Item <FaUtensils />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
