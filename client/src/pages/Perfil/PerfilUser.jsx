import { useSelector } from 'react-redux'
import CarruselProductsCard from './CarruselProductsCard/CarruselProductsCard'
// import RenderCarrusel from './RenderCarrusel'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReusableCarrusel from './ReusableCarrusel/ReusableCarrusel'
import CardPerfilUsuario from './CardPerfilUsuario/CardPerfilUsuario'

const PerfilUser = () => {
  const user = useSelector(state => state?.autenticacion?.user)
  const productsYouLike = useSelector((state) => state?.productsDb?.likeProducts)

  const productsDestacados = []

  return (
    <div className='container principalPerfil p-2 d-flex flex-column justify-content-center align-items-center overflow-hidden mt-3 gap-5'>
      {/* card de perfil del usuario  */}
      <CardPerfilUsuario />

      {/* RenderCarrusel con productos del usuario */}
      <CarruselProductsCard filtroPor={user._id} titulo={user.firstName} user={user} />

      {/* RenderCarrusel con productos que le gustan al usuario */}
      <ReusableCarrusel titulo='Productos que sigues' productos={productsYouLike} />

      {/* RenderCarrusel con productos destacados */}
      <ReusableCarrusel titulo='Publicaciones destacadas' productos={productsDestacados} />

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
      <ToastContainer />
    </div>
  )
}

export default PerfilUser
