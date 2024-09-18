import {createBrowserRouter} from 'react-router-dom'
import App from '../App.js'
import Home from '../pages/Home.js'
import Login from '../pages/Login.js'
import Forgotpassword from '../pages/Forgotpassword.js'
import SignUp from '../pages/SignUp.js'
import AdminPanel from '../pages/AdminPanel.js'
import AllUsers from '../pages/AllUsers.js'
import AllProducts from '../pages/AllProducts.js'
import CategoryProduct from '../pages/CategoryProduct.js'
import ProductDetails from '../pages/ProductDetails.js'
import Cart from '../pages/Cart.js'
import SearchProduct from '../pages/SearchProduct.js'

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path:"forgot-password",
                element:<Forgotpassword/>
            },
            {
                path:"sign-up",
                element:<SignUp/>
            },
            {
                path:"product-category",
                element:<CategoryProduct/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>
            },
            {
                path:"cart",
                element:<Cart/>
            },
            {
                path:"search",
                element:<SearchProduct/> 
            },
            {
                path:"admin-panel",
                element:<AdminPanel/>,
                children:[
                    {
                        path:'all-users',
                        element:<AllUsers/>
                    },
                    {
                        path:'all-products',
                        element:<AllProducts/>
                    }
                ]
            }
        ]
    }
])

export default router 