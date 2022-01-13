import { Observation } from '../model/obervation';
import { Indicator } from '../model/indicator';

export const getIndicators = (observations: Observation[]): Indicator[] => {
  if (observations.length == 0) return []

  const observation = observations[0]
  const indicators: Indicator[] = []

  let k: keyof typeof observation;
  for (k in observation) {
    switch (k) {
      case 'tavg':
        indicators.push({
          key: k,
          name: 'Average Air Temperature, °C'
        })
        break
      case 'tmax':
        indicators.push({
          key: k,
          name: 'Maximum Air Temperature, °C'
        })
        break
      case 'tmin':
        indicators.push({
          key: k,
          name: 'Minimum Air Temperature, °C'
        })
        break
      case 'precip':
        indicators.push({
          key: k,
          name: 'Precipitation, mm'
        })
        break
      case 'snowd':
        indicators.push({
          key: k,
          name: 'Snow Depth, mm'
        })
        break
      default:
        break
    }
  }

  return indicators
}
