// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/bundle'

import './styles/publicationCarousel2.css'

// import required modules
// import { Pagination } from 'swiper/modules'
function PBCarousel ({ data }) {
  return (
    <>
      <div className='carousel-div-ctnr'>
        <Swiper
          slidesPerView='auto'
          spaceBetween={8}
          pagination={{
            clickable: true
          }}
          // modules={Pagination}
          className='mySwiper'
        >
          {data.map((image, i) => (
            <SwiperSlide className='swiper-uploaded-image' key={i}>
              <div className='carousel-image'>
                <img src={URL.createObjectURL(image)} alt='product-image' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </>
  )
}

export default PBCarousel
