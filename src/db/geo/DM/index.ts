import { node } from '@/db/geo/types'
import c_DM_09 from './DM-09'
import c_DM_03 from './DM-03'
import c_DM_02 from './DM-02'
import c_DM_05 from './DM-05'
import c_DM_11 from './DM-11'
import c_DM_06 from './DM-06'
import c_DM_10 from './DM-10'
import c_DM_04 from './DM-04'
import c_DM_07 from './DM-07'
import c_DM_08 from './DM-08'

const DM_COORDS: number[][][][] = [[[[-61.2817,15.249],[-61.3754,15.2273],[-61.4157,15.3999],[-61.4812,15.5251],[-61.4699,15.6035],[-61.4581,15.6331],[-61.32,15.5851],[-61.2772,15.5267],[-61.2511,15.3731],[-61.2817,15.249]]]]

export default node('DM', '多米尼克', DM_COORDS, [c_DM_09, c_DM_03, c_DM_02, c_DM_05, c_DM_11, c_DM_06, c_DM_10, c_DM_04, c_DM_07, c_DM_08])
