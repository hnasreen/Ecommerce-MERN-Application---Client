import axios from 'axios'

const fetchCategoryWiseProduct = async(category)=>{
    const res = await axios.post("https://ecommerce-mern-application-server.onrender.com/api/category-product", {category : category}, {
        header: { "content-type": "application/json" },
        withCredentials: true
    })

    return res.data
}

export default fetchCategoryWiseProduct