import React, { useEffect } from 'react'
import './OfertaRecibida.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import PerfilUsuario from './Perfil/PerfilUsuarioConsumeAgustinLorenzi';
import Swal from 'sweetalert2'
import PerfilUsuario from './Perfil/PerfilUsuarioConsumer'
import { useDispatch, useSelector } from 'react-redux'
import { changeOfferStatus, getOfferById } from '../features/offers/offerSlice'
import CardOffer from '../components/cardOffers/CardOffer'
import { toast } from 'react-toastify'
import CardOwnerOffer from './Perfil/CardOwnerOffer/CardOwnerOffer'
import ContactoWatsapp from '../components/ContactoWatsapp/ContactoWatsapp'

const OfertaRecibida = () => {
  const offerProduct = useSelector((state) => state?.offer?.offerById)
  const ubicacionOferta = offerProduct?.offeredItems[0]?.location
  const offerOwnerID = offerProduct?.offerOwnerId?._id

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { offerId } = useParams()
  const token = localStorage.getItem('token')
  const userID = localStorage.getItem('userId')

  useEffect(() => {
    dispatch(getOfferById({ token, id: offerId }))
  }, [])

  useEffect(() => {
    console.log(offerProduct)
  }, [offerProduct])

  function confirmacion () {
    Swal.fire({
      html: '<h4>¿Aceptás la oferta recibida?.</h4> <br/>   <p>Confirmá si aceptás la oferta de trueque que recibiste de tu contraparte.<br/> Podés contactarte antes para asegurarte de que la oferta sea válida.</p>',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'custom-button',
        text: 'texto',
        cancelButton: 'custom-button2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeOfferStatus({
          token,
          id: offerId,
          status: {
            status: 'approved'
          }
        })).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            navigate(`/oferta-aceptada/${offerOwnerID}`)
          }
        })
          .catch((error) => console.log(error))
      }
    })
  }

  const handleReject = () => {
    Swal.fire({
      html: '<h4>¿Seguro que queres rechazar la oferta?.</h4> <br/>   <p>Confirmá si queres rechazar la oferta, tené en cuenta que no vas a poder volver a visualizarla una vez rechazada.</p>',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirmar',
      customClass: {
        confirmButton: 'custom-button',
        text: 'texto',
        cancelButton: 'custom-button2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeOfferStatus({
          token,
          id: offerId,
          status: {
            status: 'rejected'
          }
        })).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            navigate(`/ofertas/${userID}`)
            toast.success('oferta rechazada')
          }
        })
          .catch((error) => console.log(error))
      }
    })
  }

  return (

    <div>

      <div>
        <h3 className='titulo-h3'>¡Recibiste una oferta por tu articulo!.</h3>
        <div className='controlar-cards-recibida'>

          <div>
            <CardOffer products={[offerProduct?.offerTargetItem]} />
          </div>

        </div>

        <hr className='hr' />

        <h3 className='titulo-h3'>Te ofrecieron:</h3>

        <div className='ubicar'>
          {offerProduct?.offeredItems?.map((products, i) => (
            <div className='cards-container' key={i}>
              <CardOffer products={[products]} />
            </div>
          ))}
        </div>

        <CardOwnerOffer dueñoOferta={offerOwnerID} ubicacionOferta={ubicacionOferta} />

        <PerfilUsuario usuario={offerProduct?.offerOwnerId} geoInfo={offerProduct?.offeredOtems} />
        <hr className='hr' />

        <ContactoWatsapp watsapp={offerOwnerID} />

        <div className='botones'>
          <button className='ofertar' onClick={confirmacion}>Aceptar Oferta</button>

        </div>

        <div className='botones'>
          <button className='ofertar2' onClick={handleReject}>Rechazar Oferta</button>

        </div>

      </div>

    </div>
  )
}

export default OfertaRecibida
