export interface GeoRegion {
  code: string
  geo: object
}

export const GEO_LIST: GeoRegion[] = [
  {
    code: 'JP',
    geo: {
      type: 'Feature',
      properties: { name: 'Japan' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [129.5, 31.0],
            [145.8, 31.0],
            [145.8, 45.5],
            [129.5, 45.5],
            [129.5, 31.0],
          ],
        ],
      },
    },
  },
  {
    code: 'KR*KR-11*KR-SEL',
    geo: {
      type: 'Feature',
      properties: { name: 'Seoul' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [126.76, 37.41],
            [127.18, 37.41],
            [127.18, 37.7],
            [126.76, 37.7],
            [126.76, 37.41],
          ],
        ],
      },
    },
  },
]
