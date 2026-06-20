export interface GeoFeature {
  type: 'Feature'
  properties: { name: string }
  geometry: {
    type: 'MultiPolygon'
    coordinates: number[][][][]
  }
}

export interface GeoNode {
  code: string
  name: string
  geo: GeoFeature
  children?: GeoNode[]
}

export function multiPolygonGeo(name: string, coordinates: number[][][][]): GeoFeature {
  return {
    type: 'Feature',
    properties: { name },
    geometry: { type: 'MultiPolygon', coordinates },
  }
}

export function node(code: string, name: string, coordinates: number[][][][], children?: GeoNode[]): GeoNode {
  return { code, name, geo: multiPolygonGeo(name, coordinates), children }
}
