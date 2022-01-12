import React from 'react';
import Map from 'ol/Map'

import { FeatureStation, Station } from '../../model/station';
import { getStationStyle } from '../../utils/getStationStyle';
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
  stationsLayer: VectorLayer<any> | undefined

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
    const features = stationsToFeatures(this.props.stations)

    const stationsLayer = new VectorLayer({
      source: new VectorSource({
        features
      }),
      style: getStationStyle
    })

    map.addLayer(stationsLayer)

    map.getView().fit(stationsLayer.getSource().getExtent(), {
      padding: [50, 50, 50, 50]
    })

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

    this.stationsLayer = stationsLayer;
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
