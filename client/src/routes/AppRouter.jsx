import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
// import CategoryTest from '../components/CategoryTest'
// import Search from '../components/Search/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
import NavBarBootstrap from '../components/Navbar/NavbarBootstrap'
import PerfilUser from '../pages/Perfil/PerfilUser'
import Publication from '../components/publication/Publication'
import FormCargaProducts from '../pages/CargaDatos/FormCargaProducts'
import Ofertar from '../pages/Ofertar'
import Categorias from '../pages/Categorias/Categorias'
import LoginUser from '../pages/LoginUser/LoginUser'
import RegisterUser from '../pages/RegisterUser/RegisterUser'
import SettingPerfil from '../pages/SettingPerfil/SettingPerfil'
import OfertaRecibida from '../pages/OfertaRecibida'
import OfertaAceptada from '../pages/OfertaAceptada'
import Callificacion from '../pages/Callificacion/Callificacion'
import OfertasMain from '../pages/OfertasMain'
import CalificacionesRecibidas from '../pages/CalificacionesRecibidas/CalificacionesRecibidas'

function AppRouter ({ state }) {
  return (
    <BrowserRouter>
      <NavBarBootstrap />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/ofertas/:id' element={<OfertasMain />} />
        <Route path='/oferta-recibida/:offerId' element={<OfertaRecibida />} />
        <Route path='/oferta-aceptada/:offerOwnerId' element={<OfertaAceptada />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/detalle/:id/:owner' element={<Detail />} />
        <Route path='/perfil' element={<PerfilUser />} />
        <Route path='/publicacion' element={<Publication />} />
        <Route path='/ofertar/:id/:userID' element={<Ofertar />} />
        {/* pruebas */}
        <Route path='/cargaProduct' element={<Publication />} />
        <Route path='/formulario' element={<FormCargaProducts />} />
        <Route path='/categoria' element={<Categorias />} />

        {/* validando y probando guille */}
        <Route path='/login2' element={<LoginUser />} />
        <Route path='/register2' element={<RegisterUser />} />
        <Route path='/setting-perfil' element={<SettingPerfil />} />
        <Route path='/calificar' element={<Callificacion />} />
        <Route path='/perfil/calificacionesRecibidas' element={<CalificacionesRecibidas />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
