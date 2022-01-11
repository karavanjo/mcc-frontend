import { useEffect, useState } from 'react'
import { useRealmApp } from './providers/realm'
import { useMongoDB } from './providers/mongodb'

import { Station } from './model/station';
import StationsMap from './components/stations-map/'
import Logo from './components/logo';

import './App.scss'

function App() {
  const { anonymousIn, user } = useRealmApp()
  const { db } = useMongoDB()
  const [stations, setStations] = useState<Station[]>([])

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

  return (
    <div className="app">
      <Logo/>
      <StationsMap stations={stations}/>
    </div>
  )
}

export default App
