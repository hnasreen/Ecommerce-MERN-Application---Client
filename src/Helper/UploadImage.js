import axios from 'axios';  // Import axios

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadImage  = async(image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_product")
    
    const dataResponse = await axios.post(url,formData,{
        // header: { "content-type": "application/json" },
        // withCredentials: true
      })

    console.log("Uplload Image",dataResponse.data);
    return dataResponse.data;

}

export default uploadImage