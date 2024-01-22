/* eslint-disable no-undef */
import { useDispatch, useSelector } from 'react-redux'
import './styles/OfertasMain.css'
import { Children, useEffect, useState } from 'react'
import { getUserById } from '../features/authSlice/authSlice'
import { Link, useParams } from 'react-router-dom'
import { getOfferById } from '../features/offers/offerSlice'
import CardProduct from '../components/CardProduct'
import CardOffer from '../components/cardOffers/CardOffer'

function OfertasMain () {
//   const userId = useSelector((state) => state?.authUser?.userById)
  const userOffers = useSelector((state) => state?.authUser?.userById?.incomingOffers)
  const incomingOffers = useSelector((state) => state?.offer?.offerById)
  const userID = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const dispatch = useDispatch()

  const [offerArray, setOfferArray] = useState([])

  const handleButton = () => {
    const fetchObjects = async () => {
      if (userOffers !== null && userOffers !== undefined && id === userID) {
        if (offerArray?.length < userOffers?.length) {
          try {
            const promises = userOffers.map((OfferId) => dispatch(getOfferById({ token, id: OfferId })))
            const results = await Promise.all(promises)
            setOfferArray((prevOfferArray) => [...prevOfferArray, ...results.map(result => result?.payload)])
          } catch (error) {
            console.log('Error fetching objects', error)
          }
        }
      }
    }

    fetchObjects()
  }

  useEffect(() => {
    dispatch({ type: 'authUser/clearUserById' })

    if (id !== userID) {
      dispatch({ type: 'authUser/clearUserById' })
    }

    if (userID !== '64aba27c2415d442b78559c1') {
      dispatch(getUserById({ token, UserId: userID }))
    }
    console.log(offerArray)
  }, [])

  return (

    <>

      <div className='alert-offer'>
        <div className='offer-title'> SECCIÓN OFERTAS </div>
        <div> Trueka es una plataforma de intercambio de objetos donde los usuarios asumen la responsabilidad total por el uso de la aplicación y los intercambios que realicen. Como intermediarios, no nos hacemos responsables de la calidad, seguridad o legalidad de los objetos intercambiados, ni supervisamos las transacciones. Los usuarios deben verificar la identidad y confiabilidad de otros participantes en los intercambios.</div>
        <div className='ok-button' onClick={() => handleButton()}>Ver ofertas</div>
      </div>

      <div className='uni-container-offer'>
        {offerArray?.map((producto, i) => (
          <div key={i}>

            {producto?.status === 'pending'
              ? (
                <>
                  <div className='offer-main-container'>

                    <div className='offer-container'>

                      <div className='user-product-offer'>
                        <div className='offer-title'>
                          Oferta pendiente de respuesta
                        </div>
                        <div className='user-card-product'>
                          <CardOffer products={[producto?.offerTargetItem]} />

                        </div>
                      </div>

                      <div className='offer-products'>
                        <div className='offer-title'>Ofertaron {producto?.offeredItems?.length} {producto?.offeredItems?.length > 1 ? 'productos' : 'producto'}
                        </div>
                        <div className='offer-cards-products'>
                          <CardOffer products={producto?.offeredItems} />
                        </div>
                      </div>

                      <Link to={`/oferta-recibida/${producto?._id}`} className='go-to-offer'>
                        Ver Oferta
                      </Link>

                    </div>

                  </div>
                </>
                )
              : ''}
          </div>

        ))}
      </div>

    </>
  )
}

export default OfertasMain
