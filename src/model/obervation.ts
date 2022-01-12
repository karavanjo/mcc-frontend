export interface Observation {
  ts: Date
  source: {
    code: number,
    name: string,
    type: 'k' | 's' | 'pp'
  }
  tmax?: number,
  tmin?: number,
  tavg?: number,
  precip?: number,
  snowd?: number,
  snowt?: number,
  snowfreshd?: number,
  raint?: number,
  rainsnowt?: number,
  cloudt?: number,
}
