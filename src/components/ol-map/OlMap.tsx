import React, { useEffect, useRef, useState } from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { transform } from 'ol/proj'
import { Feature, MapBrowserEvent } from 'ol';

import './OlMap.css'
import { Geometry } from 'ol/geom';
import { Style } from 'ol/style';
import RenderFeature from 'ol/render/Feature';

interface OlMapProps {
  features: Feature<any>[],
  getStyle?: (feature: Feature<Geometry> | RenderFeature, resolution: number) => Style
}

function OlMap(props: OlMapProps) {
  const [map, setMap] = useState<Map | null>(null)
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer<any>>()

  const mapElement = useRef<HTMLDivElement | null>(null)

  const mapRef = useRef<Map | null>(null)
  mapRef.current = map

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource()
    })

    if (props.getStyle) {
      vectorLayer.setStyle(props.getStyle)
    }

    const initialMap = new Map({
      target: mapElement.current as HTMLDivElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: transform([19.105, 52.107], 'EPSG:4326', 'EPSG:3857'),
        zoom: 7
      }),
      controls: []
    })

    initialMap.on('click', handleMapClick)

    setMap(initialMap)
    setFeaturesLayer(vectorLayer)
  }, [])

  useEffect(() => {
    if (props.features && props.features.length) {
      featuresLayer?.setSource(
        new VectorSource({
          features: props.features
        })
      )
      // map?.getView().fit(featuresLayer?.getSource().getExtent(), {
      //   padding: [100, 100, 100, 100]
      // })
    }
  }, [props.features])


  const handleMapClick = (event: MapBrowserEvent<any>) => {
    const clickedCoord = mapRef?.current?.getCoordinateFromPixel(event.pixel);
    if (!clickedCoord) return;
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
  }

  return (
    <div ref={mapElement} className="map-container"/>
  )
}

export default OlMap
