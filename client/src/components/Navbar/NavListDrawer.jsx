import { Box } from '@mui/system'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'

const navLinksDrawer = [
  {
    icono: <InboxIcon />, title: 'Home', path: '#'
  },
  // {
  //   icono: <DraftsIcon />, title: "Perfil" , path:"#perfil"
  // },
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

export default function NavListDrawer () {
  return (
    <Box sx={{ width: 250 }}>

      <nav>
        <List>
          {
                        navLinksDrawer.map(item => (
                          <ListItem disablePadding key={item.title}>

                            <ListItemButton component='a' href={item.path}>
                              <ListItemIcon>
                                {item.icono}
                              </ListItemIcon>
                              <ListItemText>{item.title}</ListItemText>

                            </ListItemButton>

                          </ListItem>

                        ))

                    }

        </List>
      </nav>
    </Box>
  )
}
