import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../Helper/fetchCategoryWiseProduct'
import displayINRCurrency from '../Helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from "../Helper/AddToCart"
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    // const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
       <div className="container my-6 px-4 position-relative">
            <h2 className="h4 font-weight-semibold py-4">{heading}</h2>

            <div className="position-relative">
                <button
                    className="btn btn-light shadow rounded-circle position-absolute top-50 start-0 translate-middle-y d-none d-md-block"
                    onClick={scrollLeft}
                    style={{ zIndex: 1, left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className="btn btn-light shadow rounded-circle position-absolute top-50 end-0 translate-middle-y d-none d-md-block"
                    onClick={scrollRight}
                    style={{ zIndex: 1, right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                >
                    <FaAngleRight />
                </button>

                <div
                    className="d-flex flex-nowrap overflow-auto gap-4"
                    ref={scrollElement}
                    style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', gap: '16px' }}
                >
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div
                                key={index}
                                className="d-flex flex-column bg-white rounded shadow-sm"
                                style={{ minWidth: '280px', maxWidth: '280px', height: '400px' }}
                            >
                                <div
                                    className="bg-secondary d-flex justify-content-center align-items-center animate-pulse"
                                    style={{ height: '200px', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    {/* Placeholder for image */}
                                </div>
                                <div className="p-3 d-flex flex-column gap-2">
                                    <h2
                                        className="bg-secondary h-2 rounded-pill animate-pulse"
                                        style={{ width: '100%', backgroundColor: '#f8f9fa', borderRadius: '9999px', height: '0.5rem' }}
                                    ></h2>
                                    <p
                                        className="bg-secondary h-2 rounded-pill animate-pulse"
                                        style={{ width: '75%', backgroundColor: '#f8f9fa', borderRadius: '9999px', height: '0.5rem' }}
                                    ></p>
                                    <div className="d-flex gap-2">
                                        <p
                                            className="bg-secondary h-2 rounded-pill animate-pulse"
                                            style={{ width: '50%', backgroundColor: '#f8f9fa', borderRadius: '9999px', height: '0.5rem' }}
                                        ></p>
                                        <p
                                            className="bg-secondary h-2 rounded-pill animate-pulse"
                                            style={{ width: '50%', backgroundColor: '#f8f9fa', borderRadius: '9999px', height: '0.5rem' }}
                                        ></p>
                                    </div>
                                    <button className="btn btn-light animate-pulse" style={{ backgroundColor: '#f8f9fa' }}></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link
                                key={index}
                                to={"product/" + product?._id}
                                className="d-flex flex-column bg-white rounded shadow-sm text-decoration-none"
                                style={{ minWidth: '250px', maxWidth: '250px', height: '400px', overflow: 'hidden' }}
                            >
                                <div
                                    className="bg-secondary d-flex justify-content-center align-items-center"
                                    style={{ height: '150px', width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <img
                                        src={product.productImage[0]}
                                        className="img-fluid"
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                        alt={product?.productName}
                                    />
                                </div>
                                <div className="p-3 d-flex flex-column gap-2">
                                    <h2 className="text-truncate text-black d-flex justify-content-center align-items-center" style={{ color: '#000000', textOverflow: 'ellipsis' }}>{product?.productName}</h2>
                                    <p className="text-muted d-flex justify-content-center align-items-center" style={{ color: '#6c757d' }}>{product?.category}</p>
                                    <div className="d-flex gap-2 d-flex justify-content-center align-items-center">
                                        <p className="text-danger font-weight-bold" style={{ color: '#dc3545' }}>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className="text-muted text-decoration-line-through" style={{ color: '#6c757d', textDecoration: 'line-through' }}>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button
                                        className="btn btn-danger text-white"
                                        style={{ backgroundColor: '#dc3545', color: '#ffffff' }}
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerticalCardProduct;