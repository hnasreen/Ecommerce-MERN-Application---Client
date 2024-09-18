import React, { useContext, useState } from 'react';
import axios from 'axios';  // Import axios
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context/index.js';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const {setToken, fetchUserDetails,fetchUserAddToCart} = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Using axios for the API call
            const res = await axios.post('https://ecommerce-mern-application-server.onrender.com/api/login', 
                {
                email: data.email,
                password: data.password
                },
                {headers:{"content-type":"application/json"},
                withCredentials:true})

            

            if (res.data.success) {
                toast.success(res.data.message);
                // console.log(res.data.data)
                localStorage.setItem("token",res.data.data)
                setToken(res.data.data);
                fetchUserDetails();
                fetchUserAddToCart();
                navigate('/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred during login.");
        }
    };

    // console.log("data login", data);

    return (
        <section id='login'>
            <div className='container p-4 mx-auto'>

                <div className='card p-4 mx-auto' style={{ maxWidth: '400px' }}>
                    <div className='text-center mb-4'>
                        {/* <img src={loginIcons} alt='login icons' className='img-fluid' style={{ width: '80px', height: '80px', backgroundColor:'#F8D7D1' }} /> */}
                        <h3 className="custom-heading mb-4" style={{ fontSize:'2.5rem',color: '#E76F6F', maxWidth: '400px' }}>Welcome Back!</h3>
                    </div>

                    <form className='pt-4' onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Email:</label>
                            <div className='input-group'>
                                <input 
                                    type='email' 
                                    placeholder='Enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='form-control'
                                    autoComplete='email'
                                    />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Password:</label>
                            <div className='input-group'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Enter password'
                                    value={data.password}
                                    name='password' 
                                    onChange={handleOnChange}
                                    className='form-control'
                                    autoComplete="password"
                                    />
                                <button 
                                    type="button"
                                    className='btn btn-secondary'
                                    onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <Link to={'/forgot-password'} className='d-block text-end text-danger mt-2'>
                                Forgot password?
                            </Link>
                        </div>

                        <button className='btn w-100 mt-3' style={{ backgroundColor: '#FEB5AD' }}>Login</button>
                    </form>

                    <p className='mt-4 text-center'>
                        Don't have an account? <Link to={"/sign-up"} className='text-danger'>Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;