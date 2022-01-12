import { FeatureStation } from '../../model/station'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import './StationModal.css'

interface StationModalProps {
  station: FeatureStation | null
  onClose: () => void
}

function StationModal(props: StationModalProps) {
  const { station, onClose } = props

  const handleClose = () => onClose()

  let result = <></>

  if (station) {
    result = <Modal
      open={true}
      onClose={handleClose}
    >
      <Box className="station-modal">
        <Typography variant="h3" component="h3">
          {station.getProperties().name}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Code: {station.getProperties().code}
        </Typography>
        <Typography align={'right'} sx={{ mt: 2 }}>
          <Button onClick={handleClose} variant="outlined">Close</Button>
        </Typography>
      </Box>
    </Modal>
  }

  return result
}

export default StationModal
