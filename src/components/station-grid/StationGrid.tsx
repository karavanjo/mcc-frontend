import React, { useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import Legend from '../../utils/d3-legend'
import D3Calendar from '../../utils/d3-calendar'

import { useMongoDB } from '../../providers/mongodb'

import { FeatureStation } from '../../model/station'
import { Observation } from '../../model/obervation'

import './StationGrid.scss'
import { getIndicators } from '../../utils/getIndicators'
import { Indicator } from '../../model/indicator'

interface StationGridProps {
  station: FeatureStation | null
  className: string
}

const loading = <Box sx={{ width: '100%', marginTop: '10%' }}>
  <CircularProgress/>
</Box>

let resizeHandler: (() => void) | null = null


function StationGrid(props: StationGridProps) {
  const { station, className } = props
  const [indicatorKey, setIndicatorKey] = useState<string>('')
  const [indicators, setIndicators] = useState<Indicator[]>([])

  const [observations, setObservations] = useState<Observation[]>([])
  const componentMounted = useRef(true)
  const { db } = useMongoDB()

  const wrapperLegendRef = useRef<HTMLDivElement>(null)
  const wrapperCalendarRef = useRef<HTMLDivElement>(null)

  const indicatorChange = (event: SelectChangeEvent) => {
    setIndicatorKey(event.target.value)
  }

  useEffect(() => {
    return () => {
      componentMounted.current = false
      if (resizeHandler) window.removeEventListener('resize', resizeHandler)
      resizeHandler = null
    }
  }, [])

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

        const indicators: Indicator[] = getIndicators(observations)
        .sort((a, b) => a.name > b.name ? 1 : -1)

        if (componentMounted.current) {
          setIndicators(indicators)
          setIndicatorKey(indicators.length > 0 ? indicators[0].key : '')
          setObservations(observations)
        }
      }
    }

    wrapObservationsQuery()
  }, [db])

  useEffect(() => {
    if (observations.length > 0 && indicatorKey != '') {
      buildChart()
      makeResizeHandler()
    }
  }, [observations, indicatorKey])

  const makeResizeHandler = () => {
    let timeout: number

    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
    resizeHandler = () => {
      clearTimeout(timeout)
      timeout = setTimeout(buildChart, 500)
    }
    window.addEventListener('resize', resizeHandler)
  }

  const buildChart = () => {
    if (observations.length == 0) return
    if (!wrapperLegendRef || !wrapperLegendRef.current) return
    if (!wrapperCalendarRef || !wrapperCalendarRef.current) return

    // @ts-ignore
    const svgCalendar = D3Calendar<Observation>(observations, {
      // @ts-ignore
      x: d => d.ts,
      // @ts-ignore
      y: d => d[indicatorKey],
      cellSize: wrapperCalendarRef.current.clientWidth / 60,
      width: wrapperCalendarRef.current.clientWidth - 100
    })
    wrapperCalendarRef.current.innerHTML = ''
    wrapperCalendarRef.current.appendChild(svgCalendar)

    // @ts-ignore
    const legend: SVGSVGElement = Legend(svgCalendar.scales.color, {
      title: indicators.find(i => i.key == indicatorKey)?.name,
      tickFormat: '.0f',
    })
    wrapperLegendRef.current.innerHTML = ''
    wrapperLegendRef.current.appendChild(legend)
  }

  let result
  if (observations.length == 0) {
    result = loading
  } else {
    result = <div className="grid">
      <div className="controls">
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="demo-simple-select-label">Indicator</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={indicatorKey}
            label="Indicator"
            onChange={indicatorChange}
          >
            {indicators.map((i: Indicator) => {
              return <MenuItem key={i.key} value={i.key}>{i.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
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
