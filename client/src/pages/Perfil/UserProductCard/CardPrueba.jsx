import React, { useState } from 'react'
import './card.css'
// import { Link } from 'react-router-dom'
import BotonCardHeart from '../BotonCardHeart/BotonCardHeart'
import { useNavigate } from 'react-router-dom'

const UserProductCard = ({ element, funcDeletes }) => {
  const [ishover, setIshover] = useState(false)
  const navigate = useNavigate()

  const handleNavigateDetail = () => {
    navigate(`/detalle/${element._id}/${element.owner}`)
  }

  const handleMoueEnter = () => {
    // console.log('DENTRO de mouse enter')
    setIshover(true)
  }

  const handleMoueLeave = () => {
    // console.log('FUERA de mouse leave')
    setIshover(false)
  }

  return (
    <>
      <div className='cardCustomer' onMouseEnter={handleMoueEnter} onMouseLeave={handleMoueLeave}>
        <div className={`customContent activada ${ishover ? '' : 'hovered'}`}>
          <div className='back' onClick={handleNavigateDetail} style={{ cursor: 'pointer' }}>
            <div className='back-content'>
              <section className='imgCardPrefil'>
                <img className='imagenCard' src={element.images[0]} alt={element.description} />
              </section>
              <section className='textos'>
                <strong>{element.name}</strong>
                <span>
                  <ion-icon style={{ color: 'red', fontSize: '20px' }} name='location-sharp' />
                  {element.location}
                </span>
              </section>
            </div>
          </div>
          <BotonCardHeart element={element} claseCustom={ishover ? 'visible' : 'invisible'} />
        </div>
      </div>
    </>
  )
}

export default UserProductCard
