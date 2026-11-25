import { node } from '@/db/geo/types'
import c_AG from './AG'
import c_BB from './BB'
import c_BS from './BS'
import c_BZ from './BZ'
import c_CA from './CA'
import c_CR from './CR'
import c_CU from './CU'
import c_DM from './DM'
import c_DO from './DO'
import c_GD from './GD'
import c_GT from './GT'
import c_HN from './HN'
import c_HT from './HT'
import c_JM from './JM'
import c_KN from './KN'
import c_LC from './LC'
import c_MX from './MX'
import c_NI from './NI'
import c_PA from './PA'
import c_SV from './SV'
import c_TT from './TT'
import c_US from './US'
import c_VC from './VC'

const children = [c_AG, c_BB, c_BS, c_BZ, c_CA, c_CR, c_CU, c_DM, c_DO, c_GD, c_GT, c_HN, c_HT, c_JM, c_KN, c_LC, c_MX, c_NI, c_PA, c_SV, c_TT, c_US, c_VC]
const COORDS = children.flatMap((c) => c.geo.geometry.coordinates)

export default node('NA', '北美洲', COORDS, children)
