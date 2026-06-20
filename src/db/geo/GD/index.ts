import { node } from '@/db/geo/types'
import c_GD_03 from './GD-03'
import c_GD_02 from './GD-02'
import c_GD_01 from './GD-01'
import c_GD_06 from './GD-06'
import c_GD_05 from './GD-05'
import c_GD_04 from './GD-04'
import c_GD_10 from './GD-10'

const GD_COORDS: number[][][][] = [[[[-61.7155,12.0126],[-61.7822,12.0084],[-61.7558,12.0455],[-61.7499,12.1084],[-61.715,12.1852],[-61.6604,12.237],[-61.607,12.2233],[-61.6271,12.054],[-61.7155,12.0126]]]]

export default node('GD', '格林纳达', GD_COORDS, [c_GD_03, c_GD_02, c_GD_01, c_GD_06, c_GD_05, c_GD_04, c_GD_10])
