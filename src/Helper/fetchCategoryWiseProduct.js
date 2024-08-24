import axios from 'axios'

const fetchCategoryWiseProduct = async(category)=>{
    const res = await axios.post("http://localhost:8080/api/category-product", {category : category}, {
        header: { "content-type": "application/json" },
        withCredentials: true
    })

    return res.data
}

export default fetchCategoryWiseProduct