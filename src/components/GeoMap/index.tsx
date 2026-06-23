import { Button } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import LanguageLabel from '@/components/LanguageLabel';
import { getLabel, type LabelKey } from '@/components/LanguageLabel/LabelMap';
import type { LanguageCode } from '@/types/system';

/** 地图区域的原始几何数据，支持单面和多面两种 GeoJSON 形态。 */
export interface GeoMapGeometry {
  /** GeoJSON 几何类型。 */
  type: 'Polygon' | 'MultiPolygon';
  /** 坐标数组，顺序为 [lng, lat]。 */
  coordinates: number[][][] | number[][][][];
}

/** 地图可绘制的 GeoJSON Feature 片段。 */
export interface GeoMapFeature {
  /** 多边形几何数据。 */
  geometry: GeoMapGeometry;
  /** 原始名称和可选多语言名称。 */
  properties?: { name: string; names?: Record<string, string> };
  /** 面积质心 [lng, lat]，优先用于标签和聚焦定位。 */
  centroid?: [number, number];
}

/** 地图区域，code 用于发布态、选中态和图层匹配。 */
export interface GeoMapRegion {
  /** 区域编码，例如大洲、国家、省份或城市编码。 */
  code: string;
  /** 区域对应的地理 Feature。 */
  geo: GeoMapFeature;
}

/** 地图上的点位标记。 */
export interface GeoMapMarker {
  /** 标记纬度。 */
  lat: number;
  /** 标记经度。 */
  lng: number;
  /** 标记旁显示的文本。 */
  label: string;
}

/** 外部驱动地图移动和缩放的焦点。 */
export interface GeoMapFocus {
  /** 焦点经度。 */
  lng: number;
  /** 焦点纬度。 */
  lat: number;
  /** 目标缩放倍数。 */
  zoom: number;
}

/** 图层边线样式。 */
export type GeoMapBorderStyle = 'solid' | 'dashed' | 'dotted';

/** 单个地图层级的绘制样式。 */
export interface GeoMapLevelStyle {
  /** 边线类型。 */
  borderStyle?: GeoMapBorderStyle;
  /** 默认边线颜色。 */
  borderColor?: string;
  /** 默认边线宽度。 */
  borderWidth?: number;
  /** 区域填充颜色。 */
  fillColor?: string;
  /** 已发布区域边线颜色。 */
  publishedBorderColor?: string;
  /** 当前选中区域边线颜色。 */
  activeBorderColor?: string;
  /** 当前选中区域标签主文本颜色。 */
  activeLabelColor?: string;
  /** 当前选中区域标签英文副文本颜色。 */
  activeLabelSubColor?: string;
  /** 非选中标签透明度。 */
  labelOpacity?: number;
  /** 标签主文本颜色。 */
  labelColor?: string;
  /** 标签英文副文本颜色。 */
  labelSubColor?: string;
}

/** 海洋底色样式。 */
export interface GeoMapOceanStyle {
  /** 海洋背景色。 */
  fillColor?: string;
}

/** 地图所有可配置样式。 */
export interface GeoMapStyle {
  /** 海洋底图样式。 */
  ocean?: GeoMapOceanStyle;
  /** 大洲层级样式。 */
  continent?: GeoMapLevelStyle;
  /** 国家层级样式。 */
  country?: GeoMapLevelStyle;
  /** 省份层级样式。 */
  province?: GeoMapLevelStyle;
  /** 城市层级样式。 */
  city?: GeoMapLevelStyle;
}

/** 默认海洋底色。 */
const DEFAULT_OCEAN_STYLE: Required<GeoMapOceanStyle> = {
  fillColor: '#dceefc',
};

/** 各地图层级的缩放显示阈值。 */
export interface GeoMapZoomThresholds {
  /** 大洲层级最低缩放倍数。 */
  continent?: number;
  /** 国家层级最低缩放倍数。 */
  country?: number;
  /** 省份层级最低缩放倍数。 */
  province?: number;
  /** 城市层级最低缩放倍数。 */
  city?: number;
}

/** 未传入 zoomThresholds 时使用的默认层级阈值。 */
const DEFAULT_ZOOM_THRESHOLDS: Required<GeoMapZoomThresholds> = {
  continent: 0,
  country: 2,
  province: 20,
  city: 50,
};

