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

export type GeoMapBorderStyle = 'solid' | 'dashed' | 'dotted';

export interface GeoMapLevelStyle {
  borderStyle?: GeoMapBorderStyle;
  borderColor?: string;
  borderWidth?: number;
  fillColor?: string;
  publishedBorderColor?: string;
  activeBorderColor?: string;
  labelOpacity?: number;
  labelColor?: string;
  labelSubColor?: string;
}

export interface GeoMapOceanStyle {
  fillColor?: string;
}

export interface GeoMapStyle {
  ocean?: GeoMapOceanStyle;
  continent?: GeoMapLevelStyle;
  country?: GeoMapLevelStyle;
  province?: GeoMapLevelStyle;
  city?: GeoMapLevelStyle;
}

const DEFAULT_OCEAN_STYLE: Required<GeoMapOceanStyle> = {
  fillColor: '#dceefc',
};

export interface GeoMapZoomThresholds {
  continent?: number;
  country?: number;
  province?: number;
  city?: number;
}

const DEFAULT_ZOOM_THRESHOLDS: Required<GeoMapZoomThresholds> = {
  continent: 0,
  country: 2,
  province: 8,
  city: 20,
};

type ResolvedLevelStyle = Required<GeoMapLevelStyle>;

const ACTIVE_BORDER_COLOR = 'rgba(255, 77, 79, 0.75)';
const DEFAULT_LABEL_COLOR = '#000';
const DEFAULT_LABEL_SUB_COLOR = 'rgba(0, 0, 0, 0.45)';

const DEFAULT_LEVEL_STYLE: Record<
  'continent' | 'country' | 'province' | 'city',
  ResolvedLevelStyle
> = {
  continent: {
    borderStyle: 'solid',
    borderColor: 'rgba(120, 120, 100, 0.1)',
    borderWidth: 1.5,
    fillColor: 'rgba(255, 255, 255, 1)',
    publishedBorderColor: 'rgba(82, 196, 26, 0.5)',
    activeBorderColor: ACTIVE_BORDER_COLOR,
    labelOpacity: 0.9,
    labelColor: DEFAULT_LABEL_COLOR,
    labelSubColor: DEFAULT_LABEL_SUB_COLOR,
  },
  country: {
    borderStyle: 'solid',
    borderColor: 'rgba(180, 180, 180, 0.4)',
    borderWidth: 1.2,
    fillColor: 'rgba(250, 248, 240, 0.8)',
    publishedBorderColor: 'rgba(82, 196, 26, 0.3)',
    activeBorderColor: ACTIVE_BORDER_COLOR,
    labelOpacity: 0.8,
    labelColor: DEFAULT_LABEL_COLOR,
    labelSubColor: DEFAULT_LABEL_SUB_COLOR,
  },
  province: {
    borderStyle: 'dashed',
    borderColor: 'rgba(100, 100, 100, 0.3)',
    borderWidth: 0.6,
    fillColor: 'transparent',
    publishedBorderColor: 'rgba(149, 222, 100, 0.2)',
    activeBorderColor: ACTIVE_BORDER_COLOR,
    labelOpacity: 0.5,
    labelColor: DEFAULT_LABEL_COLOR,
    labelSubColor: DEFAULT_LABEL_SUB_COLOR,
  },
  city: {
    borderStyle: 'dotted',
    borderColor: 'rgba(60, 60, 60, 0.2)',
    borderWidth: 0.5,
    fillColor: 'transparent',
    publishedBorderColor: 'rgba(149, 222, 100, 0.3)',
    activeBorderColor: ACTIVE_BORDER_COLOR,
    labelOpacity: 0.3,
    labelColor: DEFAULT_LABEL_COLOR,
    labelSubColor: DEFAULT_LABEL_SUB_COLOR,
  },
};

function resolveLevelStyle(
  level: 'continent' | 'country' | 'province' | 'city',
  override?: GeoMapLevelStyle,
): ResolvedLevelStyle {
  return { ...DEFAULT_LEVEL_STYLE[level], ...override };
}

function borderStyleToLineDash(borderStyle: GeoMapBorderStyle): number[] {
  if (borderStyle === 'dashed') return [6, 4];
  if (borderStyle === 'dotted') return [1, 4];
  return [];
}

