import { node } from '@/db/geo/types'
import c_WS_GE from './WS-GE'
import c_WS_GI from './WS-GI'
import c_WS_VS from './WS-VS'
import c_WS_SA from './WS-SA'
import c_WS_PA from './WS-PA'
import c_WS_FA from './WS-FA'
import c_WS_AT from './WS-AT'
import c_WS_VF from './WS-VF'
import c_WS_TU from './WS-TU'
import c_WS_AA from './WS-AA'
import c_WS_AL from './WS-AL'

const WS_COORDS: number[][][][] = [[[[-172.3335,-13.4652],[-172.2215,-13.5596],[-172.1769,-13.6847],[-172.225,-13.8043],[-172.3309,-13.7747],[-172.4845,-13.8002],[-172.5357,-13.7917],[-172.6588,-13.6448],[-172.7441,-13.5787],[-172.7785,-13.5168],[-172.6696,-13.5238],[-172.5109,-13.4828],[-172.3335,-13.4652]]],[[[-171.4541,-14.0465],[-171.7282,-14.0473],[-171.8638,-14.0021],[-171.9119,-14.0017],[-172.0281,-13.9068],[-172.0459,-13.8571],[-171.9849,-13.8244],[-171.8582,-13.8071],[-171.6039,-13.8792],[-171.5654,-13.9431],[-171.5069,-13.9499],[-171.4614,-13.9776],[-171.4496,-14.0225],[-171.4541,-14.0465]]]]

export default node('WS', '萨摩亚', WS_COORDS, [c_WS_GE, c_WS_GI, c_WS_VS, c_WS_SA, c_WS_PA, c_WS_FA, c_WS_AT, c_WS_VF, c_WS_TU, c_WS_AA, c_WS_AL])
