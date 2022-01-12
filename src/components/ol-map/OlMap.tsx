import React, { useEffect, useRef } from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import { transform, transformExtent } from 'ol/proj'
import { defaults as defaultControls } from 'ol/control';

import './OlMap.css'

interface OlMapProps {
  onMapCreate?: (map: Map) => void
}

function OlMap(props: OlMapProps) {
  const mapElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current as HTMLDivElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: transform([19.105, 52.107], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6,
        extent: transformExtent([11.51284, 46.31270, 28.18045, 58.36571],
          'EPSG:4326', 'EPSG:3857'),
      }),
      controls: defaultControls()
    })

    if (props.onMapCreate) {
      props.onMapCreate(initialMap)
    }
  }, [])

  return (
    <div ref={mapElement} className="map-container"/>
  )
}

export default React.memo(OlMap, (prev: OlMapProps, next: OlMapProps) => true)
