import { Button } from 'antd'
import { UndoOutlined } from '@ant-design/icons'
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
  provinceRegions?: GeoMapRegion[]
  cityRegions?: GeoMapRegion[]
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
  provinceFillColor?: string
  provinceStrokeColor?: string
  provinceZoomThreshold?: number
  cityFillColor?: string
  cityStrokeColor?: string
  cityZoomThreshold?: number
  strokeWidth?: number
}

function toPolygons(geo?: GeoMapFeature): number[][][][] {
  if (!geo) return []
  const { geometry } = geo
  if (geometry.type === 'MultiPolygon') return geometry.coordinates as number[][][][]
  if (geometry.type === 'Polygon') return [geometry.coordinates as number[][][]]
  return []
}

// 把 rgba(...)/rgb(...) 颜色的透明度强制设为 0，用于隐藏非当前层级的背景填充
function transparentize(color: string): string {
  if (color.startsWith('rgba')) return color.replace(/[\d.]+\)\s*$/, '0)')
  if (color.startsWith('rgb(')) return color.replace('rgb(', 'rgba(').replace(')', ', 0)')
  return 'transparent'
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
  provinceRegions = [],
  cityRegions = [],
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
  provinceFillColor = 'rgba(120, 120, 120, 0.04)',
  provinceStrokeColor = 'rgba(100, 100, 100, 0.5)',
  provinceZoomThreshold = 8,
  cityFillColor = 'rgba(80, 80, 80, 0.03)',
  cityStrokeColor = 'rgba(60, 60, 60, 0.5)',
  cityZoomThreshold = 20,
  strokeWidth = 1,
}: GeoMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  // 当前画布中心对应的地理坐标（拖拽时更新），null 表示使用数据范围的几何中心
  const [center, setCenter] = useState<{ lng: number; lat: number } | null>(null)
  const centerRef = useRef(center)
  const scaleRef = useRef(1)
  const defaultCenterRef = useRef({ lng: 0, lat: 0 })

  useEffect(() => {
    centerRef.current = center
  }, [center])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const sensitivity = 0.001
      setZoom((z) => Math.min(50, Math.max(0.5, z - e.deltaY * sensitivity)))
    }

    let dragging = false
    let dragStart = { x: 0, y: 0, lng: 0, lat: 0 }

    const handleMouseDown = (e: MouseEvent) => {
      dragging = true
      const startCenter = centerRef.current ?? defaultCenterRef.current
      dragStart = { x: e.clientX, y: e.clientY, lng: startCenter.lng, lat: startCenter.lat }
      canvas.style.cursor = 'grabbing'
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return
      const scale = scaleRef.current
      setCenter({
        lng: dragStart.lng - (e.clientX - dragStart.x) / scale,
        lat: dragStart.lat + (e.clientY - dragStart.y) / scale,
      })
    }
    const handleMouseUp = () => {
      dragging = false
      canvas.style.cursor = 'grab'
    }

    canvas.style.cursor = 'grab'
    canvas.addEventListener('wheel', handleWheel, { passive: false })
    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      canvas.removeEventListener('wheel', handleWheel)
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
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
    scaleRef.current = scale

    const bboxCenterLng = (minLng + maxLng) / 2
    const bboxCenterLat = (minLat + maxLat) / 2
    defaultCenterRef.current = { lng: bboxCenterLng, lat: bboxCenterLat }
    const effectiveCenter = center ?? defaultCenterRef.current

    const worldWidthPx = 360 * scale
    const wrapsHorizontally = worldWidthPx > width
    const tileOffsets = wrapsHorizontally ? [-worldWidthPx, 0, worldWidthPx] : [0]

    const toXY = (lng: number, lat: number, tileOffsetX = 0): [number, number] => [
      width / 2 + (lng - effectiveCenter.lng) * scale + tileOffsetX,
      height / 2 - (lat - effectiveCenter.lat) * scale,
    ]

    const drawRegions = (list: GeoMapRegion[], fill: string, stroke: string, lineDash: number[] = []) => {
      ctx.fillStyle = fill
      ctx.strokeStyle = stroke
      ctx.lineWidth = strokeWidth
      ctx.setLineDash(lineDash)
      ctx.lineCap = lineDash.length > 0 ? 'round' : 'butt'
      tileOffsets.forEach((tileOffsetX) => {
        list.forEach((region) => {
          toPolygons(region.geo).forEach((poly) => {
            poly.forEach((ring, ringIndex) => {
              ctx.beginPath()
              ring.forEach(([lng, lat], index) => {
                const [x, y] = toXY(lng, lat, tileOffsetX)
                if (index === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
              })
              ctx.closePath()
              if (ringIndex === 0) ctx.fill()
              ctx.stroke()
            })
          })
        })
      })
    }

    const showProvinces = zoom >= provinceZoomThreshold && provinceRegions.length > 0
    const showCities = zoom >= cityZoomThreshold && cityRegions.length > 0
    // 当前最细的层级才显示背景填充色，更粗的层级只保留边界线（透明填充）
    const currentLevel: 'country' | 'province' | 'city' = showCities
      ? 'city'
      : showProvinces
        ? 'province'
        : 'country'

    const publishedSet = new Set(publishedCodes)
    const activeSet = new Set(activeCodes)
    const countryFill = currentLevel === 'country' ? fillColor : transparentize(fillColor)
    const countryPublishedFill = currentLevel === 'country' ? publishedFillColor : transparentize(publishedFillColor)
    drawRegions(
      regions.filter((r) => !publishedSet.has(r.code) && !activeSet.has(r.code)),
      countryFill,
      strokeColor,
    )
    drawRegions(
      regions.filter((r) => publishedSet.has(r.code) && !activeSet.has(r.code)),
      countryPublishedFill,
      publishedStrokeColor,
    )
    drawRegions(regions.filter((r) => activeSet.has(r.code)), activeFillColor, activeStrokeColor)

    if (showProvinces) {
      const provinceFill = currentLevel === 'province' ? provinceFillColor : transparentize(provinceFillColor)
      drawRegions(
        provinceRegions.filter((r) => !activeSet.has(r.code)),
        provinceFill,
        provinceStrokeColor,
        [6, 4],
      )
      drawRegions(
        provinceRegions.filter((r) => activeSet.has(r.code)),
        activeFillColor,
        activeStrokeColor,
        [6, 4],
      )
    }

    if (showCities) {
      drawRegions(cityRegions.filter((r) => !activeSet.has(r.code)), cityFillColor, cityStrokeColor, [1, 4])
      drawRegions(cityRegions.filter((r) => activeSet.has(r.code)), activeFillColor, activeStrokeColor, [1, 4])
    }

    ctx.setLineDash([])
    ctx.lineCap = 'butt'

    if (marker) {
      tileOffsets.forEach((tileOffsetX) => {
        const [x, y] = toXY(marker.lng, marker.lat, tileOffsetX)
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
      })
    }

    const kmPerLngDegree = KM_PER_DEGREE * Math.cos((effectiveCenter.lat * Math.PI) / 180)
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
    provinceRegions,
    cityRegions,
    publishedCodes,
    activeCodes,
    marker,
    langKey,
    width,
    height,
    zoom,
    center,
    fillColor,
    strokeColor,
    publishedFillColor,
    publishedStrokeColor,
    activeFillColor,
    activeStrokeColor,
    provinceFillColor,
    provinceStrokeColor,
    provinceZoomThreshold,
    cityFillColor,
    cityStrokeColor,
    cityZoomThreshold,
    strokeWidth,
  ])

  const handleReset = () => {
    setZoom(1)
    setCenter(null)
  }

  return (
    <div style={{ position: 'relative', width, height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: '1px solid #f0f0f0', background: '#fff' }}
      />
      <Button
        size="small"
        icon={<UndoOutlined />}
        onClick={handleReset}
        title={getLabel('resetMapView', langKey)}
        style={{ position: 'absolute', right: 8, bottom: 8 }}
      />
    </div>
  )
}
