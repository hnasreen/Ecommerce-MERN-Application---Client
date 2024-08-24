import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>

        <div className="bg-white shadow-lg rounded-3 p-4 mx-auto" style={{ maxWidth: '80rem' }}>
                <div className="d-inline-block ms-auto fs-2 text-dark" style={{ cursor: 'pointer', color: '#dc3545' }} onClick={onClose}>
                    <CgClose/>
                </div>


                <div className="d-flex justify-content-center p-4" style={{ maxWidth: '80vh', maxHeight: '80vh' }}>
                <img src={imgUrl} className='w-100 h-100'/>
                </div>
        </div>
  


    </div>
  )
}

export default DisplayImage