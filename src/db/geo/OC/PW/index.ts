import { node } from '@/db/geo/types'
import c_PW_350 from './PW-350'
import c_PW_150 from './PW-150'
import c_PW_227 from './PW-227'
import c_PW_224 from './PW-224'
import c_PW_002 from './PW-002'
import c_PW_004 from './PW-004'
import c_PW_226 from './PW-226'
import c_PW_212 from './PW-212'
import c_PW_228 from './PW-228'
import c_PW_214 from './PW-214'
import c_PW_218 from './PW-218'
import c_PW_222 from './PW-222'
import c_PW_050 from './PW-050'
import c_PW_370 from './PW-370'
import c_PW_010 from './PW-010'
import c_PW_100 from './PW-100'

const PW_COORDS: number[][][][] = [[[[131.1724,3.0262],[131.1496,3.0219],[131.135,3.0252],[131.1367,3.0395],[131.1516,3.0541],[131.1724,3.0606],[131.1879,3.0556],[131.1863,3.0421],[131.1724,3.0262]]],[[[134.5954,7.382],[134.5347,7.3606],[134.5063,7.4371],[134.5157,7.5258],[134.556,7.5939],[134.5997,7.6158],[134.6087,7.6236],[134.6512,7.7121],[134.6596,7.6633],[134.6327,7.5013],[134.5982,7.4383],[134.5954,7.382]]]]

export default node('PW', '帕劳', PW_COORDS, [c_PW_350, c_PW_150, c_PW_227, c_PW_224, c_PW_002, c_PW_004, c_PW_226, c_PW_212, c_PW_228, c_PW_214, c_PW_218, c_PW_222, c_PW_050, c_PW_370, c_PW_010, c_PW_100])
