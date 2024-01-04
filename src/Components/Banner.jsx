import React from 'react'
import banner from "/images/home/banner.png"
import bfood from "/images/home/b-food1.png"

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
      <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
        {/* Image */}
      <div className='md:w-1/2'>
          <img src={banner} alt="" />
          <div className='flex flex-col md:flex-row items-center justify-around -mt-14 gap-5'>
            <div className='flex items-center bg-white px-3 py-2 rounded-md gap-3 shadow-md w-64 overflow-hidden'>
              <img src={bfood} alt="" className='rounded-2xl' />
              <div className='space-y-1 '>
                <h5 className='font-medium'>Spicy Noodles</h5>
                <div className="rating rating-sm ">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" checked readOnly/>
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" readOnly />
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
            <div className='md:flex hidden items-center bg-white px-3 py-2 rounded-md gap-3 shadow-md w-64 overflow-hidden'>
              <img src={bfood} alt="" className='rounded-2xl' />
              <div className='space-y-1'>
                <h5 className='font-medium'>Spicy Noodles</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" checked readOnly/>
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" readOnly />
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Text */}
        <div className='md:w-1/2 space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold leading-snug text-black'>Dive into Delights of Delictable <span className='text-green'>Food</span></h2>
            <p className='text-xl text-[#4A4A4A] '>Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanhip</p>
            <button className="btn bg-green text-white hover:text-black rounded-full px-6 ">Order Now</button>
        </div>
        
      </div>
    </div>
  )
}

export default Banner
