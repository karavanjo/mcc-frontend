import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

export interface Station {
  code: number
  name: string
  type: 'k' | 's' | 'pp'
  location: Point
}

export interface Point {
  coordinates: [number, number]
  type: 'Point'
}

export interface StationFeatureAttrs {
  code: number
  name: string
  type: 'k' | 's' | 'pp'
}

export interface FeatureStation extends Feature<Geometry> {
  type: string
}
