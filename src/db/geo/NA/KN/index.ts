import { node } from '@/db/geo/types'
import c_KN_10 from './KN-10'
import c_KN_07 from './KN-07'
import c_KN_04 from './KN-04'
import c_KN_05 from './KN-05'
import c_KN_12 from './KN-12'
import c_KN_09 from './KN-09'
import c_KN_02 from './KN-02'
import c_KN_13 from './KN-13'
import c_KN_14 from './KN-14'
import c_KN_03 from './KN-03'
import c_KN_11 from './KN-11'
import c_KN_08 from './KN-08'
import c_KN_01 from './KN-01'
import c_KN_06 from './KN-06'

const KN_COORDS: number[][][][] = [[[[-62.5322,17.1219],[-62.5824,17.1006],[-62.6249,17.1296],[-62.6153,17.1991],[-62.5747,17.201],[-62.5342,17.1701],[-62.5322,17.1219]]],[[[-62.6307,17.24],[-62.6565,17.2244],[-62.702,17.286],[-62.7755,17.3028],[-62.8389,17.3393],[-62.8405,17.3471],[-62.8394,17.3653],[-62.8271,17.3864],[-62.7946,17.4026],[-62.7137,17.3533],[-62.6758,17.2909],[-62.6405,17.2623],[-62.6307,17.24]]]]

export default node('KN', '圣基茨和尼维斯', KN_COORDS, [c_KN_10, c_KN_07, c_KN_04, c_KN_05, c_KN_12, c_KN_09, c_KN_02, c_KN_13, c_KN_14, c_KN_03, c_KN_11, c_KN_08, c_KN_01, c_KN_06])
