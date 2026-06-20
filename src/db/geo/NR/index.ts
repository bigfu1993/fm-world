import { node } from '@/db/geo/types'
import c_NR_03 from './NR-03'
import c_NR_09 from './NR-09'
import c_NR_05 from './NR-05'
import c_NR_13 from './NR-13'
import c_NR_12 from './NR-12'
import c_NR_08 from './NR-08'
import c_NR_01 from './NR-01'
import c_NR_06 from './NR-06'
import c_NR_14 from './NR-14'
import c_NR_11 from './NR-11'
import c_NR_04 from './NR-04'
import c_NR_10 from './NR-10'
import c_NR_02 from './NR-02'
import c_NR_07 from './NR-07'

const NR_COORDS: number[][][][] = [[[[166.9584,-0.5166],[166.939,-0.5508],[166.9164,-0.5465],[166.907,-0.5237],[166.9136,-0.4991],[166.939,-0.4894],[166.9557,-0.497],[166.9584,-0.5166]]]]

export default node('NR', '瑙鲁', NR_COORDS, [c_NR_03, c_NR_09, c_NR_05, c_NR_13, c_NR_12, c_NR_08, c_NR_01, c_NR_06, c_NR_14, c_NR_11, c_NR_04, c_NR_10, c_NR_02, c_NR_07])
