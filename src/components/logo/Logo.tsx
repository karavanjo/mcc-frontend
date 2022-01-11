import { Fragment, useState } from 'react';

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

import logo from '../../logo.svg'
import './Logo.scss'

function Logo() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <div className="logo" title="My city's climate" onClick={handleOpen}>
        <img src={logo} alt="My city's climate"/>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-logo-description">
          <Typography variant="h6" component="h2">
            My city's climate
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Free online viewer for historical weather data
          </Typography>
          <Typography sx={{ mt: 2 }}>
            The application uses <a href="https://danepubliczne.imgw.pl/">Dane publiczne IMGW-PIB</a>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Source code - <a href="https://github.com/karavanjo/mcc-frontend" title="karavanjo/mcc-frontend">github</a>
          </Typography>
          <Typography align={'right'} sx={{ mt: 2 }}>
            <Button onClick={handleClose} variant="outlined">Close</Button>
          </Typography>
        </Box>
      </Modal>
    </Fragment>
  )
}

export default Logo
