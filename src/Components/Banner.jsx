import React from 'react'

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
      <div className='py-24 flex flex-col md:flex-row justify-between items-center gap-8'>
        <div className='md:w-1/2 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold leading-snug text-black'>Dive into Delights of Delictable <span className='text-green'>Food</span></h2>
            <p className='text-xl text-[#4A4A4A] '>Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanhip</p>
            <button className="btn bg-green text-white hover:text-black rounded-full px-6 ">Order Now</button>
        </div>
        <div className='md:w-1/2'>Right</div>
      </div>
    </div>
  )
}

export default Banner