/** 内部使用的完整层级样式，所有可选字段都已补齐默认值。 */
type ResolvedLevelStyle = Required<GeoMapLevelStyle>;

/** 全局选中态边框颜色。 */
const ACTIVE_BORDER_COLOR = 'rgba(255, 77, 79, 0.75)';
/** 全局选中态标签主文本颜色。 */
const ACTIVE_LABEL_COLOR = '#ff4d4f';
/** 全局选中态标签英文副文本颜色。 */
const ACTIVE_LABEL_SUB_COLOR = 'rgba(255, 77, 79, 0.78)';
/** 默认标签主文本颜色。 */
const DEFAULT_LABEL_COLOR = '#000';
/** 默认标签英文副文本颜色。 */
const DEFAULT_LABEL_SUB_COLOR = 'rgba(0, 0, 0, 0.45)';

/** 每个层级的默认视觉样式。 */
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
    activeLabelColor: ACTIVE_LABEL_COLOR,
    activeLabelSubColor: ACTIVE_LABEL_SUB_COLOR,
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
    activeLabelColor: ACTIVE_LABEL_COLOR,
    activeLabelSubColor: ACTIVE_LABEL_SUB_COLOR,
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
    activeLabelColor: ACTIVE_LABEL_COLOR,
    activeLabelSubColor: ACTIVE_LABEL_SUB_COLOR,
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
    activeLabelColor: ACTIVE_LABEL_COLOR,
    activeLabelSubColor: ACTIVE_LABEL_SUB_COLOR,
    labelOpacity: 0.3,
    labelColor: DEFAULT_LABEL_COLOR,
    labelSubColor: DEFAULT_LABEL_SUB_COLOR,
  },
};

/** 合并层级默认样式和外部覆盖样式。 */
function resolveLevelStyle(
  level: 'continent' | 'country' | 'province' | 'city',
  override?: GeoMapLevelStyle,
): ResolvedLevelStyle {
  return { ...DEFAULT_LEVEL_STYLE[level], ...override };
}

/** 将语义化边线样式转换成 Canvas lineDash 数组。 */
function borderStyleToLineDash(borderStyle: GeoMapBorderStyle): number[] {
  if (borderStyle === 'dashed') return [6, 4];
  if (borderStyle === 'dotted') return [1, 4];
  return [];
}

/** GeoMap 组件入参。 */
interface GeoMapProps {
  /** 大洲层级区域列表。 */
  continentRegions?: GeoMapRegion[];
  /** 国家层级区域列表，当前也承载部分临时高亮 overlay。 */
  regions: GeoMapRegion[];
  /** 省份层级区域列表。 */
  provinceRegions?: GeoMapRegion[];
  /** 城市层级区域列表。 */
  cityRegions?: GeoMapRegion[];
  /** 已发布区域编码集合。 */
  publishedCodes?: string[];
  /** 当前选中路径编码集合，组件内部只把最后一个有效编码作为唯一选中态。 */
  activeCodes?: string[];
  /** 点位或地标标记。 */
  marker?: GeoMapMarker;
  /** 外部传入的地图聚焦目标。 */
  focus?: GeoMapFocus;
  /** 当前界面语言。 */
  langKey: LanguageCode;
  /** Canvas 逻辑宽度；不传时跟随容器宽度自适应。 */
  width?: number;
  /** Canvas 逻辑高度。 */
  height?: number;
  /** 外部覆盖的地图样式。 */
  style?: GeoMapStyle;
  /** 外部覆盖的层级显示阈值。 */
  zoomThresholds?: GeoMapZoomThresholds;
}

/** 把 Polygon/MultiPolygon 统一转换成 MultiPolygon 形态，方便绘制循环共用。 */
function toPolygons(geo?: GeoMapFeature): number[][][][] {
  if (!geo) return [];
  const { geometry } = geo;
  if (geometry.type === 'MultiPolygon')
    return geometry.coordinates as number[][][][];
  if (geometry.type === 'Polygon')
    return [geometry.coordinates as number[][][]];
  return [];
}

/** 区域经纬度边界盒，用于视口适配和标签中心兜底计算。 */
interface GeoMapBounds {
  /** 最小经度。 */
  minLng: number;
  /** 最大经度。 */
  maxLng: number;
  /** 最小纬度。 */
  minLat: number;
  /** 最大纬度。 */
  maxLat: number;
}

