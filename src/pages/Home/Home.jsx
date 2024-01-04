import React from 'react'
import Banner from '../../Components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import Services from './Services'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpecialDishes/>
      
      <Testimonials/>
      <Services/>
    </div>
  )
}

export default Home