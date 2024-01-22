import React from 'react'
import './userBanner.css'
import { useSelector } from 'react-redux'
// recibe un objeto con los datos de la reputacion del usuario y renderiza un mini banner con los datos
const UserBannerStatistics = () => {
  const reputacion = useSelector(state => state?.reputacion)

  return (
    <>
      <section className='valoresRep mb-2'>
        <div className='cajaPAdre d-flex justify-content-center align-items-center rounded-1 p-2  rounded overflow-hidden text-center' style={{ background: 'var(--yellowContenedor)', boxShadow: '2px 2px 4px 0px rgba(222, 18, 82, 0.23)' }}>

          <div className='stats d-flex flex-column justify-content-start align-items-center align-content-start flex-nowrap gap-2' style={{ width: '49%', height: '90px' }}>
            <span className='fw-normal' style={{ fontSize: '32px', fontFamily: 'var(--titulo)' }}>{reputacion.intercambiosExitosos}</span>
            <h3 className='fw-normal' style={{ fontSize: '14px', color: 'var(--textColor3)', fontFamily: 'var(--titulo)' }}>Trueques Realizados</h3>
          </div>
          <div className='' style={{ width: '1px', height: '80px', background: 'var(--lineas)' }} />
          <div className='stats d-flex flex-column justify-content-start align-items-center align-content-start flex-nowrap gap-2' style={{ width: '49%', height: '90px' }}>
            <span className='fw-normal' style={{ fontSize: '32px', fontFamily: 'var(--titulo)' }}>{reputacion.totalPublicaciones}</span>
            <h3 className='fw-normal' style={{ fontSize: '14px', color: 'var(--textColor3)', fontFamily: 'var(--titulo)' }}>Artículos publicados</h3>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserBannerStatistics
