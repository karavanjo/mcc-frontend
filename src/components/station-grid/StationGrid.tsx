import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

import { useMongoDB } from '../../providers/mongodb'

import { FeatureStation } from '../../model/station'
import { Observation } from '../../model/obervation'

import Calendar from '../../utils/calendar'

import './StationGrid.css'


interface StationModalProps {
  station: FeatureStation | null
  className: string
}

const loading = <Box sx={{ width: '100%' }}>
  <Skeleton/>
  <Skeleton animation="wave"/>
  <Skeleton animation={false}/>
</Box>

function StationGrid(props: StationModalProps) {
  const { station, className } = props;
  const [observations, setObservations] = useState<Observation[]>([])
  const { db } = useMongoDB()

  const svg = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (observations.length == 0) return
    if (!svg || !svg.current ) return;

    // @ts-ignore
    const svgCalendar = Calendar<Observation>(observations, {
      // @ts-ignore
      x: d => d.ts,
      // @ts-ignore
      y: d => d.tavg,
      cellSize: svg.current.clientWidth / 60,
      width: svg.current.clientWidth - 100
    })

    if (svg.current) {
      svg.current.appendChild(svgCalendar)
    }
  }, [observations]);

  useEffect(() => {
    async function wrapObservationsQuery() {
      if (!station) return
      const stationProps = station.getProperties()
      if (!stationProps.hasOwnProperty('code')) return
      const code = stationProps.code

      if (db) {
        const observations: Observation[] = await db
        .collection('observations')
        .find({ 'source.code': parseInt(code, 10) }, {
          sort: { 'ts': -1 }
        })

        setObservations(observations)
      }
    }

    wrapObservationsQuery()
  }, [db])

  let result
  if (observations.length == 0) {
    result = loading
  } else {
    result = <div className="grid" ref={svg}/>
  }

  return (
    <div className={className}>
      {result}
    </div>
  )
}

export default StationGrid
