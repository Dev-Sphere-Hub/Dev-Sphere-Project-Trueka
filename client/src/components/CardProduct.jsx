/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import { Link } from 'react-router-dom'
import '../components/CardProduct.css'
import LocationSVG from './LocationSVG'
import LocationSVGMobile from './LocationSVGMobile'
import { useEffect } from 'react'

export default function CardProduct (products) {
  const handleInfo = (value) => {
    localStorage.setItem('geo', JSON.stringify(value.geolocation))
  }

  const currentPath = window.location.pathname.startsWith('/ofertar/')

  return (
    <>
      {currentPath
        ? (<>
          {products.props.map((product, i) => (

              <div className='container-card' key={i}>
                <div className='img-container '>
                  <img src={product.images} className='card-img-top' alt='product-image' />
                </div>
                <div className='card-grid'>
                  <p className='text-card'>{product.name}</p>
                  <div className='location-container'>
                    <div id='desktop-svg'>
                      <LocationSVG />
                    </div>
                    <div id='mobile-svg'>
                      <LocationSVGMobile />
                    </div>
                    <div className='text-container'>
                      <p className='ubi-text'>{product.location}</p>
                    </div>

                  </div>

                </div>
              </div>
          ))}
        </>)
        : (<>
          {products.props.map((product, i) => (
            <Link to={`/detalle/${product._id}/${product.owner}`} className='card-link' key={i} onClick={() => handleInfo(product)}>

              <div className='container-card'>
                <div className='img-container '>
                  <img src={product.images} className='card-img-top' alt='product-image' />
                </div>
                <div className='card-grid'>
                  <p className='text-card'>{product.name}</p>
                  <div className='location-container'>
                    <div id='desktop-svg'>
                      <LocationSVG />
                    </div>
                    <div id='mobile-svg'>
                      <LocationSVGMobile />
                    </div>
                    <div className='text-container'>
                      <p className='ubi-text'>{product.location}</p>
                    </div>

                  </div>

                </div>
              </div>
            </Link>
          ))}
           </>)}

    </>
  )
}
