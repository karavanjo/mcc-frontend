import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { transform } from 'ol/proj';
import { FeatureStation, FeatureStationSet, Station } from '../model/station';

export const stationsToFeatures = (stations: Station[]) => {
  const featuresSet: FeatureStationSet = {
    k: [],
    s: [],
    pp: []
  }

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

    switch (s.type) {
      case 'k':
        featuresSet.k.push(feature)
        break
      case 'pp':
        featuresSet.pp.push(feature)
        break
      case 's':
        featuresSet.s.push(feature)
        break
      default:
        console.error(`Unknown station type: ${s.type}`)
    }
  });

  return featuresSet
}
