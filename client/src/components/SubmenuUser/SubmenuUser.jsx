import { useState } from 'react'
import './Submenu.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/AutenticationSlice/AutenticationSlice'
import { toast } from 'react-toastify'
import { logout } from '../../features/authSlice/authSlice'
const SubmenuUser = () => {
  const token = useSelector(state => state?.autenticacion?.token)
  const id = localStorage.getItem('userId')
  const [isActive, setIsActive] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    toast.success('Bie bie 👋😊!')
    try {
      const response = await dispatch(logout(token))
      console.log('LOGOUT -> ', response.payload) // Acceso a los datos exitosos
      // Resto del código en caso de éxito (opcional)
      dispatch(logoutUser())
      navigate('/')
    } catch (error) {
      console.log('ERROR LOGOUT -> ', error) // Acceso al error
      // Resto del código en caso de error (opcional)
    }
  }
  const handleRedirextPerfil = () => {
    navigate('/perfil')
  }
  const handleRedirexSettingPerfil = () => {
    navigate('/setting-perfil')
  }

  const handleActiveSubmenu = () => {
    setIsActive(!isActive)
  }

  const handleIncomingOffer = () => {
    navigate(`/ofertas/${id}`)
  }

  return (
    <>
      <button className='botonSubmenu' onClick={handleActiveSubmenu}>
        <ion-icon name='person-outline' />
      </button>

      <section className={`submenu ${isActive ? 'active' : ''}`}>
        <div className='submenuHead'>
          <button className='botonSubmenu2' onClick={handleRedirextPerfil}>
            <ion-icon name='person-outline' />
            <span>Perfil</span>
          </button>
          <button className='botonSubmenu2' onClick={handleRedirexSettingPerfil}>
            <ion-icon name='construct-outline' />
            <span>Configuración</span>
          </button>
          <button className='botonSubmenu2'>
            <ion-icon name='chatbubble-ellipses-outline' />
            <span>Chat</span>
          </button>
          <button className='botonSubmenu2'>
            <ion-icon name='bag-check-outline' />
            <span>Publicar articulo</span>
          </button>
          <button className='botonSubmenu2' onClick={handleIncomingOffer}>
            <ion-icon name='bag-check-outline' />
            <span>Mis ofertas</span>
          </button>
        </div>

        <div className='submenufoother'>
          <button className='botonSubmenu3' onClick={handleLogout}>
            <ion-icon name='log-out-outline' />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </section>
    </>
  )
}

export default SubmenuUser
