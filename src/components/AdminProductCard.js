import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from '../components/AdminEditProduct.js';
import displayINRCurrency from '../Helper/displayCurrency.js';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-light p-2 rounded'>
      <div style={{ width: '8rem' }}>
        <div
          style={{ width: '8rem', height: '8rem', overflow: 'hidden' }}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={data?.productImage[0]}
            className="img-fluid"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Ensures the entire image is visible within the container
            }}
            alt={data?.productName}
          />
        </div>
        <h1 className="text-truncate"
          style={{
            fontSize: '1.25rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>{data.productName}</h1>

        <div>
          <p className='fw-semibold'>
            {displayINRCurrency(data.sellingPrice)}
          </p>

          <div className="ms-auto rounded-pill"
            style={{
              padding: '0.5rem', // equivalent to p-2
              backgroundColor: 'rgba(25, 135, 84, 0.25)', // equivalent to bg-green-100
              width: 'fit-content', // equivalent to w-fit
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease' // smooth transition for hover effect
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#198754'; // hover:bg-green-600
              e.currentTarget.style.color = '#fff'; // hover:text-white
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(25, 135, 84, 0.25)'; // revert to bg-green-100
              e.currentTarget.style.color = ''; // revert text color
            }}
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
      )}
    </div>
  );
}

export default AdminProductCard;
