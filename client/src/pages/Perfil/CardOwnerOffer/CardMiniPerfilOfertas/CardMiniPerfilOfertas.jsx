import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../../../features/authSlice/authSlice'

const CardMiniPerfilOfertas = ({ dueñoOfertaId, ubicacionOferta }) => {
  const usuario = useSelector(state => state?.authUser?.userById)
  const token = useSelector((state) => state?.autenticacion.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserById({ token, dueñoOfertaId }))
  }, [token, dueñoOfertaId])

  return (
    <>
      {/* head perfil */}
      <section className='imgName d-flex flex-row justify-content-center align-items-center align-content-center flex-nowrap gap-3 position-relative' style={{ width: '100%', height: '70px' }}>
        {/* img Perfil left */}
        <div className='profile overflow-hidden position-static rounded-circle overflow-hidden' style={{ width: '64.837px', height: '64.837px' }}>
          <img src={usuario?.picture} style={{ width: '100%', height: '100%' }} />
        </div>
        {/* info Perfil right  */}
        <section className='titulos position-static d-flex flex-column justify-content-center align-items-start align-content-center flex-nowrap gap-2'>
          <div className='d-flex flex-row justify-content-start align-items-center align-content-center flex-nowrap gap-3 ' style={{ fontFamily: 'var(--titulo)' }}>
            <h2 className='m-0 p-0' style={{ color: '#333', fontFamily: 'var(--titulo)', fontSize: '20px', fontWeight: '600' }}>{usuario?.firstName}</h2>
            <span className='d-flex flex-row justify-content-center align-items-center align-content-center flex-nowrap' style={{ width: '30.512px', height: '30.512px', borderRadius: '50%', fontSize: '1.3rem', backgroundColor: 'var(--background-nav)', color: 'white' }}>
              <ion-icon name='checkmark-sharp' />
            </span>
          </div>
          <div className='d-flex flex-row justify-content-start align-items-center align-content-center flex-nowrap gap-1' style={{ width: '100%', height: 'auto', fontSize: '20px' }}>
            {ubicacionOferta === undefined
              ? (
                <>
                  <ion-icon name='location-sharp' style={{ color: 'var(--background-nav)' }} />
                  <h3 className='text-muted d-block p-0 m-0' style={{ fontSize: '14px' }}>
                    Ubicación
                  </h3>
                </>
                )
              : (
                <>
                  <ion-icon name='location-sharp' style={{ color: 'var(--background-nav)' }} />
                  <h3 className='text-muted d-block p-0 m-0' style={{ fontSize: '14px' }}>
                    {ubicacionOferta}
                  </h3>
                </>
                )}
          </div>
        </section>
      </section>
    </>
  )
}

export default CardMiniPerfilOfertas
