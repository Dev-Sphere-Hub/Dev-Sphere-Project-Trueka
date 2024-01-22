import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../../components/Loading'
import Carousel from '../../../components/carousel/Carousel'

const ReusableCarrusel = ({ titulo, productos }) => {
  const loading = useSelector((state) => state?.productsDb?.loading)
  return (
    <>
      {
      loading
        ? (
          <div className='d-flex justify-content-center align-items-center ' style={{ width: '100%', height: '370px' }}>
            <Loading />
          </div>
          )
        : (
            productos.length > 0
              ? (
                <section className='w-100 h-auto'>
                  <h2 className='tituoUserProds position-relative d-flex flex-row flex-nowrap align-items-center justify-content-between align-content-center mb-0' style={{ width: '100%', height: '40px', fontSize: '20px', fontFamily: 'var(--titulo)', color: 'var(--textosColor)' }}>
                    Publicaciónes de {titulo}
                  </h2>

                  <Carousel data={productos} />
                </section>
                )
              : (
                <div className='sinProductos' style={{ width: '100%' }}>
                  <h2 className='tituoUserProds position-relative d-flex flex-row flex-nowrap align-items-center justify-content-between align-content-center mb-0' style={{ width: '100%', height: '40px', fontSize: '20px', fontFamily: 'var(--titulo)', color: 'var(--textosColor)' }}>
                    Publicaciónes de {titulo}
                  </h2>
                  <section className='carruselSinProductos' style={{ width: '100%', height: '270px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>No se encontraron {titulo}</p>
                  </section>
                </div>
                )
          )
      }
    </>
  )
}

export default ReusableCarrusel
