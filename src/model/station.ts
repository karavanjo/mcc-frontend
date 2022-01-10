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
