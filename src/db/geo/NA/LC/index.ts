import { node } from '@/db/geo/types'
import c_LC_06 from './LC-06'
import c_LC_02 from './LC-02'
import c_LC_01 from './LC-01'
import c_LC_10 from './LC-10'
import c_LC_03 from './LC-03'
import c_LC_07 from './LC-07'
import c_LC_11 from './LC-11'
import c_LC_08 from './LC-08'
import c_LC_09 from './LC-09'
import c_LC_05 from './LC-05'
import c_LC_04 from './LC-04'

const LC_COORDS: number[][][][] = [[[[-60.8952,13.822],[-60.9514,13.7176],[-61.0606,13.7831],[-61.0731,13.8656],[-61.0636,13.9156],[-60.9967,14.0109],[-60.9446,14.0729],[-60.9081,14.0934],[-60.8868,14.0111],[-60.8952,13.822]]]]

export default node('LC', '圣卢西亚', LC_COORDS, [c_LC_06, c_LC_02, c_LC_01, c_LC_10, c_LC_03, c_LC_07, c_LC_11, c_LC_08, c_LC_09, c_LC_05, c_LC_04])
