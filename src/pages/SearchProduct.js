import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import VerticalCard from '../components/VerticalCard'
import axios from 'axios'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    console.log("query",query.search)

    const fetchProduct = async()=>{
        setLoading(true)
        const res = await axios.get("http://localhost:8080/api/search"+query.search, {
            header: { "content-type": "application/json" },
            withCredentials: true
          })
        setLoading(false)

        setData(res?.data?.data)
    }

    useEffect(()=>{
        fetchProduct()
    },[query])

  return (
    <div className='container p-4 mx-auto'>
      {
        loading && (
          <p className='text-center fs-4'>Loading ...</p>
        )
      }
 
      <p className='fs-4 fw-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white fs-4 text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct