import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation } from './/features/location/location'
import AppRouter from './routes/AppRouter'
import './index.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { processGoogleCallback } from './features/AutenticationSlice/AutenticationSlice'
import OfertaRecibida from './pages/OfertaRecibida'
import { Link } from 'react-router-dom'

function App () {
  const token = useSelector(state => state?.autenticacion?.token)
  const usuario = useSelector(state => state?.autenticacion?.user)

  // const [socket, setSocket] = useEffect()

  const dispatch = useDispatch()
  // const [authorizationCode, setAuthorizationCode] = useState('')

  useEffect(() => {
    // console.log('SE EJECUTA FUNC APP')
    navigator.geolocation.getCurrentPosition(
      function (position) {
        dispatch(
          setLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          })
        )
      },
      function (error) {
        // console.log(error)
      },
      {
        enableHighAccuracy: true
      }
    )
  }, [dispatch])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const scope = urlParams.get('scope')
    const authuser = urlParams.get('authuser')
    const prompt = urlParams.get('prompt')

    if (token) {
      // toast.success(`Bienvenido ${usuario.firstName}`)
    } else if (code !== null && code !== undefined) {
      dispatch(processGoogleCallback({ code, scope, authuser, prompt }))
        .then(res => {
          console.log('res', res)
          if (res.type === 'auth/processGoogleCallback/fulfilled') {
            localStorage.setItem('userId', res.payload.user._id)
            localStorage.setItem('token', res.payload.token)
            localStorage.setItem('userImage', res.payload.user.picture)
          }
        })
        .catch(() => {
          // console.log('error')
        })
    } else {
      // console.log('no hay token')
    }

    // dispatch(storeAccessToken(code))
    // console.log('code de acceso obtenido correctamente', code)
  }, [dispatch, token, usuario])

  return (

    <div className='probando'>

      {/* <Link to='/oferta-recibida'><OfertaRecibida/></Link> */}

      <AppRouter />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}

export default App
