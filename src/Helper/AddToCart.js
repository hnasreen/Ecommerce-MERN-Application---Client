import { toast } from 'react-toastify'
import axios from 'axios'

const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()


    const res = await axios.post("http://localhost:8080/api/addtocart", { productId : id }, {
        header: { "content-type": "application/json" },
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