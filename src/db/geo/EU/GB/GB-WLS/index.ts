import { node } from '@/db/geo/types'
import c_GB_FLN from '../GB-FLN'
import c_GB_WRX from '../GB-WRX'
import c_GB_POW from '../GB-POW'
import c_GB_MON from '../GB-MON'
import c_GB_NWP from '../GB-NWP'
import c_GB_CRF from '../GB-CRF'
import c_GB_VGL from '../GB-VGL'
import c_GB_BGE from '../GB-BGE'
import c_GB_NTL from '../GB-NTL'
import c_GB_SWA from '../GB-SWA'
import c_GB_CMN from '../GB-CMN'
import c_GB_PEM from '../GB-PEM'
import c_GB_CGN from '../GB-CGN'
import c_GB_GWN from '../GB-GWN'
import c_GB_CWY from '../GB-CWY'
import c_GB_DEN from '../GB-DEN'
import c_GB_AGY from '../GB-AGY'
import c_GB_CAY from '../GB-CAY'
import c_GB_RCT from '../GB-RCT'
import c_GB_BGW from '../GB-BGW'
import c_GB_TOF from '../GB-TOF'
import c_GB_MTY from '../GB-MTY'

const children = [c_GB_FLN, c_GB_WRX, c_GB_POW, c_GB_MON, c_GB_NWP, c_GB_CRF, c_GB_VGL, c_GB_BGE, c_GB_NTL, c_GB_SWA, c_GB_CMN, c_GB_PEM, c_GB_CGN, c_GB_GWN, c_GB_CWY, c_GB_DEN, c_GB_AGY, c_GB_CAY, c_GB_RCT, c_GB_BGW, c_GB_TOF, c_GB_MTY]
const COORDS: number[][][][] = children.flatMap((child) => child.geo.geometry.coordinates)

export default node('GB-WLS', '威尔士', COORDS, children)
