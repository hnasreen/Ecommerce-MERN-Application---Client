import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../Helper/displayCurrency.js';
import axios from 'axios'
import addToCart from '../Helper/AddToCart.js'
import Context from '../context/index.js';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay.js';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const { fetchUserAddToCart ,token} = useContext(Context)
  const navigate = useNavigate()

  const fetchProductDetails = async () => {
    setLoading(true)
    const res = await axios.post('https://ecommerce-mern-application-server.onrender.com/api/product-details', { productId: params?.id }, {
      headers: { "content-type": "application/json" , Authorization:`Bearer ${token}`},
      withCredentials: true
    })
    setLoading(false)
    setData(res?.data?.data)
    setActiveImage(res?.data?.data?.productImage[0])
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id,token)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id,token)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container my-4'>
      <div className='d-flex flex-column flex-lg-row gap-4'>
        {/*** Product Image ***/}
        <div className='d-flex flex-column flex-lg-row-reverse gap-4'>
          <div className='bg-light p-2' style={{ height: '300px', width: '300px' }}>
            <img src={activeImage} className='w-100 h-100 object-fit-contain' alt="Product" />
          </div>

          <div className='d-flex gap-2 flex-column overflow-auto' style={{ maxHeight: '300px' }}>
            {
              loading ? (
                productImageListLoading.map((el, index) => (
                  <div className='bg-light rounded skeleton' style={{ height: '80px', width: '80px' }} key={"loadingImage" + index}></div>
                ))
              ) : (
                data?.productImage?.map((imgURL, index) => (
                  <div className='bg-light rounded p-1' style={{ height: '80px', width: '80px' }} key={imgURL}>
                    <img src={imgURL} className='w-100 h-100 object-fit-contain cursor-pointer' alt="Thumbnail" onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                  </div>
                ))
              )
            }
          </div>
        </div>

        {/*** Product Details ***/}
        <div className='flex-grow-1'>
          {
            loading ? (
              <div className='d-grid gap-2'>
                <div className='bg-light rounded skeleton' style={{ height: '24px' }}></div>
                <div className='bg-light rounded skeleton' style={{ height: '40px' }}></div>
                <div className='bg-light rounded skeleton' style={{ height: '24px' }}></div>
                <div className='bg-light rounded skeleton' style={{ height: '24px' }}></div>
                <div className='bg-light rounded skeleton' style={{ height: '40px' }}></div>
                <div className='d-flex gap-2'>
                  <div className='bg-light rounded skeleton' style={{ height: '40px', flexGrow: 1 }}></div>
                  <div className='bg-light rounded skeleton' style={{ height: '40px', flexGrow: 1 }}></div>
                </div>
                <div className='bg-light rounded skeleton' style={{ height: '120px' }}></div>
              </div>
            ) : (
              <div className='d-flex flex-column gap-2'>
                <span className='badge' style={{
                  backgroundColor: '#f8d7da', color: '#d9534f', padding: '0.5em 1em', borderRadius: '50px', display: 'inline-block',
                  width: 'fit-content',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>{data?.brandName}</span>
                <h2 className='display-6'>{data?.productName}</h2>
                <p className='text-muted'>{data?.category}</p>
                <div className='text-danger d-flex align-items-center gap-1'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>
                <div className='d-flex align-items-center gap-2'>
                  <h3 className='text-danger'>{displayINRCurrency(data.sellingPrice)}</h3>
                  <h5 className='text-muted text-decoration-line-through'>{displayINRCurrency(data.price)}</h5>
                </div>
                <div className='d-flex gap-3'>
                  <button className='btn btn-outline-danger' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
                  <button className='btn btn-danger' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                </div>
                <div>
                  <h5 className='text-muted'>Description:</h5>
                  <p>{data?.description}</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
      {
        data.category && (
          <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
        )
      }
    </div>
  )
}

export default ProductDetails