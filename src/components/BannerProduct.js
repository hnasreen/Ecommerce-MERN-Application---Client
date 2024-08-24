import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className="position-relative w-100"
                style={{
                    height: '14rem', // Height for default screens
                    backgroundColor: '#e2e8f0' // Background color
                }}>

                <div className='position-absolute top-50 start-0 w-100 d-none d-flex d-md-flex justify-content-between align-items-center' style={{ zIndex: 10 }}>
                    {/* <div className='d-flex justify-content-between w-100 fs-3'> */}
                        <button onClick={preveImage} className='btn btn-light shadow rounded-circle p-2'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='btn btn-light shadow rounded-circle p-2'><FaAngleRight /></button>
                    {/* </div>   */}
                </div>

                {/**desktop and tablet version */}
                <div className='position-relative h-100 w-100 overflow-hidden'>
                <div className='position-absolute top-0 start-0 w-100 h-100 d-flex' style={{ transition: 'transform 0.3s ease-in-out', transform: `translateX(-${currentImage * 100}%)` }}>
                    {
                        desktopImages.map((imageURl, index) => {
                            return (
                                <div className='w-100 h-100 flex-shrink-0' key={imageURl} >
                                    <img src={imageURl}  alt={`Slide ${index}`} className='w-100 h-100 object-cover'  />
                                </div>
                            )
                        })
                    }
                </div>
                </div>

                {/**mobile version */}
                <div className='d-flex h-100 w-100 overflow-hidden d-md-none'>
                {
                        mobileImages.map((imageURl,index)=>{
                            return(
                            <div key={imageURl} className='w-100 h-100 flex-shrink-0' style={{ transform: `translateX(-${currentImage * 100}%)`, transition: 'transform 0.3s ease-in-out' }}>
                                <img src={imageURl} className='w-100 h-100 object-cover'/>
                            </div>
                            )
                        })
                }
              </div>


            </div>
        </div>
    )
}

export default BannerProduct