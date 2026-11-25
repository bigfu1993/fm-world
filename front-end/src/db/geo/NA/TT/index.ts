import { node } from '@/db/geo/types'
import c_TT_TUP from './TT-TUP'
import c_TT_SJL from './TT-SJL'
import c_TT_DMN from './TT-DMN'
import c_TT_POS from './TT-POS'
import c_TT_CHA from './TT-CHA'
import c_TT_CTT from './TT-CTT'
import c_TT_SFO from './TT-SFO'
import c_TT_PED from './TT-PED'
import c_TT_SIP from './TT-SIP'
import c_TT_PTF from './TT-PTF'
import c_TT_PRT from './TT-PRT'
import c_TT_RCM from './TT-RCM'
import c_TT_SGE from './TT-SGE'
import c_TT_ETO from './TT-ETO'
import c_TT_WTO from './TT-WTO'
import c_TT_ARI from './TT-ARI'

const TT_COORDS: number[][][][] = [[[[-60.7563,11.1785],[-60.8106,11.1686],[-60.8043,11.2084],[-60.7089,11.2772],[-60.5628,11.3235],[-60.5255,11.3254],[-60.5465,11.2637],[-60.7563,11.1785]]],[[[-61.0121,10.1343],[-61.1743,10.078],[-61.5967,10.0646],[-61.7717,10.0851],[-61.9061,10.0691],[-61.6615,10.1917],[-61.6327,10.2434],[-61.5289,10.2531],[-61.4993,10.2686],[-61.4647,10.539],[-61.4783,10.6034],[-61.4988,10.6389],[-61.5409,10.6645],[-61.6353,10.6994],[-61.6512,10.7181],[-61.5918,10.7479],[-61.4648,10.7645],[-61.37,10.7968],[-61.1737,10.8033],[-61.0785,10.8319],[-60.9176,10.8402],[-60.9967,10.7162],[-61.0337,10.6699],[-61.0193,10.5581],[-61.0375,10.4823],[-61.0164,10.3864],[-60.9685,10.3234],[-60.9996,10.2615],[-61.0041,10.1678],[-61.0121,10.1343]]]]

export default node('TT', '特立尼达和多巴哥', TT_COORDS, [c_TT_TUP, c_TT_SJL, c_TT_DMN, c_TT_POS, c_TT_CHA, c_TT_CTT, c_TT_SFO, c_TT_PED, c_TT_SIP, c_TT_PTF, c_TT_PRT, c_TT_RCM, c_TT_SGE, c_TT_ETO, c_TT_WTO, c_TT_ARI])
