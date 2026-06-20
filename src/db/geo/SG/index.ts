import { node } from '@/db/geo/types'
import c_SG_05 from './SG-05'
import c_SG_01 from './SG-01'
import c_SG_04 from './SG-04'
import c_SG_02 from './SG-02'
import c_SG_03 from './SG-03'

const SG_COORDS: number[][][][] = [[[[103.9697,1.3314],[103.8199,1.2654],[103.6502,1.3255],[103.7053,1.4234],[103.818,1.4471],[103.909,1.416],[103.9608,1.3922],[103.9964,1.3652],[103.9697,1.3314]]]]

export default node('SG', '新加坡', SG_COORDS, [c_SG_05, c_SG_01, c_SG_04, c_SG_02, c_SG_03])
