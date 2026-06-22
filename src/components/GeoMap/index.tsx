import { Button } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import LanguageLabel from '@/components/LanguageLabel';
import { getLabel, type LabelKey } from '@/components/LanguageLabel/LabelMap';
import type { LanguageCode } from '@/types/system';

export interface GeoMapGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}

export interface GeoMapFeature {
  geometry: GeoMapGeometry;
  properties?: { name: string; names?: Record<string, string> };
  centroid?: [number, number];
}

export interface GeoMapRegion {
  code: string;
  geo: GeoMapFeature;
}

export interface GeoMapMarker {
  lat: number;
  lng: number;
  label: string;
}

export interface GeoMapFocus {
  lng: number;
  lat: number;
  zoom: number;
}

interface GeoMapProps {
  regions: GeoMapRegion[];
  provinceRegions?: GeoMapRegion[];
  cityRegions?: GeoMapRegion[];
  publishedCodes?: string[];
  activeCodes?: string[];
  marker?: GeoMapMarker;
  focus?: GeoMapFocus;
  langKey: LanguageCode;
  width?: number;
  height?: number;
  oceanColor?: string;
  fillColor?: string;
  strokeColor?: string;
  publishedStrokeColor?: string;
  activeStrokeColor?: string;
  provinceStrokeColor?: string;
  provincePublishedStrokeColor?: string;
  provinceZoomThreshold?: number;
  cityStrokeColor?: string;
  cityPublishedStrokeColor?: string;
  cityZoomThreshold?: number;
  strokeWidth?: number;
}

function toPolygons(geo?: GeoMapFeature): number[][][][] {
  if (!geo) return [];
  const { geometry } = geo;
  if (geometry.type === 'MultiPolygon')
    return geometry.coordinates as number[][][][];
  if (geometry.type === 'Polygon')
    return [geometry.coordinates as number[][][]];
  return [];
}

const KM_PER_DEGREE = 111;
const NICE_SCALE_STEPS_KM = [
  1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000,
];

function pickNiceScaleKm(maxKm: number): number {
  let chosen = NICE_SCALE_STEPS_KM[0];
  for (const step of NICE_SCALE_STEPS_KM) {
    if (step <= maxKm) chosen = step;
  }
  return chosen;
}

