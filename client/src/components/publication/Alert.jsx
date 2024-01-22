/* eslint-disable react/jsx-closing-tag-location */
import { Link } from 'react-router-dom'
import OkSVG from './OkSVG'
import './styles/alert.css'
import DeniedSVG from './DeniedSVG'

function Alert ({ handleAlert, status }) {
  // const status = 'successful'

  return (
    <>
      {status === 'wrongData' || status === 'successful' || status === 'failed'
        ? (
          <>
            <div className='alert-div'>
              <div className='top'>
                <div className='svg'>
                  {status === 'successful' && (
                    <OkSVG />
                  )}
                  {status === 'wrongData' && (
                    <DeniedSVG />
                  )}
                  {status === 'failed' && (
                    <DeniedSVG />
                  )}
                </div>
                <div className='title'>
                  {status === 'wrongData' && ('Revisa el formulario')}
                  {status === 'successful' && ('¡Publicaste exitosamente!')}
                  {status === 'failed' && ('Algo salió mal, intentalo más tarde')}
                </div>
                <div className='message'>
                  {status === 'successful' &&
                  (<>
                    <p>Podés administrar tus publicaciones desde el menú</p> <p><b>Mi perfil - Mis publicaciones</b></p>
                  </>)}
                  {status === 'wrongData' &&
                  (<>
                    <p>Parece haber faltado algun dato importante.</p>
                  </>)}
                </div>
              </div>

              <div className='bottom'>
                <div className='ok'>
                  {status === 'successful' &&
                  (<>
                    <Link to='/perfil' className='link-ok'>
                      <p>Entendido</p>
                    </Link>
                  </>)}
                  {status === 'wrongData' &&
                  (<>
                    {/* Aca solo agregar la funcion heredada para reiniciar el status a '' */}
                    <Link to='/publicacion' className='link-ok' onClick={handleAlert}>
                      <p>Entendido</p>
                    </Link>
                  </>)}
                  {status === 'failed' &&
                  (<>
                    <Link to='/' className='link-ok' onClick={handleAlert}>
                      <p>Entendido</p>
                    </Link>
                  </>)}
                </div>
              </div>
            </div>
          </>
          )
        : ''}
    </>
  )
}

export default Alert
