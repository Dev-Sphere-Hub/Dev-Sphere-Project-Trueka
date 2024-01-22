import React, { useEffect, useRef, useState } from 'react'
import { calcularReputacion } from './calculaReputacion'
import { useDispatch, useSelector } from 'react-redux'
import { getBarrio } from '../../features/pruebaBarrioSlice/pruebaBarrioSlice'
import Stars from './Stars/Stars'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './PerfilUsuarioConsumer.css'

const PerfilUsuario = ({ usuario, geoInfo }) => {
  const ubication = useSelector(state => state?.location)
  const [calculaRep, setCalculaRep] = useState('')
  const dispatch = useDispatch()
  const lastUbication = useRef(null)

  const reputacionUSer = { intercambiosExitosos: 15, intercambiosFallidos: 2, totalPublicaciones: 32, valoracionesPositivas: 15, valoracionesNegativas: 2, devoluciones: 1 }

  useEffect(() => {
    setCalculaRep(calcularReputacion(reputacionUSer))
  }, [])

  useEffect(() => {
    if (ubication && ubication !== lastUbication.current) {
      lastUbication.current = ubication
      dispatch(getBarrio(ubication))
    }
  }, [ubication, dispatch])

  return (
    <div className='container principalPerfil p-2 d-flex flex-column justify-content-center align-items-center overflow-hidden mt-3 gap-5' style={{ minWidth: '350px', height: 'auto' }}>

      <div className='card d-flex flex-column justify-content-center align-items-center align-content-center flex-nowrap gap-3' style={{ minWidth: '350px', width: '340px', maxWidth: '600px', height: 'auto', border: 'none' }}>
        <div className='borde-estrellas'>

          {/* head perfil */}
          {/* <CardMiniPerfil usuario={objeto} barrio={barrio} /> */}
          <div className='foto-usuario'>

            <span className='circulo'>     <img src={usuario?.picture} alt='' className='imagen-usuario' />    </span>

            <p className='parrafo-usuario'>{usuario?.firstName} {usuario?.lastName}</p>

          </div>

          <br />
          {/* <p>{geoInfo?.map((prod, i) => (<div key={i}>{prod.location}</div>))}</p> */}

          {/* Estrellas valoracion */}
          <Stars number={calculaRep} />

        </div>

        {/* Calificacion Usuario  */}
        {/* <UserBannerStatistics reputacion={reputacionUSer} /> */}

        {/* info perfil */}
        <section>
          <Link to='/perfil/crudUSer' className='fw-semibold pb-0 border-bottom border-danger' style={{ fontSize: '15.256px', color: 'var(--background-nav)', textDecoration: 'none', paddingBottom: '5px' }}>
            Ver mas datos de este usuario
          </Link>
        </section>
      </div>

    </div>
  )
}

export default PerfilUsuario
