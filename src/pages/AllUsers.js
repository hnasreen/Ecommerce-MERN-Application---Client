import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import axios from 'axios';  // Import axios
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })

    const fetchAllUsers = async() =>{
        const res = await axios.get("http://localhost:8080/api/all-users", {
            header: { "content-type": "application/json" },
            withCredentials: true
          })

          console.log("AllUsers - data:",res.data.data)

        if(res.data.success){
            setAllUsers(res.data.data)
        }

        if(res.data.error){
            toast.error(res.data.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='bg-white pb-4'>
        <table className='table table-striped table-bordered userTable'>
            <thead>
                <tr className='bg-black text-white'>
                <th scope="col" className="text-center align-middle">S.No</th>
                <th scope="col" className="text-center align-middle">Name</th>
                <th scope="col" className="text-center align-middle">Email</th>
                <th scope="col" className="text-center align-middle">Role</th>
                <th scope="col" className="text-center align-middle">Created Date</th>
                <th scope="col" className="text-center align-middle">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUser.map((el,index) => (
                            <tr key = {index}>
                                <td className="text-center align-middle">{index+1}</td>
                                <td className="text-center align-middle">{el?.name}</td>
                                <td className="text-center align-middle">{el?.email}</td>
                                <td className="text-center align-middle">{el?.role}</td>
                                <td className="text-center align-middle">{moment(el?.createdAt).format('LL')}</td>
                                <td className="text-center align-middle">
                                    <button className='btn btn-outline-success rounded-circle p-2' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)

                                    }}
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                    ))
                        
                    }
                
            </tbody>
        </table>
        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )      
        }
    </div>
  )
}

export default AllUsers