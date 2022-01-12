import { FeatureStation } from '../../model/station'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import StationGrid from '../station-grid'

import './StationModal.scss'

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
      <div className="station-modal">
        <div className="header">
          <Typography variant="h3" component="h3">
            {station.getProperties().name}
          </Typography>
          <Button onClick={handleClose} variant="outlined">Close</Button>
        </div>
        <StationGrid className="wrapper" station={station}/>
      </div>
    </Modal>
  }

  return result
}

export default StationModal
