import React from 'react'

const servicesList = [
    {
        id:1,
        image:"/images/home/icons/icon1.png",
        title:"CATERING",
        desc:"Delight your guests with our flavors and presentation"
    },
    {
        id:2,
        image:"/images/home/icons/icon2.png",
        title:"FAST DELIVERY",
        desc:"We deliver your order promptly to your door"
    },{
        id:3,
        image:"/images/home/icons/icon3.png",
        title:"ONLINE ORDERING",
        desc:"Explore menu and order with ease using our Online Ordering"
    },{
        id:4,
        image:"/images/home/icons/icon4.png",
        title:"GIFT CARDS",
        desc:"Give the gifts of exceptional dining with foodi gift cards."
    },
]
const Services = () => {
  return (
    <div className='section-container my-14'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        {/* text */}
        <div className="md:w-1/2">
          <div className="text-left">
            <p className="Subtitle">Our Story And Services</p>
            <h2 className="Title text-black md:w-5/6">
              Our Culinary Journey And Services
            </h2>
            <p className="my-5 text-[secondary] leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and offer exceptional services, blending culinary artistry with warm hospitality.
            </p>
            
            <button className='btn bg-green text-white hover:text-black px-8 py-4 rounded-full'>Explore</button>
          </div>
          
          
        </div>

        {/* image */}
        <div className="md:w-1/2">
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-7 items-center'>
          {
            servicesList.map((items)=>(
                <div key={items.id} className='shadow-md rounded-md py-6 px-5 text-center space-y-2 text-green hover:-translate-y-4 duration-300 transition-all cursor-pointer'>
                    <img src={items.image} alt="" className='mx-auto' />
                    <h5 className='pt-3 font-semibold '>{items.title}</h5>
                    <p className='text-[#90BD95]'>{items.desc}</p>
                </div>
            ))
          }
          </div>
        </div>
        </div>
    </div>
  )
}

export default Services