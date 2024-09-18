import { toast } from 'react-toastify'
import axios from 'axios'
import { useContext } from 'react'
import Context from '../context/index.js'

const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()
    const {token} = useContext(Context)

    const res = await axios.post("https://ecommerce-mern-application-server.onrender.com/api/addtocart", { productId : id }, {
        header: { "content-type": "application/json" , authorization:`Bearer ${token}`},
        withCredentials: true
    })


    if(res?.data?.success){
        toast.success(res.data.message)
    }

    if(res?.data?.error){
        toast.error(res.data.message)
    }


    return res?.data?.data

}


export default addToCart