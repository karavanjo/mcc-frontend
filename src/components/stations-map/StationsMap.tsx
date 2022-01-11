import React from 'react';
import OlMap from '../ol-map';
import { FeatureStation, Station } from '../../model/station';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { transform } from 'ol/proj';
import { getStationStyle } from '../../utils/getStationStyle';

interface StationsMapProps {
  stations: Station[]
}

function StationsMap(props: StationsMapProps) {
  const { stations } = props
  const features: FeatureStation[] = []

  if (stations && stations.length > 0) {
    stations.forEach(s => {
      const feature = new Feature<Geometry>({
        geometry: new Point(transform(s.location.coordinates,
          'EPSG:4326', 'EPSG:3857')),
        name: s.name
      }) as FeatureStation

      feature.type  = s.type

      feature.setProperties({
        code: s.code,
        name: s.name,
        type: s.type
      });

      features.push(feature)
    });
  }

  return <OlMap features={features} getStyle={getStationStyle}/>
}

export default StationsMap
