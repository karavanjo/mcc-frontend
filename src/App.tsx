import { useEffect, useState } from 'react'
import { useRealmApp } from './providers/realm'
import { useMongoDB } from './providers/mongodb'
import StationsMap from './components/stations-map/'

import './App.scss'
import logo from './logo.svg'
import { Station } from './model/station';

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

  let content;
  if (stations) {
    content = <StationsMap stations={stations}/>
  } else {
    content = <span>loading</span>;
  }

  return (
    <div className="app">
      <div className="logo" title="My city's climate">
        <img src={logo} alt="My city's climate"/>
      </div>
      {content}
    </div>
  )
}

export default App
