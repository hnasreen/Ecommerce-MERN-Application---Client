import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import ROLE from '../common/Role.js';
import { FaUserCircle } from "react-icons/fa";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.data?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar */}
            <div className="bg-white min-vh-100 w-25 p-3 shadow">
                <div className="d-flex flex-column align-items-center mb-4">
                    <div className="text-primary mb-2">
                        <FaUserCircle style={{ fontSize: '3rem', backgroundColor: 'grey', color: 'white' }} />
                    </div>
                    <p className="fw-semibold">{user?.data?.name}</p>
                    <p className="text-muted">{user?.data?.role}</p>
                </div>

                {/* Navigation */}
                <nav className="nav flex-column">
                    <Link to={"all-users"} className="nav-link py-2 px-3 mb-1 rounded text-dark bg-info-subtlet border border-dark hover:bg-secondary hover text-black">
                        All Users
                    </Link>
                    <Link to={"all-products"} className="nav-link py-2 px-3 mb-1 rounded text-dark bg-info-subtlet border border-dark hover:bg-secondary hover text-black">
                        All Products
                    </Link>
                </nav>

            </div>

            {/* Main Content */}
            <main className="w-100 h-100 p-2">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminPanel;