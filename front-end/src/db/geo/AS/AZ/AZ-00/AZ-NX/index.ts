import { node } from '@/db/geo/types'
import c_AZ_BAB from './AZ-BAB'
import c_AZ_CUL from './AZ-CUL'
import c_AZ_KAN from './AZ-KAN'
import c_AZ_ORD from './AZ-ORD'
import c_AZ_SAD from './AZ-SAD'
import c_AZ_SAH from './AZ-SAH'
import c_AZ_SAR from './AZ-SAR'

const COORDS: number[][][][] = [[[[45.5309,39.245],[45.5101,39.2087],[45.4676,39.1878],[45.3806,39.1803],[45.3115,39.2197],[45.3501,39.243],[45.4054,39.2407],[45.4685,39.2442],[45.5309,39.245]]]]

const children = [c_AZ_BAB, c_AZ_CUL, c_AZ_KAN, c_AZ_ORD, c_AZ_SAD, c_AZ_SAH, c_AZ_SAR]
const NX_COORDS: number[][][][] = [...COORDS, ...children.flatMap((child) => child.geo.geometry.coordinates)]

export default node('AZ-NX', '纳希切万', NX_COORDS, children)
