import React from 'react'
import img1 from "../../images/home/categories/img1.png"
import img2 from "../../images/home/categories/img2.png"
import img3 from "../../images/home/categories/img3.png"
import img4 from "../../images/home/categories/img4.png"




const categoryItems = [
    {
        id:1,
        title:"Main dish",
        desc:"(86 Dishes)",
        image: img1
    },
    {
        id:2,
        title:"Break Fast",
        desc:"(12 Dishes)",
        image:img2,
    },
    {
        id:3,
        title:"Dessert",
        desc:"(44 dessert)",
        image:img3,
    },
    {
        id:4,
        title:"BrowseAll",
        desc:"(255 items)",
        image:img4,
    }
]
const Categories = () => {
  return (
    <div className='section-container py-14'>
        <div className='text-center'>
        <p className='Subtitle'>Customer Favorites</p>
        <h2 className='Title'>Popular Categories</h2>
        </div> 
        {/* Category Items */}
        <div className='flex flex-col sm:flex-row justify-around items-center gap-9 mt-14 '>
            {
                categoryItems.map((item,i)=>(
                    <div key={i} className='shadow-lg rounded-3xl cursor-pointer py-6 px-5 w-72 text-center mx-auto bg-white hover:-translate-y-4 duration-300 transition-all'>
                        <div className='flex mx-auto justify-center items-center w-full'>
                        <img src={item.image} alt="" className='bg-[#C1F1C6] p-5 rounded-full w-28 h-28 ' />
                        </div>

                        <div className='mt-4 space-y-1'>
                        <h5>{item.title}</h5>
                        <p>{item.desc}</p>
                        </div>
                    </div>
                )
                )
            }
        </div>
    </div>
  )
}

export default Categories