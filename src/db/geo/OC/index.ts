import { node } from '@/db/geo/types'
import c_AU from './AU'
import c_FJ from './FJ'
import c_FM from './FM'
import c_KI from './KI'
import c_MH from './MH'
import c_NR from './NR'
import c_NZ from './NZ'
import c_PG from './PG'
import c_PW from './PW'
import c_SB from './SB'
import c_TO from './TO'
import c_TV from './TV'
import c_VU from './VU'
import c_WS from './WS'

const children = [c_AU, c_FJ, c_FM, c_KI, c_MH, c_NR, c_NZ, c_PG, c_PW, c_SB, c_TO, c_TV, c_VU, c_WS]
const COORDS = children.flatMap((c) => c.geo.geometry.coordinates)

export default node('OC', '大洋洲', COORDS, children)
