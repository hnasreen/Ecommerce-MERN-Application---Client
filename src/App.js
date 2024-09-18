import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

const App = () => {
  
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    const res = await axios.get('https://ecommerce-mern-application-server.onrender.com/api/user-details',
      {
        header:{"content-type":"application/json"},
      withCredentials:true})

      console.log("user-details:",res)
    if(res.data.success){
      dispatch(setUserDetails(res.data))
    }
}

const fetchUserAddToCart = async()=>{
  
  const res = await axios.get('https://ecommerce-mern-application-server.onrender.com/api/countAddToCartProduct',
    {
      header:{"content-type":"application/json"},
    withCredentials:true})

  setCartProductCount(res?.data?.data?.count)

  // console.log('addtocartproduct',res?.data?.data?.count)
}


  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */ 
    fetchUserAddToCart()

  },[])

  return (
    <>
    <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
      <ToastContainer
        position='top-center'
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      </Context.Provider>
    </>
  )
}

export default App