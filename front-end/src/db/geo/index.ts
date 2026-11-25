export type { GeoFeature, GeoNode } from './types'
import type { GeoNode } from './types'
import c_AS from './AS'
import c_EU from './EU'
import c_AF from './AF'
import c_NA from './NA'
import c_SA from './SA'
import c_OC from './OC'

export const GEO_TREE: GeoNode[] = [c_AS, c_EU, c_AF, c_NA, c_SA, c_OC]
