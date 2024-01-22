import React from 'react'
import Stars from '../Stars/Stars'
import CardMiniPerfilOfertas from './CardMiniPerfilOfertas/CardMiniPerfilOfertas'
import { Link } from 'react-router-dom'

const CardOwnerOffer = ({ dueñoOfertaId, ubicacionOferta }) => {
  return (
    <div className='card d-flex flex-column justify-content-center align-items-center align-content-center flex-nowrap gap-3' style={{ border: 'none' }}>

      {/* head perfil */}
      <CardMiniPerfilOfertas dueñoOferta={dueñoOfertaId} ubicacionOferta={ubicacionOferta} />

      {/* Estrellas valoracion */}
      <Stars />

      {/* info perfil */}
      <section>
        <Link to='/perfil/calificacionesRecibidas' className='fw-semibold pb-0 border-bottom border-danger' style={{ fontSize: '15.256px', color: 'var(--background-nav)', textDecoration: 'none', paddingBottom: '5px' }}>
          Ver mas datos de este usuario
        </Link>
      </section>
    </div>
  )
}

export default CardOwnerOffer
