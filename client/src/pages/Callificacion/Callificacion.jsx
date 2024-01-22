import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardMiniPerfil from '../Perfil/CardMiniPerfil/CardMiniPerfil'
import Stars from '../Perfil/Stars/Stars'
import UserBannerStatistics from '../Perfil/UserBannerStatistics/UserBannerStatistics'
import './calificacion.css'
import { setValoracionesNegativas, setValoracionesPositivas } from '../../features/reputacionSlice/reputacionSlice'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'

const Callificacion = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state?.autenticacion?.user)
  const navigate = useNavigate()
  const [calificacion, setCalificacion] = useState(0)
  const [comentario, setComentario] = useState('')
  const [errors, setErrors] = useState({})
  const [canselButton, setCanselButton] = useState(false)

  const handleStarClick = (val) => {
    setCalificacion(val)
  }

  const handleComentario = (e) => {
    setComentario(e.target.value)
  }

  const submitCalificarUser = (e) => {
    e.preventDefault()

    const newCalification = {
      punto: 1,
      calificacion,
      comentario,
      usuario: user.firstName,
      fecha: new Date().toLocaleDateString()
    }

    const validationErrors = {}

    if (!calificacion) {
      validationErrors.calificacion = 'Debe calificar el usuario'
    } else if (calificacion < 1 || calificacion > 5) {
      validationErrors.calificacion = 'La calificacion debe estar entre 1 y 5'
    }

    if (!comentario) {
      validationErrors.comentario = 'Debe ingresar un comentario'
    } else if (comentario.length < 10) {
      validationErrors.comentario = 'El comentario debe tener al menos 10 caracteres'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else if (Object.keys(validationErrors).length === 0) {
      console.log('calificacion ->', newCalification)
      setCanselButton(true)
      if (newCalification.calificacion < 3) {
        dispatch(setValoracionesNegativas(newCalification))
        setTimeout(() => {
          setCanselButton(false)
          navigate('/perfil/calificacionesRecibidas')
        }, 3000)
      } else if (newCalification.calificacion >= 3) {
        dispatch(setValoracionesPositivas(newCalification))
        setTimeout(() => {
          setCanselButton(false)
          navigate('/perfil/calificacionesRecibidas')
        }, 3000)
      }
      setErrors({})
    }
  }

  return (
    <div className='container principalPerfil p-2 d-flex flex-column justify-content-center align-items-center overflow-hidden mt-3 gap-5'>

      <div className='card d-flex flex-column justify-content-center align-items-center align-content-center flex-nowrap gap-3' style={{ border: 'none' }}>

        {/* head perfil */}
        <CardMiniPerfil />

        {/* Estrellas valoracion */}
        <Stars />

        {/* Calificacion Usuario  */}
        <UserBannerStatistics />

      </div>

      <section className='contFormCalificacion d-flex flex-column justify-content-center align-items-center align-content-center flex-nowrap'>
        <h2 className='titluloCalificacion'>¿Como fue tu experiencia con este trueque??</h2>
        <form className='formularioCalificacion' onSubmit={submitCalificarUser}>
          <div className='contSectionStars'>
            <section className='contieneSectionStars'>
              <section className='starCalification'>
                {
                  [1, 2, 3, 4, 5].map((raiting) => (
                    <ion-icon
                      key={raiting}
                      name={raiting <= calificacion ? 'star' : 'star-outline'}
                      onClick={() => handleStarClick(raiting)}
                    />

                  ))
                }

                {/* en caso que cliquee  alguna, las anteriores a esay esa se debe pintar, en este caso cambia el icono a
                <ion-icon name='star-outline' />
                <ion-icon name="star"></ion-icon> */}
              </section>
              <div className='textoStars d-flex flex-row flex-nowrap justify-content-between align-items-center gap-2'>
                <p>Mala</p>
                <p>Exelente</p>
              </div>
              {errors.calificacion && <p className='errorCalificacion' style={{ textAlign: 'center', fontSize: '12px', fontWeight: '500', fontFamily: 'var(--titulo)', color: 'red', padding: '0px', margin: '0px' }}>{errors.calificacion}</p>}
            </section>

            <section className='comentarios'>
              <h2 className='titluloCalificacion'>Contales a los demás cómo fue tu experiecia</h2>
              <textarea name='comentarios' placeholder='Escribe aquí tu comentario' onChange={handleComentario} value={comentario} />
              {errors.comentario && <p className='errorCalificacion' style={{ textAlign: 'center', fontSize: '12px', fontWeight: '500', fontFamily: 'var(--titulo)', color: 'red', padding: '0px', margin: '0px' }}>{errors.comentario}</p>}
            </section>

            <section className='contBotonCalificacion'>
              <button className='botonCalificacion' type={canselButton ? 'button' : 'submit'}>
                {canselButton ? <Loading variant='light' /> : 'Enviar calificación'}
              </button>
            </section>

          </div>
        </form>
      </section>
    </div>
  )
}

export default Callificacion
