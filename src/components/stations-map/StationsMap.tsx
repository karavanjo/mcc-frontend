import React from 'react';
import Map from 'ol/Map'

import { FeatureStation, FeatureStationSet, Station } from '../../model/station';
import { getLayerZIndex, getStationStyle } from '../../utils/getStationStyle';
import { stationsToFeatures } from '../../utils/stationsToFeatures';

import OlMap from '../ol-map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

interface StationsMapProps {
  stations: Station[],
  onClickFeatures?: (feature: FeatureStation[]) => void
}


class StationsMap extends React.Component<StationsMapProps> {
  map: Map | undefined
  stationsLayer = false

  constructor(props: StationsMapProps) {
    super(props);
  }

  componentDidUpdate(prevProps: StationsMapProps) {
    if (prevProps.stations !== this.props.stations && !this.stationsLayer && this.map) {
      this.buildStationsLayer();
    }
  }

  buildStationsLayer = () => {
    if (!this.map) {
      return;
    }

    const map = this.map;
    const featuresSet: FeatureStationSet = stationsToFeatures(this.props.stations)

    let k: keyof typeof featuresSet;
    for (k in featuresSet) {
      const features = featuresSet[k];

      const stationsLayer = new VectorLayer({
        source: new VectorSource({
          features
        }),
        style: getStationStyle
      })
      stationsLayer.setZIndex(getLayerZIndex(k))
      map.addLayer(stationsLayer)

      if (k == 'k') {
        map.getView().fit(stationsLayer.getSource().getExtent(), {
          padding: [50, 50, 50, 50]
        })
      }
    }

    this.stationsLayer = true

    map.on('pointermove', e => {
      const pixel = map.getEventPixel(e.originalEvent)
      const hit = map.hasFeatureAtPixel(pixel)
      map.getViewport().style.cursor = hit ? 'pointer' : ''
    })

    map.on('click', e => {
      const { onClickFeatures } = this.props
      if (!onClickFeatures) return
      const features: FeatureStation[] = [];
      const pixel = map.getEventPixel(e.originalEvent)

      map.forEachFeatureAtPixel(e.pixel,
        f => features.push(f as FeatureStation))

      onClickFeatures(features);
    })
  }

  onMapCreate(map: Map) {
    this.map = map
  }

  render() {
    return (
      <OlMap onMapCreate={(map) => this.onMapCreate(map)}/>
    );
  }
}

export default StationsMap
