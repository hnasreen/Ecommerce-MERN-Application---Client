import React from 'react'
import CategoryList from '../components/CategoryList.js'
import BannerProduct from '../components/BannerProduct.js'
import HorizontalCardProduct from '../components/HorizontalCardProduct.js'
import VerticalCardProduct from '../components/VerticalCardProduct.js'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpods"} heading={"Top Airpods"}/> 
      <HorizontalCardProduct category={"watches"} heading={"Popular Watches"}/>

      <VerticalCardProduct category={"camera"} heading={"Cameras"}/>
      <VerticalCardProduct category={"printers"} heading={"Printers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"earphones"} heading={"Earphones"}/>

    </div>
  )
}

export default Home