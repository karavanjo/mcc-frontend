import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'

import Legend from '../../utils/d3-legend'

import { useMongoDB } from '../../providers/mongodb'

import { FeatureStation } from '../../model/station'
import { Observation } from '../../model/obervation'

import D3Calendar from '../../utils/d3-calendar'

import './StationGrid.scss'


interface StationModalProps {
  station: FeatureStation | null
  className: string
}

const loading = <Box sx={{ width: '100%', marginTop: '10%' }}>
  <CircularProgress/>
</Box>

function StationGrid(props: StationModalProps) {
  const { station, className } = props
  const [observations, setObservations] = useState<Observation[]>([])
  const componentMounted = useRef(true)
  const { db } = useMongoDB()

  const wrapperLegendRef = useRef<HTMLDivElement>(null)
  const wrapperCalendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      componentMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (observations.length == 0) return
    if (!wrapperLegendRef || !wrapperLegendRef.current) return
    if (!wrapperCalendarRef || !wrapperCalendarRef.current) return

    // @ts-ignore
    const svgCalendar = D3Calendar<Observation>(observations, {
      // @ts-ignore
      x: d => d.ts,
      // @ts-ignore
      y: d => d.tavg,
      cellSize: wrapperCalendarRef.current.clientWidth / 60,
      width: wrapperCalendarRef.current.clientWidth - 100
    })
    wrapperCalendarRef.current.appendChild(svgCalendar)

    // @ts-ignore
    const legend: SVGSVGElement = Legend(svgCalendar.scales.color, {
      title: 'Daily average temperature',
      tickFormat: '.0f',
    })
    wrapperLegendRef.current.appendChild(legend)


    window.addEventListener('resize', function (e) {
      console.log(e.detail)
    })
  }, [observations])

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

        if (componentMounted.current) setObservations(observations)
      }
    }

    wrapObservationsQuery()
  }, [db])

  let result
  if (observations.length == 0) {
    result = loading
  } else {
    result = <div className="grid">
      <div className="legend" ref={wrapperLegendRef}>
      </div>
      <div className="calendar" ref={wrapperCalendarRef}>
      </div>
    </div>
  }

  return (
    <div className={className}>
      {result}
    </div>
  )
}

export default StationGrid
