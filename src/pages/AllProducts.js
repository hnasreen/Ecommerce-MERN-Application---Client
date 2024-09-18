import React, { useContext, useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct.js'
import axios from 'axios'
import AdminProductCard from '../components/AdminProductCard.js'
import Context from '../context/index.js'


const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])
  const {token} = useContext(Context)

  const fetchAllProduct = async() =>{

    const res = await axios.get("https://ecommerce-mern-application-server.onrender.com/api/get-product", {
      headers: { "content-type": "application/json" ,Authorization: `Bearer ${token}`},
      withCredentials: true
    })

    // console.log("product data",res.data.data)

    setAllProduct(res?.data.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  
  return (
    <div>
      <div className='bg-white d-flex justify-content-between align-items-center mt-3' style={{
        paddingTop: '0.5rem', // equivalent to py-2
        paddingBottom: '0.5rem', // equivalent to py-2
        paddingLeft: '1rem', // equivalent to px-4
        paddingRight: '1rem' // equivalent to px-4
      }}>
        <h2 className='fw-bold fs-4'>All Product</h2>
        <button className='btn'
          style={{
            border: '2px solid #dc3545', /* border-red-600 */
            color: '#dc3545', /* text-red-600 */
            padding: '0.25rem 0.75rem', /* py-1 px-3 */
            borderRadius: '9999px', /* rounded-full */
            transition: 'all 0.2s ease-in-out'
          }} onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

        {/**all product */}
      <div className='d-flex flex-wrap align-items-center'
        style={{
          gap: '1.25rem', padding: '1rem', height: 'calc(100vh - 190px)',overflowY: 'scroll'
        }}>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />

            )
          })
        }
      </div>

        {/**upload prouct component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
          )
        }
      

    </div>
  )
}

export default AllProducts