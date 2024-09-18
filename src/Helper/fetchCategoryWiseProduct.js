import axios from 'axios'
// import { useContext } from 'react'
// import Context from '../context/index.js'

const fetchCategoryWiseProduct = async(category,token)=>{
    // const {token}=useContext(Context)
    const res = await axios.post("https://ecommerce-mern-application-server.onrender.com/api/category-product", {category : category}, {
        header: { "content-type": "application/json" ,authorization:`Bearer ${token}`},
        withCredentials: true
    })

    return res.data
}

export default fetchCategoryWiseProduct

