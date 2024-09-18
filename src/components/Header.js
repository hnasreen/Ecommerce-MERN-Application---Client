import React, { useContext, useState } from 'react'
import { NavLink, Link, useNavigate,useLocation } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import './Header.css'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';  // Import axios
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/Role';
import { FaRegCircleUser } from 'react-icons/fa6';
import Context from '../context';


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  // console.log("Header Component - User data: ",user.data.name)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()

  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const res = await axios.get("https://ecommerce-mern-application-server.onrender.com/api/logout", {
      header: { "content-type": "application/json" },
      withCredentials: true
    })

    console.log("Header Logout function:", res)

    if (res.data.success) {
      toast.success(res.data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (res.data.error) {
      toast.error(res.data.message)
    }

  }

  const handleAdminPanelClick = () => {
    setMenuDisplay(false); // Close the menu
    navigate('/admin-panel/all-products'); // Redirect to the admin panel
  };

  const toggleMenuDisplay = () => {
    setMenuDisplay(prevState => !prevState); // Toggle the dropdown menu display
  };


  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#F9B7B2', zIndex: 1030 }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <Link to="/" className="navbar-brand d-flex align-items-center" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            <MdOutlineShoppingCart />Ecommerce App
          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {/* Centered search box */}
            <div className="mx-auto d-flex align-items-center" style={{ width: '700px' }}>
              <input type="text" className="form-control" placeholder='Search product here...' onChange={handleSearch} value={search}/>
              <CiSearch className="ms-2" style={{ fontSize: '24px', height: '100%' }} />
            </div>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown" style={{ display: 'flex', alignItems: 'center' }}>
                {/* Display icon when user is not logged in */}
                {!user?.data?._id && (
                  <div className="nav-item">
                    <FaRegCircleUser
                      style={{ color: '#FFFFFF', fontSize: '24px', cursor: 'pointer' }}
                    />
                  </div>
                )}

                {/* Display Hello, username! when user is logged in */}
                {user?.data?._id && (
                  <div className="nav-item dropdown" style={{ position: 'relative' }}>
                    <div
                      className="nav-link dropdown-toggle"
                      style={{ color: '#FFFFFF', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(178, 34, 34, 0.7)', cursor: 'pointer' }}
                      onClick={() => setMenuDisplay(prev => !prev)}
                      aria-expanded={menuDisplay}
                    >
                      {`Hello, ${user?.data?.name}!`}
                    </div>

                    {menuDisplay && user?.data?.role === ROLE.ADMIN && (
                      <ul className="dropdown-menu dropdown-menu-end show" style={{ top: '100%', right: 0 }}>
                        <li>
                          <button className="dropdown-item" onClick={handleAdminPanelClick}>
                            Admin Panel
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </li>
              {
                user?.data?._id && (
                  <li className="nav-item">
                    <NavLink to="/cart" className="nav-link" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Cart <span style={{
                      backgroundColor: '#FFF3CD',
                      color: '#F9B7B2',
                      padding: '0.2em 0.6em',
                      borderRadius: '50%',
                      marginLeft: '0.5em',
                      display: 'inline-block',
                      textAlign: 'center'
                    }}>{context?.cartProductCount}</span></NavLink>
                  </li>
                )}
              {!user?.data?._id && (
                <li className="nav-item">
                  <NavLink to="/sign-up" className="nav-link" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Register</NavLink>
                </li>
              )}
              <li>
                {
                  user?.data?._id ? (
                    <button onClick={handleLogout} className="btn btn-danger rounded-pill px-3 py-1 mt-1">Logout</button>
                  )
                    : (
                      <Link to={"/login"} className='btn btn-danger rounded-pill px-3 py-1'>Login</Link>
                    )
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ height: '50px' }}></div>
    </>
  )
}

export default Header