export default function GeoMap({
  regions,
  provinceRegions = [],
  cityRegions = [],
  publishedCodes = [],
  activeCodes = [],
  marker,
  focus,
  langKey,
  width = 480,
  height = 420,
  oceanColor = '#dceefc',
  fillColor = 'rgba(250, 248, 240, 0.92)',
  strokeColor = 'rgba(180, 180, 180, 0.6)',
  publishedStrokeColor = 'rgba(82, 196, 26, 0.3)',
  activeStrokeColor = 'rgba(255, 77, 79, 0.75)',
  provinceStrokeColor = 'rgba(100, 100, 100, 0.2)',
  provincePublishedStrokeColor = 'rgba(149, 222, 100, 0.2)',
  provinceZoomThreshold = 4,
  cityStrokeColor = 'rgba(60, 60, 60, 0.2)',
  cityPublishedStrokeColor = 'rgba(149, 222, 100, 0.3)',
  cityZoomThreshold = 10,
  strokeWidth = 1,
}: GeoMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const showProvinces =
    zoom >= provinceZoomThreshold && provinceRegions.length > 0;
  // 目前只有美国有完整的城市级 geo 数据，其余国家数据缺失，暂时关闭城市边界线渲染；
  // 阈值判断逻辑保留不删，等全部国家的城市级数据补全后，把 CITY_BOUNDARIES_ENABLED 改回 true 即可重新开放
  const CITY_BOUNDARIES_ENABLED = false;
  const showCities =
    CITY_BOUNDARIES_ENABLED &&
    zoom >= cityZoomThreshold &&
    cityRegions.length > 0;
  const activeSetForName = new Set(activeCodes);
  // 由深到浅依次查找：当前层级没有匹配的选中项时，回退到更粗的层级（比如放大到省份层级但选中的是没有省份数据的国家时，仍应显示国家名）
  const activeRegion =
    (showCities ? cityRegions.find((r) => activeSetForName.has(r.code)) : undefined) ??
    (showProvinces ? provinceRegions.find((r) => activeSetForName.has(r.code)) : undefined) ??
    regions.find((r) => activeSetForName.has(r.code));
  // 列表没有选中任何区域时，按当前缩放倍数对应的层级（国家/省份/城市），把该层级下所有区域的名称都展示出来；
  // 跟画布中心点无关，同一时刻只展示当前一个层级，不会跟其它层级同时显示
  const autoLevelRegions = showCities ? cityRegions : showProvinces ? provinceRegions : regions;
  // 当前画布中心对应的地理坐标（拖拽时更新），null 表示使用数据范围的几何中心
  const [center, setCenter] = useState<{ lng: number; lat: number } | null>(
    null,
  );
  const centerRef = useRef(center);
  const scaleRef = useRef(1);
  const defaultCenterRef = useRef({ lng: 0, lat: 0 });

  // 列表选中项变化时，外部传入 focus（目标经纬度+目标缩放倍数），驱动地图平移并缩放到对应位置
  useEffect(() => {
    if (!focus) return;
    setCenter({ lng: focus.lng, lat: focus.lat });
    setZoom(focus.zoom);
  }, [focus?.lng, focus?.lat, focus?.zoom]);

  useEffect(() => {
    centerRef.current = center;
  }, [center]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sensitivity = 0.005;
      setZoom((z) => Math.min(100, Math.max(0.8, z - e.deltaY * sensitivity)));
    };

    let dragging = false;
    let dragStart = { x: 0, y: 0, lng: 0, lat: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      dragging = true;
      const startCenter = centerRef.current ?? defaultCenterRef.current;
      dragStart = {
        x: e.clientX,
        y: e.clientY,
        lng: startCenter.lng,
        lat: startCenter.lat,
      };
      canvas.style.cursor = 'grabbing';
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const scale = scaleRef.current;
      setCenter({
        lng: dragStart.lng - (e.clientX - dragStart.x) / scale,
        lat: dragStart.lat + (e.clientY - dragStart.y) / scale,
      });
    };
    const handleMouseUp = () => {
      dragging = false;
      canvas.style.cursor = 'grab';
    };

    canvas.style.cursor = 'grab';
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = oceanColor;
    ctx.fillRect(0, 0, width, height);

    const allPolygons = regions.flatMap((region) => toPolygons(region.geo));

    if (allPolygons.length === 0 && !marker) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.font = '12px sans-serif';
      ctx.fillText(getLabel('pleaseSelectRegionHint', langKey), 16, height / 2);
      return;
    }

    const lngs = allPolygons.flatMap((poly) => poly[0].map((p) => p[0]));
    const lats = allPolygons.flatMap((poly) => poly[0].map((p) => p[1]));
    if (marker) {
      lngs.push(marker.lng);
      lats.push(marker.lat);
    }
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const padding = 16;
    const lngRange = maxLng - minLng || 1;
    const latRange = maxLat - minLat || 1;
    const baseScale = Math.min(
      (width - padding * 2) / lngRange,
      (height - padding * 2) / latRange,
    );
    const scale = baseScale * zoom;
    scaleRef.current = scale;

    const bboxCenterLng = (minLng + maxLng) / 2;
    const bboxCenterLat = (minLat + maxLat) / 2;
    defaultCenterRef.current = { lng: bboxCenterLng, lat: bboxCenterLat };
    const effectiveCenter = center ?? defaultCenterRef.current;

    const worldWidthPx = 360 * scale;
    const wrapsHorizontally = worldWidthPx > width;
    const tileOffsets = wrapsHorizontally
      ? [-worldWidthPx, 0, worldWidthPx]
      : [0];

    const toXY = (
      lng: number,
      lat: number,
      tileOffsetX = 0,
    ): [number, number] => [
      width / 2 + (lng - effectiveCenter.lng) * scale + tileOffsetX,
      height / 2 - (lat - effectiveCenter.lat) * scale,
    ];

    // 标签画在区域的面积质心上（geo.centroid，没有的话退回第一个环的 bbox 中心）；
    // 主/副文案的取值规则跟 LanguageText 组件保持一致：优先用 names[langKey]/names.en，没有多语言数据时退回单一的 name
    const regionLabelPos = (
      region: GeoMapRegion,
    ): { mainText: string; subText: string; x: number; y: number } | null => {
      const { name, names } = region.geo.properties ?? {};
      if (!name) return null;
      const mainText = (langKey && names?.[langKey]) || name;
      const subText = names?.en || name;
      let labelCenter = region.geo.centroid;
      if (!labelCenter) {
        const labelRing = toPolygons(region.geo)[0]?.[0];
        if (!labelRing || labelRing.length === 0) return null;
        const ringLngs = labelRing.map((p) => p[0]);
        const ringLats = labelRing.map((p) => p[1]);
        labelCenter = [
          (Math.min(...ringLngs) + Math.max(...ringLngs)) / 2,
          (Math.min(...ringLats) + Math.max(...ringLats)) / 2,
        ];
      }
      const [x, y] = toXY(...labelCenter);
      return { mainText, subText, x, y };
    };

    // 列表选中了某个区域，只展示这一个区域的名称；没选中则展示当前层级下所有区域的名称（跟画布中心点无关）
    const labelTargets = activeRegion ? [activeRegion] : autoLevelRegions;
    const regionLabels = labelTargets.map(regionLabelPos).filter((label) => label !== null);

    const drawRegions = (
      list: GeoMapRegion[],
      fill: string,
      stroke: string,
      lineDash: number[] = [],
      lineWidth: number = strokeWidth,
    ) => {
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(lineDash);
      ctx.lineCap = lineDash.length > 0 ? 'round' : 'butt';
      tileOffsets.forEach((tileOffsetX) => {
        list.forEach((region) => {
          toPolygons(region.geo).forEach((poly) => {
            poly.forEach((ring, ringIndex) => {
              ctx.beginPath();
              ring.forEach(([lng, lat], index) => {
                const [x, y] = toXY(lng, lat, tileOffsetX);
                if (index === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
              });
              ctx.closePath();
              if (ringIndex === 0) ctx.fill();
              ctx.stroke();
            });
          });
        });
      });
    };

    // showProvinces/showCities 在组件顶层计算，这里直接复用
    // 国家层级始终保留填充；省份/城市只画边界线，不画填充
    const publishedSet = new Set(publishedCodes);
    const activeSet = new Set(activeCodes);
    const countryLineWidth = strokeWidth * 1.2;
    drawRegions(
      regions.filter(
        (r) => !publishedSet.has(r.code) && !activeSet.has(r.code),
      ),
      fillColor,
      strokeColor,
      [],
      countryLineWidth,
    );
    drawRegions(
      regions.filter((r) => publishedSet.has(r.code) && !activeSet.has(r.code)),
      fillColor,
      publishedStrokeColor,
      [],
      countryLineWidth,
    );
    drawRegions(
      regions.filter((r) => activeSet.has(r.code)),
      fillColor,
      activeStrokeColor,
      [],
      countryLineWidth,
    );

    const provinceLineWidth = strokeWidth * 0.6;
    const cityLineWidth = strokeWidth * 0.5;

    if (showProvinces) {
      drawRegions(
        provinceRegions.filter(
          (r) => !publishedSet.has(r.code) && !activeSet.has(r.code),
        ),
        'transparent',
        provinceStrokeColor,
        [6, 4],
        provinceLineWidth,
      );
      drawRegions(
        provinceRegions.filter(
          (r) => publishedSet.has(r.code) && !activeSet.has(r.code),
        ),
        'transparent',
        provincePublishedStrokeColor,
        [6, 4],
        provinceLineWidth,
      );
      drawRegions(
        provinceRegions.filter((r) => activeSet.has(r.code)),
        'transparent',
        activeStrokeColor,
        [6, 4],
        provinceLineWidth,
      );
    }

    if (showCities) {
      drawRegions(
        cityRegions.filter(
          (r) => !publishedSet.has(r.code) && !activeSet.has(r.code),
        ),
        'transparent',
        cityStrokeColor,
        [1, 4],
        cityLineWidth,
      );
      drawRegions(
        cityRegions.filter(
          (r) => publishedSet.has(r.code) && !activeSet.has(r.code),
        ),
        'transparent',
        cityPublishedStrokeColor,
        [1, 4],
        cityLineWidth,
      );
      drawRegions(
        cityRegions.filter((r) => activeSet.has(r.code)),
        'transparent',
        activeStrokeColor,
        [1, 4],
        cityLineWidth,
      );
    }

    ctx.setLineDash([]);
    ctx.lineCap = 'butt';

    // 跟 LanguageText 组件的展示规则保持一致：langKey 为 en（或缺省）时只画主文案；
    // 否则主文案（粗体10px黑色）+ 英文副文案（8px灰色）并排展示，整体以 (x,y) 居中
    ctx.textBaseline = 'middle';
    regionLabels.forEach(({ mainText, subText, x, y }) => {
      if (!langKey || langKey === 'en') {
        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(mainText, x, y);
        return;
      }
      ctx.font = 'bold 10px sans-serif';
      const mainWidth = ctx.measureText(mainText).width;
      ctx.font = '8px sans-serif';
      const subWidth = ctx.measureText(subText).width;
      const gap = 4;
      const startX = x - (mainWidth + gap + subWidth) / 2;
      ctx.textAlign = 'left';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillStyle = '#000';
      ctx.fillText(mainText, startX, y);
      ctx.font = '8px sans-serif';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fillText(subText, startX + mainWidth + gap, y);
    });
    ctx.textAlign = 'start';
    ctx.textBaseline = 'alphabetic';

    if (marker) {
      tileOffsets.forEach((tileOffsetX) => {
        const [x, y] = toXY(marker.lng, marker.lat, tileOffsetX);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff4d4f';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.font = '12px sans-serif';
        ctx.fillText(marker.label, x + 8, y - 8);
      });
    }

    const kmPerLngDegree =
      KM_PER_DEGREE * Math.cos((effectiveCenter.lat * Math.PI) / 180);
    const pxPerKm = scale / kmPerLngDegree;
    const maxBarPx = 100;
    const niceKm = pickNiceScaleKm(maxBarPx / pxPerKm);
    const barPx = niceKm * pxPerKm;
    const barLeft = 16;
    const barBottom = height - 16;

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(barLeft, barBottom);
    ctx.lineTo(barLeft + barPx, barBottom);
    ctx.moveTo(barLeft, barBottom - 4);
    ctx.lineTo(barLeft, barBottom + 4);
    ctx.moveTo(barLeft + barPx, barBottom - 4);
    ctx.lineTo(barLeft + barPx, barBottom + 4);
    ctx.stroke();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.font = '11px sans-serif';
    ctx.fillText(`${niceKm} km`, barLeft, barBottom - 8);
    ctx.fillText(`${zoom.toFixed(1)}x`, barLeft, barBottom - 22);
  }, [
    regions,
    provinceRegions,
    cityRegions,
    publishedCodes,
    activeCodes,
    activeRegion,
    autoLevelRegions,
    showProvinces,
    showCities,
    marker,
    langKey,
    width,
    height,
    zoom,
    center,
    oceanColor,
    fillColor,
    strokeColor,
    publishedStrokeColor,
    activeStrokeColor,
    provinceStrokeColor,
    provincePublishedStrokeColor,
    provinceZoomThreshold,
    cityStrokeColor,
    cityPublishedStrokeColor,
    cityZoomThreshold,
    strokeWidth,
  ]);

  const handleReset = () => {
    setZoom(1);
    setCenter(null);
  };

  const legendItems: { color: string; labelKey: LabelKey }[] = [
    { color: publishedStrokeColor, labelKey: 'publishedCountryLegend' },
    {
      color: provincePublishedStrokeColor,
      labelKey: 'publishedProvinceLegend',
    },
    { color: cityPublishedStrokeColor, labelKey: 'publishedCityLegend' },
  ];

  return (
    <div style={{ position: 'relative', width, height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: '1px solid #f0f0f0', background: oceanColor }}
      />
      <div
        style={{
          position: 'absolute',
          right: 8,
          top: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          background: 'rgba(255, 255, 255, 0.85)',
          padding: '6px 8px',
          borderRadius: 4,
        }}
      >
        {legendItems.map((item) => (
          <div
            key={item.labelKey}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 2,
                background: item.color,
                flexShrink: 0,
              }}
            />
            <LanguageLabel
              langKey={langKey}
              labelKey={item.labelKey}
              fontSize={10}
            />
          </div>
        ))}
      </div>
      <Button
        size="small"
        icon={<UndoOutlined />}
        onClick={handleReset}
        title={getLabel('resetMapView', langKey)}
        style={{ position: 'absolute', right: 8, bottom: 8 }}
      />
    </div>
  );
}
