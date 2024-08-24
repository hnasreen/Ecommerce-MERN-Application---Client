import React, { useState } from 'react';
// import loginIcons from '../assets/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import axios from 'axios'
// import imageTobase64 from '../helpers/imageTobase64';
// import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        // console.log("name:", e.target.name,"Value:", e.target.value)
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
          if (data.password === data.confirmPassword) {
            try {
              const res = await axios.post('http://localhost:8080/api/register', 
                {
                name: data.name,
                email: data.email,
                password: data.password
                })

            //   const dataApi = await res.json();

            console.log(res.data);

              if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
              } else if (res.data.error) {
                toast.error(res.data.message);
              }
            } catch (error) {
              toast.error('An error occurred while signing up.');
            }
          } else {
            toast.error("Please check password and confirm password");
          }
    };

    return (
        <section id='signup' className='py-4'>
            <div className='container'>
                <div className='bg-white p-5 mx-auto shadow rounded' style={{ maxWidth: '400px' }}>
                    <div className='text-center mb-4'>
                        <div className='position-relative d-inline-block'>
                            <div>
                                <h5 className="position-absolute bottom-0 start-50 translate-middle-x" style={{ width: '150px', height: '40px',paddingTop:'9px',color:'#E76F6F',fontWeight:"bolder"}} >
                                <MdOutlineShoppingCart />Ecommerce App!
                                </h5>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label'>Name</label>
                            <input
                                type='text'
                                id='name'
                                placeholder='Enter your name'
                                name='name'
                                value={data.name}
                                onChange={handleOnChange}
                                required
                                className='form-control'
                                autoComplete='new-password' 
                                
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='Enter email'
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                required
                                className='form-control'
                                autoComplete='new-password' 
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <div className='input-group'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id='password'
                                    placeholder='Enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                    className='form-control'
                                    autoComplete='new-password' 
                                />
                                <span className='input-group-text cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                            <div className='input-group'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id='confirmPassword'
                                    placeholder='Enter confirm password'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                    className='form-control'
                                    autoComplete='new-password' 
                                />
                                <span className='input-group-text cursor-pointer' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <button type='submit' className='btn w-100' style={{backgroundColor:"#FEB5AC"}}>
                            Sign Up
                        </button>
                    </form>
                    <p className='text-center mt-3'>
                        Already have an account? <Link to="/login" className='text-danger'>Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SignUp;