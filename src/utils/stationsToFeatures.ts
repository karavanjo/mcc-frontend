import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { transform } from 'ol/proj';
import { FeatureStation, Station } from '../model/station';

export const stationsToFeatures = (stations: Station[]) => {
  const features: FeatureStation[] = []

  stations.forEach(s => {
    const feature = new Feature<Geometry>({
      geometry: new Point(transform(s.location.coordinates,
        'EPSG:4326', 'EPSG:3857')),
      name: s.name
    }) as FeatureStation

    feature.type = s.type

    feature.setProperties({
      code: s.code,
      name: s.name,
      type: s.type
    });

    features.push(feature)
  });

  return features
}
