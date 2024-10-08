import React, { useContext } from 'react';
import ScrollTop from '../Helper/ScrollTop.js';
import displayINRCurrency from '../Helper/displayCurrency.js';
import Context from '../context/index.js';
import addToCart from '../Helper/AddToCart.js';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart,token } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id,token);
    fetchUserAddToCart();
  };

  return (
    <div className="d-flex justify-content-between flex-wrap gap-3">
      {loading ? (
        loadingList.map((_, index) => (
          <div
            className="card shadow-sm"
            style={{ width: '18rem' }}
            key={index}
          >
            <div className="card-body text-center">
              <div className="bg-light h-48 d-flex justify-content-center align-items-center animate-pulse">
              </div>
              <div className="mt-3">
                <h5 className="card-title text-muted bg-light p-2 rounded animate-pulse"></h5>
                <p className="card-text text-muted bg-light p-2 rounded animate-pulse"></p>
                <div className="d-flex justify-content-around">
                  <span className="text-danger bg-light p-2 rounded animate-pulse"></span>
                  <span className="text-muted bg-light p-2 rounded animate-pulse"></span>
                </div>
                <button className="btn btn-outline-danger btn-sm w-100 mt-3 animate-pulse"></button>
              </div>
            </div>
          </div>
        ))
      ) : (
        data.map((product, index) => (
          <Link
            to={`/product/${product?._id}`}
            className="card shadow-sm text-center text-decoration-none"
            style={{ width: '18rem' }}
            key={index}
            onClick={ScrollTop}
          >
            <div className="card-body">
              <div
                className="bg-light d-flex justify-content-center align-items-center"
                style={{ height: '12rem', overflow: 'hidden' }}
              >
                <img
                  src={product?.productImage[0]}
                  className="img-fluid"
                  alt={product.productName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ensures image covers the container without stretching
                  }}
                />
              </div>
              <div className="mt-3">
                <h5 className="card-title">{product?.productName}</h5>
                <p className="card-text text-muted">{product?.category}</p>
                <div className="d-flex justify-content-around">
                  <span className="text-danger">{displayINRCurrency(product?.sellingPrice)}</span>
                  <span className="text-muted text-decoration-line-through">{displayINRCurrency(product?.price)}</span>
                </div>
                <button
                  className="btn btn-danger btn-sm w-100 mt-3"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default VerticalCard;
