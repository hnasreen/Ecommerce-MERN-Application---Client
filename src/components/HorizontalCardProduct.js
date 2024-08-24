import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../Helper/fetchCategoryWiseProduct'
import displayINRCurrency from '../Helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Context from '../context'
import '../components/HorizontalCardProduct.css'
import addToCart from '../Helper/AddToCart'

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    // const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    return (
        <div className="container my-4 position-relative">
            <h2 className="h4 font-weight-semibold py-3">{heading}</h2>

            <div className="d-flex align-items-center gap-3 gap-md-4 overflow-hidden position-relative">
                <button className="bg-white shadow rounded-circle p-2 position-absolute start-0 d-none d-md-block" onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className="bg-white shadow rounded-circle p-2 position-absolute end-0 d-none d-md-block" onClick={scrollRight}>
                    <FaAngleRight />
                </button>

                <div className="d-flex overflow-x-auto gap-3" ref={scrollElement} style={{ padding: '10px' }}>
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className="product-card d-flex text-decoration-none shadow-lg" style={{ flex: '0 0 320px', minWidth: '320px' }}>
                                <div className="bg-light h-100 p-3" style={{ flex: '0 0 40%' }}></div>
                                <div className="p-3 d-grid gap-2" style={{ flex: '0 0 60%' }}>
                                    <h2 className="font-weight-medium h6 text-truncate text-black bg-light animate-pulse p-1 rounded-pill"></h2>
                                    <p className="text-capitalize text-muted p-1 bg-light animate-pulse rounded-pill"></p>
                                    <div className="d-flex gap-2 w-100">
                                        <p className="text-danger font-weight-medium p-1 bg-light w-100 animate-pulse rounded-pill"></p>
                                        <p className="text-muted text-decoration-line-through p-1 bg-light w-100 animate-pulse rounded-pill"></p>
                                    </div>
                                    <button className="btn btn-sm text-white w-100 bg-light animate-pulse rounded-pill"></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link key={index} to={"product/" + product?._id} className="product-card d-flex text-decoration-none shadow-lg" style={{ flex: '0 0 320px', minWidth: '320px' }}>
                                <div className="bg-light h-100" style={{ flex: '0 0 30%' }}>
                                    <img src={product.productImage[0]} className="img-fluid h-100 object-fit-cover img-hover-effect" alt={product?.productName} />
                                </div>
                                <div className="p-3 d-grid" style={{ flex: '0 0 70%' }}>
                                    <h2 className="font-weight-medium h6 text-truncate text-black">{product?.productName}</h2>
                                    <p className="text-capitalize text-muted text-truncate">{product?.category}</p>
                                    <div className="d-flex gap-2">
                                        <p className="text-danger font-weight-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className="text-muted text-decoration-line-through">{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className="btn btn-sm btn-danger text-white w-100 rounded-pill" onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default HorizontalCardProduct