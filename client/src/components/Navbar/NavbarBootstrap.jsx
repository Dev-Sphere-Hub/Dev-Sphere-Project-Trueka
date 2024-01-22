// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
// import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import './NavbarBootstrap.css'
import SearchBar from '../Search/SearchBar'
// import CategoryTest from '../categoryTest/CategoryTest'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CategoryTest from '../categoryTest/CategoryTest'
import SubmenuUser from '../SubmenuUser/SubmenuUser'

function NavBarBootstrap () {
  const userLogin = useSelector(state => state?.autenticacion?.isAuthenticated)

  const dispatch = useDispatch()

  const handleLogoClick = () => {
    dispatch({ type: 'products/addToSearchResults', payload: '' })
  }

  return (
    <>
      {['sm'].map((expand) => (

        <Navbar key={expand} expand={expand} className='navbar' style={{ overflow: 'visible !important', overflowX: 'visible', overflowY: 'visible' }}>
          <div className='logo-container'>
            <div className='logo-buscador'>
              <div className='div-logo' onClick={handleLogoClick}>
                <Link to='/'><img src='/images/Group 23.png' alt='' className='logo' /></Link>
              </div>
              <span className='input'><SearchBar /></span>

            </div>

            <Container className='container'>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='border-0' />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement='end'
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} />
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className='justify-content-end  pe-3'>                    
                    <CategoryTest />
                  </Nav>
                  <div className='form'>
                    <SearchBar />
                  </div>
                  <Link to='/publicacion' className='publicar'>Publicar</Link>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
            <div className='div-logo2'>
              <Link to='/'><img src='/images/Group 23.png' alt='' className='logo' /></Link>
            </div>
          </div>
          {
            userLogin
              ? <SubmenuUser />

              : (
                <Link to='/login'>
                  <div className='perfil'>
                    <img src='/images/account_circle_filled_24px.png' alt='' className='imagen-perfil' />
                    <p className='usuarios'>Usuario</p>
                    {/* <Link to='/login' className='usuarios'>Usuarios</Link> */}
                    {/* <NavLink to='/' className='item-navbar'><span >Inicio</span></NavLink> */}
                  </div>
                </Link>
                )
          }

        </Navbar>

      ))}
    </>
  )
}

export default NavBarBootstrap
