import { getLabel } from '@/components/LanguageLabel/LabelMap'
import type { LanguageCode } from '@/types/system'

export interface GeoMapGeometry {
  type: 'Polygon' | 'MultiPolygon'
  coordinates: number[][][] | number[][][][]
}

export interface GeoMapFeature {
  geometry: GeoMapGeometry
}

export interface GeoMapRegion {
  code: string
  geo: GeoMapFeature
}

export interface GeoMapMarker {
  lat: number
  lng: number
  label: string
}

interface GeoMapProps {
  regions: GeoMapRegion[]
  publishedCodes?: string[]
  activeCodes?: string[]
  marker?: GeoMapMarker
  langKey: LanguageCode
  width?: number
  height?: number
  fillColor?: string
  strokeColor?: string
  publishedFillColor?: string
  publishedStrokeColor?: string
  activeFillColor?: string
  activeStrokeColor?: string
  strokeWidth?: number
}

function toPolygons(geo?: GeoMapFeature): number[][][][] {
  if (!geo) return []
  const { geometry } = geo
  if (geometry.type === 'MultiPolygon') return geometry.coordinates as number[][][][]
  if (geometry.type === 'Polygon') return [geometry.coordinates as number[][][]]
  return []
}

const KM_PER_DEGREE = 111
const NICE_SCALE_STEPS_KM = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]

function pickNiceScaleKm(maxKm: number): number {
  let chosen = NICE_SCALE_STEPS_KM[0]
  for (const step of NICE_SCALE_STEPS_KM) {
    if (step <= maxKm) chosen = step
  }
  return chosen
}

export default function GeoMap({
  regions,
  publishedCodes = [],
  activeCodes = [],
  marker,
  langKey,
  width = 480,
  height = 420,
  fillColor = 'rgba(180, 180, 180, 0.06)',
  strokeColor = 'rgba(180, 180, 180, 0.45)',
  publishedFillColor = 'rgba(64, 150, 255, 0.15)',
  publishedStrokeColor = '#4096ff',
  activeFillColor = 'rgba(250, 140, 22, 0.2)',
  activeStrokeColor = '#fa8c16',
  strokeWidth = 1,
}: GeoMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setZoom((z) => {
        const next = z * (e.deltaY > 0 ? 0.9 : 1.1)
        return Math.min(8, Math.max(0.5, next))
      })
    }
    canvas.addEventListener('wheel', handleWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    const allPolygons = regions.flatMap((region) => toPolygons(region.geo))

    if (allPolygons.length === 0 && !marker) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
      ctx.font = '12px sans-serif'
      ctx.fillText(getLabel('pleaseSelectRegionHint', langKey), 16, height / 2)
      return
    }

    const lngs = allPolygons.flatMap((poly) => poly[0].map((p) => p[0]))
    const lats = allPolygons.flatMap((poly) => poly[0].map((p) => p[1]))
    if (marker) {
      lngs.push(marker.lng)
      lats.push(marker.lat)
    }
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const padding = 16
    const lngRange = maxLng - minLng || 1
    const latRange = maxLat - minLat || 1
    const baseScale = Math.min((width - padding * 2) / lngRange, (height - padding * 2) / latRange)
    const scale = baseScale * zoom
    const offsetX = (width - lngRange * scale) / 2
    const offsetY = (height - latRange * scale) / 2

    const toXY = (lng: number, lat: number): [number, number] => [
      offsetX + (lng - minLng) * scale,
      height - offsetY - (lat - minLat) * scale,
    ]

    const drawRegions = (list: GeoMapRegion[], fill: string, stroke: string) => {
      ctx.fillStyle = fill
      ctx.strokeStyle = stroke
      ctx.lineWidth = strokeWidth
      list.forEach((region) => {
        toPolygons(region.geo).forEach((poly) => {
          poly.forEach((ring, ringIndex) => {
            ctx.beginPath()
            ring.forEach(([lng, lat], index) => {
              const [x, y] = toXY(lng, lat)
              if (index === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            })
            ctx.closePath()
            if (ringIndex === 0) ctx.fill()
            ctx.stroke()
          })
        })
      })
    }

    const publishedSet = new Set(publishedCodes)
    const activeSet = new Set(activeCodes)
    drawRegions(
      regions.filter((r) => !publishedSet.has(r.code) && !activeSet.has(r.code)),
      fillColor,
      strokeColor,
    )
    drawRegions(
      regions.filter((r) => publishedSet.has(r.code) && !activeSet.has(r.code)),
      publishedFillColor,
      publishedStrokeColor,
    )
    drawRegions(regions.filter((r) => activeSet.has(r.code)), activeFillColor, activeStrokeColor)

    if (marker) {
      const [x, y] = toXY(marker.lng, marker.lat)
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#ff4d4f'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.fillStyle = '#000'
      ctx.font = '12px sans-serif'
      ctx.fillText(marker.label, x + 8, y - 8)
    }

    const centerLat = (minLat + maxLat) / 2
    const kmPerLngDegree = KM_PER_DEGREE * Math.cos((centerLat * Math.PI) / 180)
    const pxPerKm = scale / kmPerLngDegree
    const maxBarPx = 100
    const niceKm = pickNiceScaleKm(maxBarPx / pxPerKm)
    const barPx = niceKm * pxPerKm
    const barLeft = 16
    const barBottom = height - 16

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(barLeft, barBottom)
    ctx.lineTo(barLeft + barPx, barBottom)
    ctx.moveTo(barLeft, barBottom - 4)
    ctx.lineTo(barLeft, barBottom + 4)
    ctx.moveTo(barLeft + barPx, barBottom - 4)
    ctx.lineTo(barLeft + barPx, barBottom + 4)
    ctx.stroke()

    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)'
    ctx.font = '11px sans-serif'
    ctx.fillText(`${niceKm} km`, barLeft, barBottom - 8)
    ctx.fillText(`${zoom.toFixed(1)}x`, barLeft, barBottom - 22)
  }, [
    regions,
    publishedCodes,
    activeCodes,
    marker,
    langKey,
    width,
    height,
    zoom,
    fillColor,
    strokeColor,
    publishedFillColor,
    publishedStrokeColor,
    activeFillColor,
    activeStrokeColor,
    strokeWidth,
  ])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid #f0f0f0', background: '#fff' }}
    />
  )
}
