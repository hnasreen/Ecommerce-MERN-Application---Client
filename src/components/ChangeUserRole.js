import React, { useState } from 'react';
import ROLE from '../common/Role';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';  // Import axios
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
        console.log(e.target.value);
    }

    const updateUserRole = async () => {
        const res = await axios.post("http://localhost:8080/api/update-user", { userId: userId, role: userRole }, {
            headers: { "content-type": "application/json" },
            withCredentials: true
        });

        if (res.data.success) {
            toast.success(res.data.message);
            onClose();
            callFunc();
        }

        console.log("role updated", res);
    }

    return (
        <div className='position-fixed top-0 bottom-0 start-0 end-0 w-100 h-100 z-index-10 d-flex justify-content-between align-items-center bg-secondary bg-opacity-50'>
            <div className='mx-auto bg-white shadow-sm p-3 w-100' style={{ maxWidth: '24rem' }}>

                <button className='d-block ms-auto' onClick={onClose}>
                    <IoMdClose size={24} />
                </button>

                <h1 className='pb-3 fs-4 fw-medium'>Change User Role</h1>

                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>

                <div className='d-flex align-items-center justify-content-between my-3'>
                    <p><strong>Role:</strong></p>
                    <select className='form-select p-2' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => (
                                <option value={el} key={el}>{el}</option>
                            ))
                        }
                    </select>
                </div>

                <button className='btn btn-danger rounded-pill px-3 py-1' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    )
}

export default ChangeUserRole;