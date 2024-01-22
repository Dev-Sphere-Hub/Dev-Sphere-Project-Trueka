import { AppBar, Box, Button, Drawer, IconButton, Toolbar } from '@mui/material'
import NavListDrawer from './NavListDrawer'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
// import HomeIcon from "@mui/icons-material/HomeIcon"
// import StarIcon from './star.svg';
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import CategoryTest from '../CategoryTest'
// import SearchBar from '../SearchBar'
import './Navbar.css'
import Search from '../Search/Search'

const navLinks = [
  {
    icono: <InboxIcon />, title: 'Home', path: '#'
  },
  {
    icono: <DraftsIcon />, title: 'Perfil', path: '#perfil'
  },
  {
    icono: <DraftsIcon />, title: 'Chat', path: '#chat'
  },
  {
    icono: <DraftsIcon />, title: 'Configuración', path: '#configuracion'
  },
  {
    icono: <DraftsIcon />, title: 'Ayuda', path: '#ayuda'
  },
  {
    icono: <DraftsIcon />, title: 'Cerrar Sesión', path: '#cerrarsesion'
  }

]

export default function NavBar () {
  const [open, setOpen] = useState(false)

  return (
    <>

      <AppBar position='static'>
        <Toolbar>
          <IconButton color='inherit' size='large' onClick={() => setOpen(true)} sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* <CategoryTest /> */}
            {/* <SearchBar/> */}
            {
              // navLinks.map(item => (<Button color="inherit" key={item.title} component="a" href={item.path}>{item.title}</Button>))
              <div className='publicar'>
                <img src='/images/Group 19.png' alt='' className='logo' />
                <div className='categoria-publicar'>
                  <CategoryTest />

                </div>
              </div>
            }
          </Box>
          <Search />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <p>Publicar</p>
          </Box>
          <div className='boton-perfil'>
            <Button color='inherit' key='perfil' component='a' href='#perfil'><img src='/images/account_circle_filled_24px.png' alt='' className='perfil' /></Button>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <p>Usuario</p>
            </Box>

          </div>

        </Toolbar>
      </AppBar>

      {/* <Button variant="contained" onClick={() => setOpen(true)}>Open Drawer</Button> */}

      <Drawer open={open} anchor='left' onClose={() => setOpen(false)} sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <NavListDrawer navLinks={navLinks} />
      </Drawer>

    </>
  )
}