/** 预处理后的区域数据，避免每次重绘都拆解 geometry。 */
interface PreparedGeoMapRegion extends GeoMapRegion {
  /** 已统一成 MultiPolygon 结构的坐标。 */
  polygons: number[][][][];
  /** 区域整体边界盒。 */
  bounds?: GeoMapBounds;
  /** 标签显示中心点。 */
  labelCenter?: [number, number];
}

/** 用一个经纬度点扩展已有边界盒。 */
function expandBounds(bounds: GeoMapBounds, lng: number, lat: number) {
  bounds.minLng = Math.min(bounds.minLng, lng);
  bounds.maxLng = Math.max(bounds.maxLng, lng);
  bounds.minLat = Math.min(bounds.minLat, lat);
  bounds.maxLat = Math.max(bounds.maxLat, lat);
}

/** 从单个外环坐标中计算边界盒。 */
function boundsFromRing(ring?: number[][]): GeoMapBounds | undefined {
  if (!ring || ring.length === 0) return undefined;
  // 用首个点初始化边界，后续点只做扩展。
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

/** 从多个 polygon 的外环中合并区域边界盒。 */
function boundsFromPolygons(
  polygons: number[][][][],
): GeoMapBounds | undefined {
  let bounds: GeoMapBounds | undefined;
  polygons.forEach((poly) => {
    // poly[0] 是外环，内环/洞不参与视口边界计算。
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

/** 根据边界盒计算中心点。 */
function centerFromBounds(bounds?: GeoMapBounds): [number, number] | undefined {
  if (!bounds) return undefined;
  return [
    (bounds.minLng + bounds.maxLng) / 2,
    (bounds.minLat + bounds.maxLat) / 2,
  ];
}

/** 预处理单个区域，缓存绘制需要的 polygons、bounds 和标签中心。 */
function prepareRegion(region: GeoMapRegion): PreparedGeoMapRegion {
  // polygons 是绘制最热路径里的主要输入，提前规整一次即可。
  const polygons = toPolygons(region.geo);
  // bounds 用于视口 fit 和后续整体 bounds 合并。
  const bounds = boundsFromPolygons(polygons);
  // 没有面积质心时，退回第一个外环的 bbox 中心。
  const fallbackLabelCenter = centerFromBounds(
    boundsFromRing(polygons[0]?.[0]),
  );
  return {
    ...region,
    polygons,
    bounds,
    labelCenter: region.geo.centroid ?? fallbackLabelCenter,
  };
}

/** 合并多个预处理区域的整体边界盒。 */
function combineBounds(
  regions: PreparedGeoMapRegion[],
): GeoMapBounds | undefined {
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

/** 经纬度粗略换算距离时使用的每度公里数。 */
const KM_PER_DEGREE = 111;
/** 未指定 width 且容器尚未完成测量时使用的兜底宽度。 */
const DEFAULT_CANVAS_WIDTH = 480;
/** 地图允许的最小缩放倍数。 */
const MIN_ZOOM = 0.8;
/** 地图允许的最大缩放倍数。 */
const MAX_ZOOM = 100;
/** wheel delta 转缩放倍率的灵敏度。 */
const WHEEL_ZOOM_SENSITIVITY = 0.005;
/** 比例尺可选的友好公里刻度。 */
const NICE_SCALE_STEPS_KM = [
  1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000,
];

/** 根据最大可用长度选择一个不超过上限的友好比例尺公里值。 */
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
  width: widthProp,
  height = 420,
  style,
  zoomThresholds,
}: GeoMapProps) {
  // 外层容器引用，用于在未传 width 时测量可用宽度。
  const containerRef = useRef<HTMLDivElement>(null);
  // 海洋背景样式，合并默认值和外部覆盖。
  const oceanStyle = { ...DEFAULT_OCEAN_STYLE, ...style?.ocean };
  // 不同地理层级切换显示时使用的缩放阈值。
  const {
    continent: continentZoomThreshold,
    country: countryZoomThreshold,
    province: provinceZoomThreshold,
    city: cityZoomThreshold,
  } = {
    ...DEFAULT_ZOOM_THRESHOLDS,
    ...zoomThresholds,
  };
  // Canvas DOM 引用，所有地图内容都直接绘制在这个节点上。
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 容器测量得到的逻辑宽度，只在 widthProp 未传时生效。
  const [containerWidth, setContainerWidth] = useState(
    widthProp ?? DEFAULT_CANVAS_WIDTH,
  );
  // 最终绘图使用的逻辑宽度，优先尊重外部固定宽度。
  const width = Math.max(1, widthProp ?? containerWidth);
  // 当前屏幕像素比，用于把 Canvas 物理像素放大到高清尺寸。
  const pixelRatio =
    typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
  // Canvas 实际物理像素宽度，绘图时会通过 setTransform 映射回逻辑坐标。
  const canvasPixelWidth = Math.max(1, Math.floor(width * pixelRatio));
  // Canvas 实际物理像素高度，避免高 DPR 屏幕文字和边线发虚。
  const canvasPixelHeight = Math.max(1, Math.floor(height * pixelRatio));
  // 当前地图缩放倍数，内部交互状态，不等同于 zoomThresholds。
  const [zoom, setZoom] = useState(1);
  // 大洲层级最终绘制样式。
  const continentStyle = resolveLevelStyle('continent', style?.continent);
  // 国家层级最终绘制样式。
  const countryStyle = resolveLevelStyle('country', style?.country);
  // 省份层级最终绘制样式。
  const provinceStyle = resolveLevelStyle('province', style?.province);
  // 城市层级最终绘制样式。
  const cityStyle = resolveLevelStyle('city', style?.city);
  // 大洲区域预处理结果，只有入参变更时重新计算。
  const preparedContinentRegions = useMemo(
    () => continentRegions.map(prepareRegion),
    [continentRegions],
  );
  // 国家区域预处理结果，包含当前调用方塞进 regions 的临时高亮区域。
  const preparedRegions = useMemo(() => regions.map(prepareRegion), [regions]);
  // 省份区域预处理结果。
  const preparedProvinceRegions = useMemo(
    () => provinceRegions.map(prepareRegion),
    [provinceRegions],
  );
  // 城市区域预处理结果。
  const preparedCityRegions = useMemo(
    () => cityRegions.map(prepareRegion),
    [cityRegions],
  );
  // 默认视口适配范围，优先使用大洲层级，没有大洲数据时退回国家层级。
  const fitBounds = useMemo(
    () =>
      combineBounds(
        preparedContinentRegions.length > 0
          ? preparedContinentRegions
          : preparedRegions,
      ),
    [preparedContinentRegions, preparedRegions],
  );
  // 已发布编码集合，用 Set 加速绘制分组判断。
  const publishedCodeSet = useMemo(
    () => new Set(publishedCodes),
    [publishedCodes],
  );
  // 当前选中链路中最终落到地图上的区域；activeCodes 可能同时包含父级和子级，倒序取最后一个有效编码作为唯一选中态。
  const activeRegion = useMemo(() => {
    const regionLayers = [
      preparedCityRegions,
      preparedProvinceRegions,
      preparedRegions,
      preparedContinentRegions,
    ];
    for (let index = activeCodes.length - 1; index >= 0; index -= 1) {
      const activeCode = activeCodes[index];
      for (const layer of regionLayers) {
        const matchedRegion = layer.find(
          (region) => region.code === activeCode,
        );
        if (matchedRegion) return matchedRegion;
      }
    }
    return undefined;
  }, [
    activeCodes,
    preparedCityRegions,
    preparedProvinceRegions,
    preparedRegions,
    preparedContinentRegions,
  ]);
  // 唯一应该应用选中态样式的区域编码，父级路径只保留上下文，不再参与 active 绘制。
  const activeRegionCode = activeRegion?.code;
  // 同一时刻只有一个层级是"当前层级"：大洲(<4x) -> 国家(4-5x) -> 省份(5-10x) -> 城市(>=10x)，
  // 层级之间互斥，只渲染当前层级的边界线/填充/名称，不会同时出现多个层级
  // 目前只有美国有完整的城市级 geo 数据，其余国家数据缺失，暂时关闭城市边界线渲染；
  // 阈值判断逻辑保留不删，等全部国家的城市级数据补全后，把 CITY_BOUNDARIES_ENABLED 改回 true 即可重新开放
  // 城市边界总开关，false 时即使 zoom 达到城市阈值也不会画城市层。
  const CITY_BOUNDARIES_ENABLED = false;
  // 当前缩放下是否显示城市层级。
  const showCities =
    CITY_BOUNDARIES_ENABLED &&
    zoom >= cityZoomThreshold &&
    preparedCityRegions.length > 0;
  // 当前缩放下是否显示省份层级。
  const showProvinces =
    !showCities &&
    zoom >= provinceZoomThreshold &&
    preparedProvinceRegions.length > 0;
  // 当前缩放下是否显示国家层级。
  const showCountry =
    !showCities && !showProvinces && zoom >= countryZoomThreshold;
  // 当前缩放下是否显示大洲层级。
  const showContinent =
    !showCities &&
    !showProvinces &&
    !showCountry &&
    zoom >= continentZoomThreshold;
  // 列表没有选中任何区域时，按当前缩放倍数对应的层级（大洲/国家/省份/城市），把该层级下所有区域的名称都展示出来；
  // 跟画布中心点无关，同一时刻只展示当前一个层级，不会跟其它层级同时显示
  // 当前需要展示标签的区域列表。
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
  // center 的同步 ref，供原生事件回调读取最新中心点。
  const centerRef = useRef(center);
  // 当前经纬度到像素的缩放比例，拖拽时用于把屏幕位移换算为经纬度位移。
  const scaleRef = useRef(1);
  // 数据范围默认中心点，center 为空或开始拖拽时使用。
  const defaultCenterRef = useRef({ lng: 0, lat: 0 });
  // 累积同一帧内的 wheel delta，避免每个 wheel 事件都触发 setZoom。
  const wheelDeltaRef = useRef(0);
  // 当前已排队的 requestAnimationFrame id。
  const wheelFrameRef = useRef<number | null>(null);

  /** 在没有固定 width 入参时，跟随外层容器宽度更新画布逻辑宽度。 */
  useEffect(() => {
    if (widthProp !== undefined) {
      setContainerWidth(widthProp);
      return;
    }
    const container = containerRef.current;
    if (!container) return;
    /** 读取容器当前宽度，并过滤掉布局尚未稳定时的 0 值。 */
    const updateWidth = (nextWidth: number) => {
      if (nextWidth <= 0) return;
      setContainerWidth(Math.max(1, Math.floor(nextWidth)));
    };
    updateWidth(container.clientWidth);
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      updateWidth(entry.contentRect.width);
    });
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, [widthProp]);

  // 列表选中项变化时，外部传入 focus（目标经纬度+目标缩放倍数），驱动地图平移并缩放到对应位置
  useEffect(() => {
    if (!focus) return;
    setCenter({ lng: focus.lng, lat: focus.lat });
    setZoom(focus.zoom);
  }, [focus?.lng, focus?.lat, focus?.zoom]);

  /** 同步 React state 到 ref，避免原生事件闭包读到旧 center。 */
  useEffect(() => {
    centerRef.current = center;
  }, [center]);

  /** 绑定 Canvas 的滚轮缩放和拖拽平移事件。 */
  useEffect(() => {
    // 当前 Canvas 节点。
    const canvas = canvasRef.current;
    if (!canvas) return;
    /** 处理滚轮缩放，同一帧内合并多次 wheel 事件。 */
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelDeltaRef.current += e.deltaY;
      if (wheelFrameRef.current !== null) return;
      wheelFrameRef.current = window.requestAnimationFrame(() => {
        // 当前帧内累计到的滚轮位移。
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

    // 是否正在拖拽画布。
    let dragging = false;
    // 拖拽起点信息：鼠标位置和拖拽开始时的地图中心。
    let dragStart = { x: 0, y: 0, lng: 0, lat: 0 };

    /** 开始拖拽，记录鼠标起点和地图中心。 */
    const handleMouseDown = (e: MouseEvent) => {
      dragging = true;
      // center 为空时，从当前数据范围默认中心开始拖拽。
      const startCenter = centerRef.current ?? defaultCenterRef.current;
      dragStart = {
        x: e.clientX,
        y: e.clientY,
        lng: startCenter.lng,
        lat: startCenter.lat,
      };
      canvas.style.cursor = 'grabbing';
    };
    /** 拖拽过程中把屏幕像素位移换算成经纬度中心位移。 */
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      // 当前投影比例，来自最近一次绘制。
      const scale = scaleRef.current;
      setCenter({
        lng: dragStart.lng - (e.clientX - dragStart.x) / scale,
        lat: dragStart.lat + (e.clientY - dragStart.y) / scale,
      });
    };
    /** 结束拖拽并恢复鼠标样式。 */
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

  /** 根据当前 props 和交互状态重绘整张地图。 */
  useEffect(() => {
    // 当前 Canvas 节点。
    const canvas = canvasRef.current;
    if (!canvas) return;
    // 2D 绘图上下文。
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Canvas DOM 尺寸是物理像素，绘图坐标仍使用逻辑像素，保证高 DPR 屏幕清晰且不改变业务坐标计算。
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = oceanStyle.fillColor;
    ctx.fillRect(0, 0, width, height);

    // 当前视口适配边界，marker 可能会进一步扩大这个范围。
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

    // 视口边界四至。
    const { minLng, maxLng, minLat, maxLat } = viewportBounds;
    // 地图在画布内的留白。
    const padding = 16;
    // 经度范围，避免 0 宽度导致除数异常。
    const lngRange = maxLng - minLng || 1;
    // 纬度范围，避免 0 高度导致除数异常。
    const latRange = maxLat - minLat || 1;
    // 让数据范围刚好适配画布的基础比例。
    const baseScale = Math.min(
      (width - padding * 2) / lngRange,
      (height - padding * 2) / latRange,
    );
    // 叠加用户缩放后的最终投影比例。
    const scale = baseScale * zoom;
    scaleRef.current = scale;

    // 当前数据边界盒中心经度。
    const bboxCenterLng = (minLng + maxLng) / 2;
    // 当前数据边界盒中心纬度。
    const bboxCenterLat = (minLat + maxLat) / 2;
    defaultCenterRef.current = { lng: bboxCenterLng, lat: bboxCenterLat };
    // 实际用于投影的中心点，优先使用用户拖拽或 focus 后的中心。
    const effectiveCenter = center ?? defaultCenterRef.current;

    // 当前缩放下整个世界宽度对应的像素值。
    const worldWidthPx = 360 * scale;
    // 世界宽度超过画布时，左右各补一份用于跨日期线连续显示。
    const wrapsHorizontally = worldWidthPx > width;
    // 横向重复绘制的偏移列表。
    const tileOffsets = wrapsHorizontally
      ? [-worldWidthPx, 0, worldWidthPx]
      : [0];

    /** 把经纬度转换成 Canvas 坐标。 */
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
    // 当前可见层级对应的样式。
    const currentLevelStyle = showCities
      ? cityStyle
      : showProvinces
        ? provinceStyle
        : showCountry
          ? countryStyle
          : continentStyle;
    // 标签主文本字号。
    const mainFontSize = showContinent ? 12 : showProvinces ? 8 : 10;
    // 标签英文副文本字号。
    const subFontSize = showContinent ? 10 : showProvinces ? 6 : 8;

    /** 计算区域标签的文本、屏幕坐标和透明度。 */
    interface RegionLabel {
      regionCode: string;
      mainText: string;
      subText: string;
      x: number;
      y: number;
      opacity: number;
    }

    const regionLabelPos = (
      region: PreparedGeoMapRegion,
    ): RegionLabel | null => {
      const { name, names } = region.geo.properties ?? {};
      if (!name) return null;
      // 主文本按当前语言优先，缺失时退回原始 name。
      const mainText = (langKey && names?.[langKey]) || name;
      // 副文本固定使用英文，缺失时也退回原始 name。
      const subText = names?.en || name;
      if (!region.labelCenter) return null;
      // 标签地理中心点。
      const labelCenter = region.labelCenter;
      // 标签画布坐标。
      const [x, y] = toXY(...labelCenter);
      // 选中区域标签全不透明，其余使用层级默认透明度。
      const opacity =
        activeRegion && region.code === activeRegion.code
          ? 1
          : currentLevelStyle.labelOpacity;
      return { regionCode: region.code, mainText, subText, x, y, opacity };
    };
    const isRegionLabel = (label: RegionLabel | null): label is RegionLabel =>
      label !== null;

    // 始终展示当前层级下所有区域的名称（跟画布中心点无关）；选中标签会单独放到最后绘制，避免被其它内容压住。
    // 当前需要绘制的普通标签列表。
    const regionLabels = autoLevelRegions
      .map(regionLabelPos)
      .filter(isRegionLabel)
      .filter((label) => label.regionCode !== activeRegion?.code);
    // 当前选中区域的标签；可能来自临时 overlay（如 selected-province），不一定存在于 autoLevelRegions 中。
    const activeRegionLabel = activeRegion
      ? regionLabelPos(activeRegion)
      : null;
    // 选中区域的顶层描边样式，按区域来源层级取对应配置。
    const activeRegionLevelStyle =
      activeRegion && preparedCityRegions.includes(activeRegion)
        ? cityStyle
        : activeRegion && preparedProvinceRegions.includes(activeRegion)
          ? provinceStyle
          : activeRegion && preparedRegions.includes(activeRegion)
            ? countryStyle
            : activeRegion && preparedContinentRegions.includes(activeRegion)
              ? continentStyle
              : currentLevelStyle;

    /** 绘制一条 polygon ring 到当前路径。 */
    const drawRingPath = (ring: number[][], tileOffsetX: number) => {
      if (ring.length === 0) return;
      ring.forEach(([lng, lat], index) => {
        // 当前经纬度点转换后的画布坐标。
        const [x, y] = toXY(lng, lat, tileOffsetX);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
    };

    /** 绘制一组区域，支持填充、描边、虚线和关闭描边。 */
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
            // 一个 polygon 的外环和内环必须处于同一个 path，并用 evenodd 填充规则扣出洞。
            ctx.beginPath();
            poly.forEach((ring) => drawRingPath(ring, tileOffsetX));
            ctx.fill('evenodd');
            if (strokeEnabled) ctx.stroke();
          });
        });
      });
    };

    /** 只重绘选中区域描边，作为所有地图图层之上的高亮轮廓。 */
    const drawActiveRegionOverlay = () => {
      if (!activeRegion) return;
      drawRegions(
        [activeRegion],
        'transparent',
        activeRegionLevelStyle.activeBorderColor,
        borderStyleToLineDash(activeRegionLevelStyle.borderStyle),
        activeRegionLevelStyle.borderWidth,
      );
      ctx.setLineDash([]);
      ctx.lineCap = 'butt';
    };

    /** 绘制当前点位/地标标记。 */
    const drawMarker = () => {
      if (!marker) return;
      tileOffsets.forEach((tileOffsetX) => {
        // marker 的画布坐标。
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
    };

    // showContinent/showCountry/showProvinces/showCities 在组件顶层计算，互斥，每次只有一个层级会画出来；
    // 每个层级自己的边框类型/颜色/粗细/填充色都来自 style.<level>，已在组件顶层解析好（continentStyle/countryStyle/...）
    /** 按发布态/选中态分组并绘制一个地图层级。 */
    const drawLevel = (
      list: PreparedGeoMapRegion[],
      levelStyle: ResolvedLevelStyle,
      isContinent = false,
    ) => {
      // 当前层级的 Canvas 虚线配置。
      const lineDash = borderStyleToLineDash(levelStyle.borderStyle);
      // 发布态/选中态是国家层级的概念，大洲编码跟国家 ISO 编码存在偶然撞码（如大洲 AF 跟阿富汗的国家编码 AF），
      // 大洲层级不参与 publishedCodes/activeRegionCode 匹配，避免把命中撞码的大洲误画成"已发布"
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
      // 默认态区域列表。
      const baseRegions: PreparedGeoMapRegion[] = [];
      // 已发布区域列表。
      const publishedRegions: PreparedGeoMapRegion[] = [];
      // 当前选中区域列表。
      const activeRegions: PreparedGeoMapRegion[] = [];
      list.forEach((region) => {
        if (activeRegionCode === region.code) {
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

    if (showContinent)
      drawLevel(preparedContinentRegions, continentStyle, true);
    if (showCountry) drawLevel(preparedRegions, countryStyle);
    // 放大到省份/城市层级后，国家边界不再消失，作为底图用国家自己的样式始终叠加描边
    if (showProvinces || showCities) drawLevel(preparedRegions, countryStyle);
    if (showProvinces) drawLevel(preparedProvinceRegions, provinceStyle);
    if (showCities) drawLevel(preparedCityRegions, cityStyle);

    ctx.setLineDash([]);
    ctx.lineCap = 'butt';

    /** 绘制区域标签；选中标签使用高亮色和白色描边，并由调用方放到最后绘制。 */
    const drawRegionLabel = (
      { mainText, subText, x, y, opacity }: RegionLabel,
      active = false,
    ) => {
      const mainColor = active
        ? activeRegionLevelStyle.activeLabelColor
        : currentLevelStyle.labelColor;
      const subColor = active
        ? activeRegionLevelStyle.activeLabelSubColor
        : currentLevelStyle.labelSubColor;
      const drawText = (
        text: string,
        textX: number,
        textY: number,
        fillColor: string,
      ) => {
        if (active) {
          ctx.lineWidth = 3;
          ctx.lineJoin = 'round';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
          ctx.strokeText(text, textX, textY);
        }
        ctx.fillStyle = fillColor;
        ctx.fillText(text, textX, textY);
      };

      ctx.save();
      ctx.globalAlpha = active ? 1 : opacity;
      ctx.textBaseline = 'middle';
      if (!langKey || langKey === 'en') {
        ctx.font = `bold ${mainFontSize}px sans-serif`;
        ctx.textAlign = 'center';
        drawText(mainText, x, y, mainColor);
        ctx.restore();
        return;
      }
      ctx.font = `bold ${mainFontSize}px sans-serif`;
      // 主文本渲染宽度，用于计算组合标签整体居中。
      const mainWidth = ctx.measureText(mainText).width;
      ctx.font = `${subFontSize}px sans-serif`;
      // 英文副文本渲染宽度，用于计算组合标签整体居中。
      const subWidth = ctx.measureText(subText).width;
      // 主文本和副文本之间的间距。
      const gap = 4;
      // 组合标签左侧起点，使主副文本整体围绕标签坐标居中。
      const startX = x - (mainWidth + gap + subWidth) / 2;
      ctx.textAlign = 'left';
      ctx.font = `bold ${mainFontSize}px sans-serif`;
      drawText(mainText, startX, y, mainColor);
      ctx.font = `${subFontSize}px sans-serif`;
      drawText(subText, startX + mainWidth + gap, y, subColor);
      ctx.restore();
    };

    // 跟 LanguageText 组件的展示规则保持一致：langKey 为 en（或缺省）时只画主文案；
    // 否则主文案（粗体）+ 英文副文案（字号比主文案小）并排展示，整体以 (x,y) 居中。
    regionLabels.forEach((label) => drawRegionLabel(label));

    // 当前纬度下 1 经度约等于多少公里。
    const kmPerLngDegree =
      KM_PER_DEGREE * Math.cos((effectiveCenter.lat * Math.PI) / 180);
    // 每公里对应的像素宽度。
    const pxPerKm = scale / kmPerLngDegree;
    // 比例尺最大显示像素长度。
    const maxBarPx = 100;
    // 适配当前缩放的友好比例尺公里数。
    const niceKm = pickNiceScaleKm(maxBarPx / pxPerKm);
    // 比例尺实际像素长度。
    const barPx = niceKm * pxPerKm;
    // 比例尺左侧 x 坐标。
    const barLeft = 16;
    // 比例尺底部 y 坐标。
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

    drawActiveRegionOverlay();
    drawMarker();
    if (activeRegionLabel) {
      drawRegionLabel(activeRegionLabel, true);
    }
  }, [
    preparedContinentRegions,
    preparedRegions,
    preparedProvinceRegions,
    preparedCityRegions,
    fitBounds,
    publishedCodeSet,
    activeRegion,
    activeRegionCode,
    autoLevelRegions,
    showContinent,
    showCountry,
    showProvinces,
    showCities,
    marker,
    langKey,
    width,
    height,
    pixelRatio,
    zoom,
    center,
    oceanStyle,
    continentStyle,
    countryStyle,
    provinceStyle,
    cityStyle,
  ]);

  /** 重置缩放和地图中心。 */
  const handleReset = () => {
    setZoom(1);
    setCenter(null);
  };

  // 图例配置，颜色来自当前层级样式。
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
    <div
      ref={containerRef}
      style={{ position: 'relative', width: widthProp ?? '100%', height }}
    >
      <canvas
        ref={canvasRef}
        width={canvasPixelWidth}
        height={canvasPixelHeight}
        style={{
          display: 'block',
          width: '100%',
          height,
          outline: '1px solid #f0f0f0',
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
