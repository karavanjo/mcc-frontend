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
            Historical weather data viewer for polish cities
          </Typography>
          <Typography sx={{ mt: 2 }}>
            The application uses <a href="https://danepubliczne.imgw.pl/"
                                    target="_blank"
                                    title="Dane publiczne IMGW-PIB">
            Dane publiczne IMGW-PIB</a>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Source code - <a href="https://github.com/karavanjo/mcc-frontend"
                             target="_blank"
                             title="karavanjo/mcc-frontend">
            GitHub repo</a>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Article on <a href="https://dev.to/karavanjo/my-citys-climate-historical-weather-data-viewer-1mcm"
                          target="_blank"
                          title="My city's climate - historical weather data viewer">DEV Community</a>
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
