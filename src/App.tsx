import { Fragment, useEffect, useState } from 'react'
import { useRealmApp } from './providers/realm'
import { useMongoDB } from './providers/mongodb'

import { FeatureStation, Station } from './model/station';
import StationsMap from './components/stations-map/'
import StationModal from './components/station-modal'
import Logo from './components/logo';

import './App.scss'

function App() {
  const { anonymousIn, user } = useRealmApp()
  const { db } = useMongoDB()
  const [stations, setStations] = useState<Station[]>([])
  const [selectedStation, setSelectedStation] = useState<FeatureStation | null>(null)

  useEffect(() => {
    async function wrapStationsQuery() {
      if (db) {
        const stations: Station[] = await db.collection('stations')
        .find({}, {
          projection: {
            'code': 1,
            'name': 1,
            'type': 1,
            'location': 1
          }
        })

        setStations(stations)
      }
    }

    wrapStationsQuery()
  }, [db])

  useEffect(() => {
    if (!user) {
      anonymousIn()
    }
  })

  const onClickFeatures = (features: FeatureStation[]) => {
    if (features.length == 0) return
    setSelectedStation(features[0])
  }

  const onClose = () => {
    setSelectedStation(null)
  }

  return (
    <Fragment>
      <div className="app">
        <Logo/>
        <StationsMap
          stations={stations}
          onClickFeatures={(f) => onClickFeatures(f)}
        />
      </div>
      <StationModal
        station={selectedStation}
        onClose={onClose}
      />
    </Fragment>
  )
}

export default App
