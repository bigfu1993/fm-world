import { node } from '@/db/geo/types'
import c_BB_06 from './BB-06'
import c_BB_02 from './BB-02'
import c_BB_09 from './BB-09'
import c_BB_07 from './BB-07'
import c_BB_04 from './BB-04'
import c_BB_08 from './BB-08'
import c_BB_01 from './BB-01'
import c_BB_10 from './BB-10'
import c_BB_05 from './BB-05'
import c_BB_03 from './BB-03'
import c_BB_11 from './BB-11'

const BB_COORDS: number[][][][] = [[[[-59.4933,13.082],[-59.5219,13.0622],[-59.6113,13.1021],[-59.6428,13.1503],[-59.6467,13.3031],[-59.5916,13.3177],[-59.4879,13.1968],[-59.4276,13.1528],[-59.4933,13.082]]]]

export default node('BB', '巴巴多斯', BB_COORDS, [c_BB_06, c_BB_02, c_BB_09, c_BB_07, c_BB_04, c_BB_08, c_BB_01, c_BB_10, c_BB_05, c_BB_03, c_BB_11])
