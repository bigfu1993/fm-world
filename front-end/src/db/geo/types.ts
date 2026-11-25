export interface GeoFeature {
  type: 'Feature'
  properties: { name: string }
  geometry: {
    type: 'MultiPolygon'
    coordinates: number[][][][]
  }
  // 面积质心 [lng, lat]，比 bbox 中心更准确（按各多边形块的面积加权，适合处理飞地/海岛等多块图形）
  centroid: [number, number]
}

export interface GeoNode {
  code: string
  name: string
  geo: GeoFeature
  children?: GeoNode[]
}

// 单个环（首尾不要求闭合）的有符号面积与质心，基于多边形质心的标准 shoelace 公式
function ringAreaAndCentroid(ring: number[][]): { area: number; cx: number; cy: number } {
  let area = 0
  let cx = 0
  let cy = 0
  const n = ring.length
  for (let i = 0; i < n; i++) {
    const [x0, y0] = ring[i]
    const [x1, y1] = ring[(i + 1) % n]
    const cross = x0 * y1 - x1 * y0
    area += cross
    cx += (x0 + x1) * cross
    cy += (y0 + y1) * cross
  }
  area /= 2
  if (area === 0) return { area: 0, cx: ring[0][0], cy: ring[0][1] }
  return { area, cx: cx / (6 * area), cy: cy / (6 * area) }
}

// 单个多边形（rings[0] 为外环，其余为内环/洞）的面积与质心，内环面积要从外环里扣除
function polygonAreaAndCentroid(rings: number[][][]): { area: number; cx: number; cy: number } {
  let totalArea = 0
  let sumCx = 0
  let sumCy = 0
  rings.forEach((ring, index) => {
    const { area, cx, cy } = ringAreaAndCentroid(ring)
    const sign = index === 0 ? 1 : -1
    const a = Math.abs(area)
    totalArea += sign * a
    sumCx += sign * a * cx
    sumCy += sign * a * cy
  })
  return { area: totalArea, cx: sumCx / totalArea, cy: sumCy / totalArea }
}

// MultiPolygon 的面积质心：按各多边形块（飞地/海岛等）的面积加权平均，落点更贴近真实陆地重心
function multiPolygonCentroid(polygons: number[][][][]): [number, number] {
  let totalArea = 0
  let sumCx = 0
  let sumCy = 0
  for (const rings of polygons) {
    if (!rings[0] || rings[0].length < 3) continue
    const { area, cx, cy } = polygonAreaAndCentroid(rings)
    const a = Math.abs(area)
    totalArea += a
    sumCx += a * cx
    sumCy += a * cy
  }
  if (totalArea === 0) {
    const firstPoint = polygons[0]?.[0]?.[0] ?? [0, 0]
    return [firstPoint[0], firstPoint[1]]
  }
  return [sumCx / totalArea, sumCy / totalArea]
}

export function multiPolygonGeo(name: string, coordinates: number[][][][]): GeoFeature {
  return {
    type: 'Feature',
    properties: { name },
    geometry: { type: 'MultiPolygon', coordinates },
    centroid: multiPolygonCentroid(coordinates),
  }
}

export function node(code: string, name: string, coordinates: number[][][][], children?: GeoNode[]): GeoNode {
  return { code, name, geo: multiPolygonGeo(name, coordinates), children }
}
