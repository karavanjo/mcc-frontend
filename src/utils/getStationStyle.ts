import { Feature } from 'ol'
import { Geometry } from 'ol/geom'
import { FeatureStation } from '../model/station'

import RenderFeature from 'ol/render/Feature';
import { Circle, Fill, Stroke, Style } from 'ol/style';

const STYLES = {
  climate: new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({
        color: '#FC9292'
      }),
      stroke: new Stroke({
        color: '#C86767',
        width: 1,
      }),
    }),
  }),
  perception: new Style({
    image: new Circle({
      radius: 3,
      fill: new Fill({
        color: '#c0ddff'
      }),
      stroke: new Stroke({
        color: '#5f97dc',
        width: 1,
      }),
    }),
  }),
  synoptic: new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: '#d0ffc0'
      }),
      stroke: new Stroke({
        color: '#74d350',
        width: 1,
      }),
    }),
  }),
}


export const getStationStyle: (feature: Feature<Geometry> | RenderFeature, resolution: number) => Style =
  (feature: Feature<Geometry> | RenderFeature) => {
    if ((feature as FeatureStation).type == 'k') {
      return STYLES.climate
    } else if ((feature as FeatureStation).type == 's') {
      return STYLES.synoptic
    } else if ((feature as FeatureStation).type == 'pp') {
      return STYLES.perception
    }
    return new Style()
  }
