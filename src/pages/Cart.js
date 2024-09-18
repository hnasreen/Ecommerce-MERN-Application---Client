import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/index.js'
import displayINRCurrency from '../Helper/displayCurrency.js'
import { MdDelete } from "react-icons/md";
import axios from 'axios';  // Import axios

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)
    const {token}=useContext(Context)

    const fetchData = async () => {
        const res = await axios.get("https://ecommerce-mern-application-server.onrender.com/api/view-card-product", {
            header: { "content-type": "application/json" ,authorization:`Bearer ${token}`},
            withCredentials: true
        })

        if (res?.data?.success) {
            setData(res?.data?.data)
        }
    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    const increaseQty = async (id, qty) => {
        const res = await axios.post('https://ecommerce-mern-application-server.onrender.com/api/update-cart-product',
            {
                _id: id,
                quantity: qty + 1
            },
            {
                header: { "content-type": "application/json" },
                withCredentials: true
            })

        if (res.data.success) {
            fetchData()
        }
    }

    const decraseQty = async (id, qty) => {
        if (qty >= 2) {
            const res = await axios.post('https://ecommerce-mern-application-server.onrender.com/api/update-cart-product',
                {
                    _id: id,
                    quantity: qty - 1
                },
                {
                    header: { "content-type": "application/json" },
                    withCredentials: true
                })

            if (res.data.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const res = await axios.post('https://ecommerce-mern-application-server.onrender.com/api/delete-cart-product',
            {
                _id: id
            },
            {
                header: { "content-type": "application/json" },
                withCredentials: true
            })

        if (res.data.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )}
            </div>

            <div className='d-flex flex-column flex-lg-row gap-4 justify-content-between p-4'>
                {/***view product */}
                <div className='w-100'>
                    {loading ? (
                        loadingCart?.map((el, index) => (
                            <div key={el + "Add To Cart Loading" + index} className='w-100 bg-light h-32 my-2 border border-secondary animate-pulse rounded'>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <div key={product?._id + "Add To Cart Loading"} className='w-100 bg-white h-32 my-2 border border-secondary rounded d-flex'>
                                <div className='w-50' style={{ height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                    <img src={product?.productId?.productImage[0]} 
                                         alt={product?.productId?.productName} 
                                         style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                                    />
                                </div>
                                <div className='w-50 px-4 py-2 position-relative'>
                                    {/**delete product */}
                                    <div className='position-absolute end-0 text-danger rounded-circle p-2' style={{
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s, color 0.3s', // Smooth transition
                                    }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#dc3545'; // Bootstrap's danger color
                                            e.target.style.color = '#ffffff'; // White color
                                            e.target.style.setProperty('color', '#ffffff', 'important');
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent'; // Reset background
                                            e.target.style.color = '#dc3545'; // Reset text color
                                        }} onClick={() => deleteCartProduct(product?._id)}>
                                        <MdDelete />
                                    </div>

                                    <h2 className='fs-5 text-ellipsis'>{product?.productId?.productName}</h2>
                                    <p className='text-muted'>{product?.productId.category}</p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='text-danger fw-medium fs-5'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className='text-muted fw-semibold fs-5'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                    </div>
                                    <div className='d-flex align-items-center gap-2 mt-1'>
                                        <button className='btn border border-danger text-danger w-25' style={{
                                            transition: "background-color 0.3s, color 0.3s",
                                        }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = "#dc3545";
                                                e.target.style.color = "#ffffff";
                                                e.target.style.setProperty('color', '#ffffff', 'important');
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = "transparent";
                                                e.target.style.color = "#dc3545";
                                            }} onClick={() => decraseQty(product?._id, product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='btn border border-danger text-danger w-25' style={{
                                            transition: "background-color 0.3s, color 0.3s",
                                        }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = "#dc3545";
                                                e.target.style.color = "#ffffff";
                                                e.target.style.setProperty('color', '#ffffff', 'important');
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = "transparent";
                                                e.target.style.color = "#dc3545";
                                            }}
                                            onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/***summary  */}
                <div className='mt-5 mt-lg-0 w-100 max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-light border border-secondary animate-pulse'>
                        </div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-danger px-4 py-1'>Summary</h2>
                            <div className='d-flex justify-content-between px-4 gap-2 fw-medium fs-5 text-muted'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='d-flex justify-content-between px-4 gap-2 fw-medium fs-5 text-muted'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <button className='btn btn-primary w-100 mt-2'>Payment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
