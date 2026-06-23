import { node } from '@/db/geo/types'
import c_AR from './AR'
import c_BO from './BO'
import c_BR from './BR'
import c_CL from './CL'
import c_CO from './CO'
import c_EC from './EC'
import c_GY from './GY'
import c_PE from './PE'
import c_PY from './PY'
import c_SR from './SR'
import c_UY from './UY'
import c_VE from './VE'

const children = [c_AR, c_BO, c_BR, c_CL, c_CO, c_EC, c_GY, c_PE, c_PY, c_SR, c_UY, c_VE]
const COORDS = children.flatMap((c) => c.geo.geometry.coordinates)

export default node('SA', '南美洲', COORDS, children)
