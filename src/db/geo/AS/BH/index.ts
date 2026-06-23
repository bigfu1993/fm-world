import { node } from '@/db/geo/types'
import c_BH_13 from './BH-13'
import c_BH_17 from './BH-17'
import c_BH_14 from './BH-14'
import c_BH_16 from './BH-16'
import c_BH_15 from './BH-15'

const BH_COORDS: number[][][][] = [[[[50.6072,25.8831],[50.5749,25.8068],[50.544,25.8335],[50.4659,25.9655],[50.4895,26.0584],[50.4524,26.1908],[50.4699,26.229],[50.5641,26.2464],[50.5859,26.2407],[50.5578,26.1983],[50.6098,26.1245],[50.6175,26.0023],[50.6072,25.8831]]]]

export default node('BH', '巴林', BH_COORDS, [c_BH_13, c_BH_17, c_BH_14, c_BH_16, c_BH_15])
