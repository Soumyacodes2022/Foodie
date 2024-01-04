import React from "react";
import testimonial from "/images/home/testimonials/testimonials.png";
const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="md:w-1/2">
          <img src={testimonial} alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left">
            <p className="Subtitle">Testimonials</p>
            <h2 className="Title text-black md:w-5/6">What Our Customers Say About Us</h2>
            <blockquote className="my-5 text-[secondary] leading-[30px]">
                "I had the pleasure of dining at Foodi last night, and I am still raving about the experience! The attention to detail in presentation and service was impeccable."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
