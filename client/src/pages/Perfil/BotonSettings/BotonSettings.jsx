import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './botoneraSetting.css'

const BotonSettings = ({ user }) => {
  const [activaSetting, setActivaSetting] = useState(false)
  const [moveSetting, setAddMoveSetting] = useState(false)
  // const [valorHeart, setValorHeart] = useState('')
  const navigate = useNavigate()

  const onMoveSetting = (e) => {
    e.preventDefault()
    setActivaSetting(!activaSetting)
    if (!activaSetting) {
      setTimeout(() => {
        setAddMoveSetting(true)
        navigate(`/settings/${user._id}`)
      }, 3000)
    }
  }

  // useEffect(() => {
  //   if (activaSetting) {
  //     setTimeout(() => {
  //       setAddMoveSetting(true)
  //       navigate(`/settings/${user._id}`)
  //     }, 3000)
  //   }
  // })

  return (
    <section className='botoneraSetting  '>
      <div>
        <a className={`heart ${activaSetting ? 'rotar' : ''} ${moveSetting ? 'activo' : ''}`} onClick={(e) => onMoveSetting(e)}>
          <ion-icon name='settings' style={{ color: activaSetting || moveSetting ? 'red' : 'black' }} />

        </a>
      </div>
    </section>
  )
}

export default BotonSettings
