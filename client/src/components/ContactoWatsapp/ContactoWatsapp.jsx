import React, { useEffect } from 'react'
import './contactoWatsapp.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../features/authSlice/authSlice'

const ContactoWatsapp = ({ dueñoOfertaId }) => {
  const token = useSelector((state) => state?.autenticacion.token)
  const usuario = useSelector(state => state?.authUser?.userById)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserById({ token, dueñoOfertaId }))
  }, [token, dueñoOfertaId])

  const handlePhoneClick = (e) => {
    e.preventDefault()
    const message = encodeURIComponent('Hola, me contacto para aceptar y acordar el lugar de trueque.')
    window.open(`https://wa.me/${usuario?.address || 5492944123456}?text=${message}`, '_blank')
  }

  return (
    <button className='buttonWatsapp' onClick={handlePhoneClick}>
      <img className='logoWatsapp' src='/images/WhatsApp 1.png' alt='logo watsapp' />
      <span className='spanWatsapp'>
        Contactar al usuario via WhatsApp.
      </span>
    </button>
  )
}

export default ContactoWatsapp
