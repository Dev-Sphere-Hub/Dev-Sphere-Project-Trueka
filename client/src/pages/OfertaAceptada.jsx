import React, { useEffect } from 'react'
import './OfertaAceptada.css'
// import PerfilUser from './Perfil/PerfilUsuarioConsumeAgustinLorenzi'
import { Link, useParams } from 'react-router-dom'
import PerfilUsuario from './Perfil/PerfilUsuarioConsumer'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../features/authSlice/authSlice'

const OfertaAceptada = () => {
  const userInfo = useSelector((state) => state?.authUser?.userById)
  const { offerOwnerId } = useParams()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserById({ token, UserId: offerOwnerId }))
  }, [])

  return (
    <div>
      <h3 className='titulo-h3'>Aceptaste la oferta de: {userInfo?.firstName} {userInfo?.lastName} </h3>
      {/* <PerfilUser /> */}
      <PerfilUsuario />
      <h5 className='recomendaciones'>Recomendaciones de seguridad de Trueka:</h5>

      <div className='controlar-parrafo'>
        <p className='parrafo-recomendaciones'>- Verificá la identidad del usuario: Antes de comprometerte en un intercambio, asegurate de verificar la identidad de tu contraparte. Revisá su perfil e historial de intercambios anteriores, evitá a usuarios con mayoría de calificaciones negativas.<br />

          - Asegurate de que haya un acuerdo: Antes de pactar un lugar de intercambio, asegurate de que ambas partes tengan claros los términos incluyendo el estado de los artículos y cualquier otro aspecto relevante.<br />

          - Rechazá el pedido de pagos: Los intercambios en Trueka son de artículo por artículo, sin dinero de por medio. Reportá a los usuarios que te pidan dinero para realizar un trueque.<br />

          - Cuidado con las estafas virtuales: No ingreses a links que te pasen a través de chat o e-mail. Las imágenes de los artículos deben ser subidas a Trueka o enviadas directamente como archivos a través del chat.<br />

          - Reporta comportamientos sospechosos o agresivos: Si encontrás un usuario con comportamientos sospechosos o gaciendo un uso indebido de Trueka, reportalo al equipo de soporte para tomar las medidas necesarias.<br />

          - Elegí un lugar seguro para el intercambio: Si decidís realizar un intercambio en persona, elegí un lugar público y seguro para encontrarte con tu contraparte. Preferiblemente, realizá el encuentro durante el día y, si es posible, llevá un acompañante.
        </p>
      </div>

      <div className='contactar-whatsapp'>
        <img src='/images/WhatsApp 1.png' alt='' />
        <Link to='' className='fw-semibold pb-0 border-bottom border-danger' style={{ fontSize: '15.256px', color: 'var(--background-nav)', textDecoration: 'none', paddingBottom: '5px' }}>
          Contactar al usuario via WhatsApp.
        </Link>

      </div>
      <div className='botones'>
        <Link to='/calificar'><button className='ofertar'>Calificar usuario</button></Link>

      </div>

      {/* <div className='botones'>
        <button className='ofertar2'>Reportar usuario</button>

      </div> */}
    </div>
  )
}

export default OfertaAceptada