interface GeoMapProps {
  continentRegions?: GeoMapRegion[];
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
  style?: GeoMapStyle;
  zoomThresholds?: GeoMapZoomThresholds;
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

interface GeoMapBounds {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
}

interface PreparedGeoMapRegion extends GeoMapRegion {
  polygons: number[][][][];
  bounds?: GeoMapBounds;
  labelCenter?: [number, number];
}

function expandBounds(bounds: GeoMapBounds, lng: number, lat: number) {
  bounds.minLng = Math.min(bounds.minLng, lng);
  bounds.maxLng = Math.max(bounds.maxLng, lng);
  bounds.minLat = Math.min(bounds.minLat, lat);
  bounds.maxLat = Math.max(bounds.maxLat, lat);
}

function boundsFromRing(ring?: number[][]): GeoMapBounds | undefined {
  if (!ring || ring.length === 0) return undefined;
  const [firstLng, firstLat] = ring[0];
  const bounds = {
    minLng: firstLng,
    maxLng: firstLng,
    minLat: firstLat,
    maxLat: firstLat,
  };
  for (let index = 1; index < ring.length; index += 1) {
    const [lng, lat] = ring[index];
    expandBounds(bounds, lng, lat);
  }
  return bounds;
}

function boundsFromPolygons(polygons: number[][][][]): GeoMapBounds | undefined {
  let bounds: GeoMapBounds | undefined;
  polygons.forEach((poly) => {
    const ringBounds = boundsFromRing(poly[0]);
    if (!ringBounds) return;
    if (!bounds) {
      bounds = { ...ringBounds };
      return;
    }
    expandBounds(bounds, ringBounds.minLng, ringBounds.minLat);
    expandBounds(bounds, ringBounds.maxLng, ringBounds.maxLat);
  });
  return bounds;
}

function centerFromBounds(bounds?: GeoMapBounds): [number, number] | undefined {
  if (!bounds) return undefined;
  return [
    (bounds.minLng + bounds.maxLng) / 2,
    (bounds.minLat + bounds.maxLat) / 2,
  ];
}

function prepareRegion(region: GeoMapRegion): PreparedGeoMapRegion {
  const polygons = toPolygons(region.geo);
  const bounds = boundsFromPolygons(polygons);
  const fallbackLabelCenter = centerFromBounds(boundsFromRing(polygons[0]?.[0]));
  return {
    ...region,
    polygons,
    bounds,
    labelCenter: region.geo.centroid ?? fallbackLabelCenter,
  };
}

function combineBounds(regions: PreparedGeoMapRegion[]): GeoMapBounds | undefined {
  let bounds: GeoMapBounds | undefined;
  regions.forEach((region) => {
    if (!region.bounds) return;
    if (!bounds) {
      bounds = { ...region.bounds };
      return;
    }
    expandBounds(bounds, region.bounds.minLng, region.bounds.minLat);
    expandBounds(bounds, region.bounds.maxLng, region.bounds.maxLat);
  });
  return bounds;
}

const KM_PER_DEGREE = 111;
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 100;
const WHEEL_ZOOM_SENSITIVITY = 0.005;
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
  continentRegions = [],
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
  style,
  zoomThresholds,
}: GeoMapProps) {
  const oceanStyle = { ...DEFAULT_OCEAN_STYLE, ...style?.ocean };
  const {
    continent: continentZoomThreshold,
    country: countryZoomThreshold,
    province: provinceZoomThreshold,
    city: cityZoomThreshold,
  } = {
    ...DEFAULT_ZOOM_THRESHOLDS,
    ...zoomThresholds,
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const continentStyle = resolveLevelStyle('continent', style?.continent);
  const countryStyle = resolveLevelStyle('country', style?.country);
  const provinceStyle = resolveLevelStyle('province', style?.province);
  const cityStyle = resolveLevelStyle('city', style?.city);
  const preparedContinentRegions = useMemo(
    () => continentRegions.map(prepareRegion),
    [continentRegions],
  );
  const preparedRegions = useMemo(() => regions.map(prepareRegion), [regions]);
  const preparedProvinceRegions = useMemo(
    () => provinceRegions.map(prepareRegion),
    [provinceRegions],
  );
  const preparedCityRegions = useMemo(
    () => cityRegions.map(prepareRegion),
    [cityRegions],
  );
  const fitBounds = useMemo(
    () =>
      combineBounds(
        preparedContinentRegions.length > 0
          ? preparedContinentRegions
          : preparedRegions,
      ),
    [preparedContinentRegions, preparedRegions],
  );
  const publishedCodeSet = useMemo(
    () => new Set(publishedCodes),
    [publishedCodes],
  );
  const activeCodeSet = useMemo(() => new Set(activeCodes), [activeCodes]);
  // 同一时刻只有一个层级是"当前层级"：大洲(<4x) -> 国家(4-5x) -> 省份(5-10x) -> 城市(>=10x)，
  // 层级之间互斥，只渲染当前层级的边界线/填充/名称，不会同时出现多个层级
  // 目前只有美国有完整的城市级 geo 数据，其余国家数据缺失，暂时关闭城市边界线渲染；
  // 阈值判断逻辑保留不删，等全部国家的城市级数据补全后，把 CITY_BOUNDARIES_ENABLED 改回 true 即可重新开放
  const CITY_BOUNDARIES_ENABLED = false;
  const showCities =
    CITY_BOUNDARIES_ENABLED &&
    zoom >= cityZoomThreshold &&
    preparedCityRegions.length > 0;
  const showProvinces =
    !showCities &&
    zoom >= provinceZoomThreshold &&
    preparedProvinceRegions.length > 0;
  const showCountry =
    !showCities && !showProvinces && zoom >= countryZoomThreshold;
  const showContinent =
    !showCities &&
    !showProvinces &&
    !showCountry &&
    zoom >= continentZoomThreshold;
  // 由深到浅依次查找：当前层级没有匹配的选中项时，回退到更粗的层级（比如放大到省份层级但选中的是没有省份数据的国家时，仍应显示国家名）
  const activeRegion =
    (showCities
      ? preparedCityRegions.find((r) => activeCodeSet.has(r.code))
      : undefined) ??
    (showProvinces
      ? preparedProvinceRegions.find((r) => activeCodeSet.has(r.code))
      : undefined) ??
    preparedRegions.find((r) => activeCodeSet.has(r.code)) ??
    preparedContinentRegions.find((r) => activeCodeSet.has(r.code));
  // 列表没有选中任何区域时，按当前缩放倍数对应的层级（大洲/国家/省份/城市），把该层级下所有区域的名称都展示出来；
  // 跟画布中心点无关，同一时刻只展示当前一个层级，不会跟其它层级同时显示
  const autoLevelRegions = showCities
    ? preparedCityRegions
    : showProvinces
      ? preparedProvinceRegions
      : showCountry
        ? preparedRegions
        : preparedContinentRegions;
  // 当前画布中心对应的地理坐标（拖拽时更新），null 表示使用数据范围的几何中心
  const [center, setCenter] = useState<{ lng: number; lat: number } | null>(
    null,
  );
  const centerRef = useRef(center);
  const scaleRef = useRef(1);
  const defaultCenterRef = useRef({ lng: 0, lat: 0 });
  const wheelDeltaRef = useRef(0);
  const wheelFrameRef = useRef<number | null>(null);

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
      wheelDeltaRef.current += e.deltaY;
      if (wheelFrameRef.current !== null) return;
      wheelFrameRef.current = window.requestAnimationFrame(() => {
        const deltaY = wheelDeltaRef.current;
        wheelDeltaRef.current = 0;
        wheelFrameRef.current = null;
        setZoom((z) =>
          Math.min(
            MAX_ZOOM,
            Math.max(MIN_ZOOM, z - deltaY * WHEEL_ZOOM_SENSITIVITY),
          ),
        );
      });
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
      if (wheelFrameRef.current !== null) {
        window.cancelAnimationFrame(wheelFrameRef.current);
        wheelFrameRef.current = null;
      }
      wheelDeltaRef.current = 0;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = oceanStyle.fillColor;
    ctx.fillRect(0, 0, width, height);

    let viewportBounds = fitBounds ? { ...fitBounds } : undefined;

    if (marker) {
      if (!viewportBounds) {
        viewportBounds = {
          minLng: marker.lng,
          maxLng: marker.lng,
          minLat: marker.lat,
          maxLat: marker.lat,
        };
      } else {
        expandBounds(viewportBounds, marker.lng, marker.lat);
      }
    }

    if (!viewportBounds) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.font = '12px sans-serif';
      ctx.fillText(getLabel('pleaseSelectRegionHint', langKey), 16, height / 2);
      return;
    }

    const { minLng, maxLng, minLat, maxLat } = viewportBounds;
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
    // 大洲文字 12px/10px，国家 10px/8px，省份比国家小2号（8px/6px），城市跟国家一致
    const currentLevelStyle = showCities
      ? cityStyle
      : showProvinces
        ? provinceStyle
        : showCountry
          ? countryStyle
          : continentStyle;
    const mainFontSize = showContinent ? 12 : showProvinces ? 8 : 10;
    const subFontSize = showContinent ? 10 : showProvinces ? 6 : 8;

    const regionLabelPos = (
      region: PreparedGeoMapRegion,
    ): {
      mainText: string;
      subText: string;
      x: number;
      y: number;
      opacity: number;
    } | null => {
      const { name, names } = region.geo.properties ?? {};
      if (!name) return null;
      const mainText = (langKey && names?.[langKey]) || name;
      const subText = names?.en || name;
      if (!region.labelCenter) return null;
      const labelCenter = region.labelCenter;
      const [x, y] = toXY(...labelCenter);
      const opacity =
        activeRegion && region.code === activeRegion.code
          ? 1
          : currentLevelStyle.labelOpacity;
      return { mainText, subText, x, y, opacity };
    };

    // 始终展示当前层级下所有区域的名称（跟画布中心点无关）；选中的那个用 opacity 1 突出显示，其余保持半透明
    const regionLabels = autoLevelRegions
      .map(regionLabelPos)
      .filter((label) => label !== null);

    const drawRegions = (
      list: PreparedGeoMapRegion[],
      fill: string,
      stroke: string,
      lineDash: number[],
      lineWidth: number,
      strokeEnabled = true,
    ) => {
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(lineDash);
      ctx.lineCap = lineDash.length > 0 ? 'round' : 'butt';
      tileOffsets.forEach((tileOffsetX) => {
        list.forEach((region) => {
          region.polygons.forEach((poly) => {
            poly.forEach((ring, ringIndex) => {
              ctx.beginPath();
              ring.forEach(([lng, lat], index) => {
                const [x, y] = toXY(lng, lat, tileOffsetX);
                if (index === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
              });
              ctx.closePath();
              if (ringIndex === 0) ctx.fill();
              if (strokeEnabled) ctx.stroke();
            });
          });
        });
      });
    };

    // showContinent/showCountry/showProvinces/showCities 在组件顶层计算，互斥，每次只有一个层级会画出来；
    // 每个层级自己的边框类型/颜色/粗细/填充色都来自 style.<level>，已在组件顶层解析好（continentStyle/countryStyle/...）
    const drawLevel = (
      list: PreparedGeoMapRegion[],
      levelStyle: ResolvedLevelStyle,
      isContinent = false,
    ) => {
      const lineDash = borderStyleToLineDash(levelStyle.borderStyle);
      // 发布态/选中态是国家层级的概念，大洲编码跟国家 ISO 编码存在偶然撞码（如大洲 AF 跟阿富汗的国家编码 AF），
      // 大洲层级不参与 publishedCodes/activeCodes 匹配，避免把命中撞码的大洲误画成"已发布"
      if (isContinent) {
        // 大洲的 geo 数据是成员国轮廓直接拼接而成（未做几何融合），逐个国家描边会把内部国界也画出来；
        // 大洲填充色本身跟海洋色不同，靠色块对比即可分辨大洲外轮廓，不描边，避免出现"国家边界"假象
        drawRegions(
          list,
          levelStyle.fillColor,
          levelStyle.borderColor,
          lineDash,
          levelStyle.borderWidth,
          false,
        );
        return;
      }
      const baseRegions: PreparedGeoMapRegion[] = [];
      const publishedRegions: PreparedGeoMapRegion[] = [];
      const activeRegions: PreparedGeoMapRegion[] = [];
      list.forEach((region) => {
        if (activeCodeSet.has(region.code)) {
          activeRegions.push(region);
        } else if (publishedCodeSet.has(region.code)) {
          publishedRegions.push(region);
        } else {
          baseRegions.push(region);
        }
      });
      drawRegions(
        baseRegions,
        levelStyle.fillColor,
        levelStyle.borderColor,
        lineDash,
        levelStyle.borderWidth,
      );
      drawRegions(
        publishedRegions,
        levelStyle.fillColor,
        levelStyle.publishedBorderColor,
        lineDash,
        levelStyle.borderWidth,
      );
      drawRegions(
        activeRegions,
        levelStyle.fillColor,
        levelStyle.activeBorderColor,
        lineDash,
        levelStyle.borderWidth,
      );
    };

    if (showContinent) drawLevel(preparedContinentRegions, continentStyle, true);
    if (showCountry) drawLevel(preparedRegions, countryStyle);
    // 放大到省份/城市层级后，国家边界不再消失，作为底图用国家自己的样式始终叠加描边
    if (showProvinces || showCities) drawLevel(preparedRegions, countryStyle);
    if (showProvinces) drawLevel(preparedProvinceRegions, provinceStyle);
    if (showCities) drawLevel(preparedCityRegions, cityStyle);

    ctx.setLineDash([]);
    ctx.lineCap = 'butt';

    // 跟 LanguageText 组件的展示规则保持一致：langKey 为 en（或缺省）时只画主文案；
    // 否则主文案（粗体，黑色）+ 英文副文案（灰色，字号比主文案小）并排展示，整体以 (x,y) 居中
    ctx.textBaseline = 'middle';
    regionLabels.forEach(({ mainText, subText, x, y, opacity }) => {
      ctx.globalAlpha = opacity;
      if (!langKey || langKey === 'en') {
        ctx.font = `bold ${mainFontSize}px sans-serif`;
        ctx.fillStyle = currentLevelStyle.labelColor;
        ctx.textAlign = 'center';
        ctx.fillText(mainText, x, y);
        return;
      }
      ctx.font = `bold ${mainFontSize}px sans-serif`;
      const mainWidth = ctx.measureText(mainText).width;
      ctx.font = `${subFontSize}px sans-serif`;
      const subWidth = ctx.measureText(subText).width;
      const gap = 4;
      const startX = x - (mainWidth + gap + subWidth) / 2;
      ctx.textAlign = 'left';
      ctx.font = `bold ${mainFontSize}px sans-serif`;
      ctx.fillStyle = currentLevelStyle.labelColor;
      ctx.fillText(mainText, startX, y);
      ctx.font = `${subFontSize}px sans-serif`;
      ctx.fillStyle = currentLevelStyle.labelSubColor;
      ctx.fillText(subText, startX + mainWidth + gap, y);
    });
    ctx.globalAlpha = 1;
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
    preparedContinentRegions,
    preparedRegions,
    preparedProvinceRegions,
    preparedCityRegions,
    fitBounds,
    publishedCodeSet,
    activeCodeSet,
    activeRegion,
    autoLevelRegions,
    showContinent,
    showCountry,
    showProvinces,
    showCities,
    marker,
    langKey,
    width,
    height,
    zoom,
    center,
    oceanStyle,
    continentStyle,
    countryStyle,
    provinceStyle,
    cityStyle,
  ]);

  const handleReset = () => {
    setZoom(1);
    setCenter(null);
  };

  const legendItems: { color: string; labelKey: LabelKey }[] = [
    {
      color: countryStyle.publishedBorderColor,
      labelKey: 'publishedCountryLegend',
    },
    {
      color: provinceStyle.publishedBorderColor,
      labelKey: 'publishedProvinceLegend',
    },
    { color: cityStyle.publishedBorderColor, labelKey: 'publishedCityLegend' },
  ];

  return (
    <div style={{ position: 'relative', width, height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          border: '1px solid #f0f0f0',
          background: oceanStyle.fillColor,
        }}
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
