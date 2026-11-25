import { node } from '@/db/geo/types'
import c_SM_09 from './SM-09'
import c_SM_03 from './SM-03'
import c_SM_04 from './SM-04'
import c_SM_08 from './SM-08'
import c_SM_05 from './SM-05'
import c_SM_02 from './SM-02'
import c_SM_07 from './SM-07'
import c_SM_01 from './SM-01'
import c_SM_06 from './SM-06'

const SM_00_COORDS: number[][][][] = [[[[12.4853,43.9014],[12.4264,43.8941],[12.3969,43.9346],[12.4411,43.9824],[12.5037,43.9897],[12.5146,43.953],[12.4853,43.9014]]]]

export default node('SM-00', '*圣马力诺', SM_00_COORDS, [c_SM_09, c_SM_03, c_SM_04, c_SM_08, c_SM_05, c_SM_02, c_SM_07, c_SM_01, c_SM_06])
