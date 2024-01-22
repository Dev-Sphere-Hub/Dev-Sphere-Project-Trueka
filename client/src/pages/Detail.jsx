/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import MapView from '../components/MapView/MapView'
import './Detalle.css'

// import Estrellas from './Perfil/Estrellas'
// import PerfilUser from './Perfil/PerfilUser'
/* Redux toolkit imports */
import { useDispatch, useSelector } from 'react-redux'
import { clearUserById, getUserById } from '../features/authSlice/authSlice'
import { getProductById } from '../features/productsSlice/productSlice'
import Comments from '../components/Comments/Comments'
/* custom Hook Local Storage */

export default function Detail () {
  const product = useSelector((state) => state?.productsDb?.productById)
  const userInfo = useSelector((state) => state.authUser?.userById)
  const geoLocation = JSON.parse(localStorage.getItem('geo'))
  const userID = localStorage.getItem('userId')
  const props = { product, userID }
  const lat = parseFloat(geoLocation.lat)
  const lon = parseFloat(geoLocation.lon)
  const dispatch = useDispatch()
  const { id, owner } = useParams()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (product !== false && product?._id !== id) {
      dispatch({ type: 'products/clearProductById' })
    }

    if (userInfo?._id !== owner) {
      dispatch({ type: 'authUser/clearUserById' })
    }

    if (owner !== '64aba27c2415d442b78559c1' && userInfo === null) {
      dispatch(getUserById({ token, UserId: owner }))
        .then((res) => {
          // console.log('Usuario obtenido:', res)
        })
        .catch((err) => {
          return err
        })
    }
    dispatch(getProductById(id))
  }, [])

  useEffect(() => {
    if (owner !== '64aba27c2415d442b78559c1' && product !== false) {
      const token = localStorage.getItem('token')
      dispatch(getUserById({ token, UserId: owner }))
    }
  }, [product, dispatch])

  return (
    <>
      {product.owner !== undefined
        ? (<>
          <div>
            <h3 className='titulo-detalle'>{product?.name}</h3>
            <div className='imagen-descripcion'>
              <div className='contenedor-imagen'>
                <img src={product?.images} alt='' className='imagen-producto' />

              </div>

              <div className='usuario-descripcion'>

                <h4 className='nombre-usuario'> {userInfo?.firstName} {userInfo?.lastName} </h4>

                <div className='estrellas'>
                  {/* <Estrellas /> */}
                </div>

                <hr />

                <p className='descripcion'>{product?.description}</p>
              </div>

            </div>

            <hr />

            <h4 className='ubicacion'>Ubicacion</h4>

            <div className='controlar-mapa'>
              <div className='mapa'><MapView longitude={lon} latitude={lat} /></div>

            </div>
            <br />
            {/* <LocationName /> */}
            <div className='boton'>
              <Link to={`/ofertar/${product?._id}/${userID}`}><button className='ofertar' product={product}>Ofertar</button></Link>

            </div>
            <h6 className='ubicacion'>Otras publicaciones de este usuario.</h6>

            <div className='control-carrusel'>
              <div className='carrusel'>
                {/* <Carousel data={userInfo?.products} /> */}

              </div>

            </div>

          </div>
          <Comments props={props} />

        </>
          ) : <Loading />}
    </>
  )
};

/* return (
  <>
    <Card style={{
      width: '350px',
      aspectRatio: '1/1',
      margin: 'auto',
      marginTop: '5rem',
      border: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', gap: '1rem' }}>
        {
          loading
            ? <Loading />
            : (
              <>
                <div>
                  <img src={product.image} alt='' />

                </div>

                <Typography variant='h5' component='div'>
                  Titulo: {product.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {product.description}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Categoría: {product.category}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Estado: {product.price}
                </Typography>
              </>
            )
        }

      </CardContent>
    </Card>
    <MapView />
  </>
) */

/* <p>Categoría: {product.category}.</p>
<p>Estado: {product.price}</p> */
