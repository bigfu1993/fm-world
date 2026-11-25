import { node } from '@/db/geo/types'
import c_MU_RR from './MU-RR'
import c_MU_PA from './MU-PA'
import c_MU_PL from './MU-PL'
import c_MU_BL from './MU-BL'
import c_MU_SA from './MU-SA'
import c_MU_GP from './MU-GP'
import c_MU_FL from './MU-FL'
import c_MU_AG from './MU-AG'
import c_MU_RO from './MU-RO'
import c_MU_MO from './MU-MO'
import c_MU_PW from './MU-PW'
import c_MU_BR from './MU-BR'
import c_MU_QB from './MU-QB'
import c_MU_VP from './MU-VP'
import c_MU_CU from './MU-CU'

const MU_COORDS: number[][][][] = [[[[57.6513,-20.4849],[57.5248,-20.5132],[57.3833,-20.5037],[57.3283,-20.45],[57.3177,-20.4276],[57.3651,-20.4064],[57.3621,-20.3376],[57.3857,-20.2286],[57.416,-20.1838],[57.4864,-20.1439],[57.515,-20.056],[57.5758,-19.9972],[57.6565,-19.9899],[57.7372,-20.0984],[57.792,-20.2126],[57.7807,-20.327],[57.725,-20.3688],[57.7066,-20.4349],[57.6513,-20.4849]]]]

export default node('MU', '毛里求斯', MU_COORDS, [c_MU_RR, c_MU_PA, c_MU_PL, c_MU_BL, c_MU_SA, c_MU_GP, c_MU_FL, c_MU_AG, c_MU_RO, c_MU_MO, c_MU_PW, c_MU_BR, c_MU_QB, c_MU_VP, c_MU_CU])
