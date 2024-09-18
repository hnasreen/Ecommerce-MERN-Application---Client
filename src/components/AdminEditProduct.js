import React, { useContext, useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../Helper/productCategory.js';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../Helper/UploadImage.js';
import DisplayImage from '../components/DisplayImage.js';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify'
import axios from 'axios';
import Context from '../context/index.js';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
}) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")
    const {token}= useContext(Context)


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })

    }


    {/**upload product */ }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await axios.post("https://ecommerce-mern-application-server.onrender.com/api/update-product", data, {
            headers: { "content-type": "application/json",Authorization: `Bearer ${token}` },
            withCredentials: true
        })

        console.log(res.data.success)

        if (res.data.success) {
            toast.success(res?.data?.message)
            onClose()
            fetchdata()
        }


        if (res.data.error) {
            toast.error(res?.data?.message)
        }
    }

    return (
        <div className='position-fixed w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-center bg-secondary bg-opacity-50'>
            <div className='bg-white p-4 rounded w-100 h-100 overflow-hidden' style={{ maxWidth: '42rem', maxHeight: '80%' }}>

                <div className='d-flex justify-content-between align-items-center pb-3'>
                    <h2 className='fw-bold fs-4'>Edit Product</h2>
                    <div className="ms-auto fs-3 text-dark"
                        style={{ cursor: 'pointer' }} onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='d-grid p-4 g-2 overflow-auto h-100 pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-light border rounded'
                        required
                    />


                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='enter brand name'
                        value={data.brandName}
                        name='brandName'
                        onChange={handleOnChange}
                        className='p-2 bg-light border rounded'
                        required
                    />

                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className="p-2 bg-light border rounded d-flex justify-content-center align-items-center h-100 w-100" style={{
                            height: '8rem',
                            cursor: 'pointer'
                        }}>
                            <div className="text-muted d-flex flex-column align-items-center justify-content-center"
                                style={{ gap: '0.5rem' }}>
                                <span style={{ fontSize: '2.5rem' }}><FaCloudUploadAlt /></span>
                                <p className='small'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='d-flex align-items-center g-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img
                                                        src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        style={{
                                                            backgroundColor: '#f8f9fa',
                                                            border: '1px solid #dee2e6',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                        }} />

                                                    <div className="absolute bottom-0 right-0 p-1 text-white bg-danger rounded-circle d-none group-hover:d-block"
                                                        style={{ cursor: 'pointer' }} onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p style={{ color: '#dc3545', fontSize: '0.75rem' }}>*Please upload product image</p>
                            )
                        }

                    </div>

                    <label htmlFor='price' className='mt-3'>Price :</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='enter price'
                        value={data.price}
                        name='price'
                        onChange={handleOnChange}
                        className='p-2 bg-light border rounded'
                        required
                    />


                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='enter selling price'
                        value={data.sellingPrice}
                        name='sellingPrice'
                        onChange={handleOnChange}
                        className='p-2 bg-light border rounded'
                        required
                    />

                    <label htmlFor='description' className='mt-3'>Description :</label>
                    <textarea
                        style={{ height: '7rem', resize: 'none' }}  // Inline style for height and resize
                        className="bg-light border p-1"
                        placeholder='enter product description'
                        rows={3}
                        onChange={handleOnChange}
                        name='description'
                        value={data.description}
                    >
                    </textarea>





                    <button className='btn btn-danger text-white mb-4 px-3 py-2' style={{ hover: { backgroundColor: '#c82333' } }}>Update Product</button>
                </form>




            </div>



            {/***display image full screen */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }


        </div>
    )
}

export default AdminEditProduct