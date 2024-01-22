import LocationSVG from '../LocationSVG'
import LocationSVGMobile from '../LocationSVGMobile'
import './cardOffer.css'

function CardOffer ({ products }) {
  return (
    <>
      {products?.map((product, i) => (

        <div className='offer-card-container' key={i}>
          <div className='container-card'>
            <div className='img-container '>
              <img src={product?.images} className='card-img-top' alt='product-image' />
            </div>
            <div className='card-grid'>
              <p className='text-card'>{product?.name}</p>
              {product?.location && (
                <>
                  <div className='location-container'>
                    <div id='desktop-svg'>
                      <LocationSVG />
                    </div>
                    <div id='mobile-svg'>
                      <LocationSVGMobile />
                    </div>
                    <div className='text-container'>
                      <p className='ubi-text'>{product?.location}</p>
                    </div>

                  </div>
                </>
              )}

            </div>
          </div>
        </div>

      ))}

    </>
  )
}

export default CardOffer
