import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Context from '../context/index.js'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const {token} = useContext(Context)
    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const res = await axios.get("https://ecommerce-mern-application-server.onrender.com/api/get-categoryProduct", {
            header: { "content-type": "application/json" ,authorization: `Bearer ${token}`},
            withCredentials: true
        })
        setLoading(false)
        setCategoryProduct(res.data.data)
        // console.log("inside CategoryList Component res.data.data:", res.data.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='container py-4'>
            <div className='d-flex align-items-center gap-4 justify-content-between overflow-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {

                    loading ? (
                        categoryLoading.map((el, index) => {
                            return (
                                <div className='d-flex align-items-center justify-content-center rounded-circle'
                                    style={{
                                        height: '4rem',
                                        width: '4rem',
                                        backgroundColor: '#e2e8f0',
                                        animation: 'pulse 2s infinite'
                                    }}
                                    key={"categoryLoading" + index}>
                                </div>
                            )
                        })
                    ) :
                        (
                            categoryProduct.map((product, index) => {
                                return (
                                    <Link to={"/product-category?category=" + product?.category}
                                        className="text-decoration-none"
                                        style={{ cursor: 'pointer', color: 'inherit' }}
                                        key={product?.category}>
                                        <div className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: '4rem',
                                                height: '4rem',
                                                padding: '1rem',
                                                backgroundColor: '#e2e8f0', // Equivalent to bg-slate-200
                                                overflow: 'hidden',
                                                transition: 'transform 0.2s ease-in-out',
                                            }}>
                                            <img src={product?.productImage[0]} alt={product?.category} className="w-100"
                                                style={{
                                                    height: '100%',
                                                    objectFit: 'scale-down',
                                                    mixBlendMode: 'multiply',
                                                    transition: 'transform 0.2s ease-in-out',
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.25)')}
                                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                            />
                                        </div>
                                        <p className="text-center text-black text-capitalize fs-6" style={{ textDecoration: 'none' }}>{product?.category}</p>
                                    </Link>
                                )
                            })
                        )
                }
            </div>
        </div>
    )
}

export default CategoryList