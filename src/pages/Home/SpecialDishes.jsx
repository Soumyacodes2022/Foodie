import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../Components/Card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const simpleNextArrow=(props)=>{
  const [classname,style,onClick] = props;
  return (
    <div className={classname} style={{...style, display:"block", background:"red" }} onClick={onClick}>NEXT</div>
  )
}

const simplePrevArrow=(props)=>{
  const [classname,style,onClick] = props;
  return (
    <div className={classname} style={{...style, display:"block", background:"green" }} onClick={onClick}>NEXT</div>
  )
}


const SpecialDishes = () => {
  
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);
  
  useEffect(()=>{
    fetch('/menu.json').then(res=>res.json()).then((data)=>{
      const specials = data.filter((item)=>
        item.category === "popular"
      )
      console.log(specials)
      setRecipes(specials)
    });
  },[]);


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        next: <simpleNextArrow/>,
        prev: <simplePrevArrow/>
      }
    ]
  };
  return (
    <div className="section-container my-20">
      <div className="text-start">
        <div className="Subtitle">Special Dishes</div>
        <div className="Title md:w-[25rem]">Standout Dishes From Our Menu</div>
        <div className="md:absolute right-32 top-[1520px] mb-10 md:mr-24">
          <button onClick={()=>slider?.current?.slickPrev()} className="btn p-2 rounded-full ml-5">
            <FaArrowLeft className="w-8 h-8 p-1"/>
          </button>
          <button onClick={()=>slider?.current?.slickNext()} className="btn p-2 rounded-full ml-5 bg-green">
          <FaArrowRight className="w-8 h-8 p-1"/>
          </button>
        </div>
        <Slider ref={slider} {...settings} className="overflow-hidden space-x-5 mt-10">
          {
            recipes.map((item,i)=>(
              <Card key={i} item={item}/>
            ))
          }
        </Slider>
      </div>

      <div>

      </div>
    </div>
  );
};

export default SpecialDishes;
