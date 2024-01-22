import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import CardProduct from '../components/CardProduct'
import Loading from '../components/Loading'
import { getProducts } from '../features/productsSlice/productSlice'
import '../pages/styles/Home.css'
import Carousel from '../components/carousel/Carousel'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaTimesCircle, FaFilter } from 'react-icons/fa'

function Home () {
  const products = useSelector((state) => state?.productsDb?.products)
  const loading = useSelector((state) => state?.productsDb?.loading)
  const results = useSelector((state) => state?.productsDb?.searchResults)
  // console.log(products, 'estas son las results')
  const latest = [...products].reverse().slice(0, 12)
  const location = useSelector((state) => state?.location)
  const dispatch = useDispatch()
  const [nearbyProducts, setNearbyProducts] = useState([])
  const [filterKilometers, setFilterKilometers] = useState(10)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleKilometersChange = (event) => {
    setFilterKilometers(event.target.value)
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  const gridTemplateColumns =
    results.length < 6
      ? 'repeat(auto-fit, minmax(170px, 200px))'
      : 'repeat(auto-fit, minmax(190px, 0.4fr))'

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const handleFilterSubmit = (event) => {
    event.preventDefault()
    if (location.latitude && location.longitude) {
      const nearbyProducts = products.filter((product) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          product.geolocation.lat,
          product.geolocation.lon
        )
        return distance <= filterKilometers
      })
      setNearbyProducts(nearbyProducts)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleClearFilter = () => {
    setNearbyProducts([])
  }

  const filteredProducts = results.length > 0 ? results : nearbyProducts.length > 0 ? nearbyProducts : products

  return (
    <>
      <div className='centrar-filtro'>
        <button onClick={handleOpenModal} className='filter-icon icon'>
          <FaFilter className='filter-icon' />
        </button>
        <p className='parrafo-distancia'>Filtro por Distancia. </p>
      </div>

      <div className={`modal ${isModalOpen ? 'open' : ''}`}>
        <div className='modal-container'>
          <div className='modal-content'>
            <form className='distance-filter-container' onSubmit={handleFilterSubmit}>
              <label htmlFor='filterKilometers'>Filtrar por kilómetros:</label>
              <input
                type='range'
                id='filterKilometers'
                name='filterKilometers'
                value={filterKilometers}
                min={0}
                max={1000}
                step={3}
                onChange={handleKilometersChange}
              />
              <span>{filterKilometers} km</span>
              <div className='button-container'>
                <button type='submit'>
                  <FaCheckCircle className='iconButton' />
                </button>
                <button type='button' onClick={handleClearFilter}>
                  <FaTimesCircle className='iconButton' />
                </button>
              </div>
            </form>
            <button className='close-button' onClick={handleCloseModal}>
              <FaTimesCircle className='iconClose' />
            </button>
          </div>
        </div>
      </div>
      {loading
        ? (
          <div className='loading-container'>
            <Loading />
          </div>
          )
        : filteredProducts
          ? (
            <div className='controlar-home-container'>
              <div className='home-container'>
                <div className='carousel-rows-container'>
                  <div className='p-carousel-container'>
                    <div className='title-and-more-container'>
                      <p className='carousel-title'>Publicaciones populares</p>
                      <Link>
                        <p className='view-more-p'>Ver mas</p>
                      </Link>
                    </div>
                    <Carousel data={filteredProducts} />
                  </div>
                  <div className='p-carousel-container'>
                    <div className='title-and-more-container'>
                      <p className='carousel-title'>Publicaciones que seguís</p>
                      <Link>
                        <p className='view-more-p'>Ver mas</p>
                      </Link>
                    </div>
                    <Carousel data={filteredProducts} />
                  </div>
                </div>
              </div>
            </div>
            )
          : products !== 'none'
            ? (
              <>
                <div className='home-container'>
                  {products.length > 0
                    ? (
                      <div className='products-container' style={{ gridTemplateColumns }}>
                        <CardProduct className='products-list' props={nearbyProducts} />
                      </div>
                      )
                    : (
                      <div className='home-container carousel-title'>No se encontraron resultados</div>
                      )}
                </div>
              </>
              )
            : (
              <div className='home-container carousel-title'>No se encontraron resultados</div>
              )}
    </>
  )
}

export default Home
