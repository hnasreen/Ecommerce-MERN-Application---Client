import axios from 'axios'
// import { useContext } from 'react'
// import Context from '../context/index.js'

const fetchCategoryWiseProduct = async(category,token)=>{
    // const {token}=useContext(Context)
    const res = await axios.post("https://ecommerce-mern-application-server.onrender.com/api/category-product", {category : category}, {
        headers: { "content-type": "application/json" ,Authorization:`Bearer ${token}`},
        withCredentials: true
    })

    return res.data
}

export default fetchCategoryWiseProduct

