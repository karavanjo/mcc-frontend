import { Feature } from 'ol'
import { Geometry } from 'ol/geom'
import { StationFeatureAttrs } from '../model/station'

import RenderFeature from 'ol/render/Feature';
import { Circle, Fill, Stroke, Style } from 'ol/style';


export const getStationStyle: (feature: Feature<Geometry> | RenderFeature, resolution: number) => Style =
  (feature: Feature<Geometry> | RenderFeature) => {
    const attributes: StationFeatureAttrs = feature.getProperties() as StationFeatureAttrs;

    let color = 'gray'
    if (attributes.type == 'k') {
      color = 'red'
    } else if (attributes.type == 's') {
      color = 'green'
    } else if (attributes.type == 'pp') {
      color = 'blue'
    }

    return new Style({
      image: new Circle({
        radius: 3,
        fill: new Fill({}),
        stroke: new Stroke({
          color,
          width: 1,
        }),
      }),
    })
  }
