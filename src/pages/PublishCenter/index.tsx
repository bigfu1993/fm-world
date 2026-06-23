import { Button, Input, Spin, Tag, message } from 'antd';
import { COUNTRIES } from '@/db/countries';
import { CONTINENTS } from '@/db/continents';
import { PROVINCES, type Province } from '@/db/provinces';
import { CITIES, type CityData } from '@/mock/cities';
import { points, landmarks } from '@/mock/db';
import { GEO_LIST } from '@/mock/geoSample';
import type { GeoNode } from '@/db/geo';
import type { Point, Landmark } from '@/types/point';
import {
  getPublishStatus,
  requestPublish,
  requestUnpublish,
} from '@/api/publish';
import type { PublishStatus } from '@/mock/publishStatus';
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore';
import type { LanguageCode } from '@/types/system';
import LanguageLabel from '@/components/LanguageLabel';
import LanguageText from '@/components/LanguageText';
import GeoMap, {
  type GeoMapFeature,
  type GeoMapFocus,
  type GeoMapMarker,
  type GeoMapRegion,
} from '@/components/GeoMap';
import { getLabel, type LabelKey } from '@/components/LanguageLabel/LabelMap';

const STATUS_LABEL_KEY: Record<PublishStatus, LabelKey> = {
  unpublished: 'statusUnpublished',
  'pending-publish': 'statusPendingPublish',
  published: 'statusPublished',
  'pending-unpublish': 'statusPendingUnpublish',
};

const STATUS_TAG_COLOR: Record<PublishStatus, string> = {
  unpublished: 'default',
  'pending-publish': 'orange',
  published: 'green',
  'pending-unpublish': 'orange',
};

// const countryCodes = Array.from(new Set(PROVINCES.map((p) => p.belongTo)));

const countryCodes = ['CN'];
console.log('模拟已发布国家列表:', countryCodes);
const countryOptions = COUNTRIES;
const PUBLISH_CENTER_LEFT_WIDTH = 1000;
const PUBLISH_CENTER_LIST_HEIGHT = 420;
const PUBLISH_CENTER_SECTION_GAP = 16;
const DEFAULT_MAP_HEIGHT = 280;

const geoLookup = new Map(GEO_LIST.map((g) => [g.code, g.geo]));

// COUNTRIES/PROVINCES/CONTINENTS 里才有完整的多语言译名，geo 数据本身只存了一个中文名；
// 这里把多语言名称挂到 geo.properties.names 上，地图组件才能跟着语言切换展示
const continentNamesByCode = new Map(
  CONTINENTS.map((c) => [c.code, c as Record<string, string>]),
);
const countryNamesByCode = new Map(
  COUNTRIES.map((c) => [c.code, c as Record<string, string>]),
);
const provinceNamesByCode = new Map(
  PROVINCES.map((p) => [p.code, p as Record<string, string>]),
);

function withNames(
  region: { code: string; geo: GeoMapFeature },
  names?: Record<string, string>,
): GeoMapRegion {
  if (!names || !region.geo.properties) return region;
  return {
    ...region,
    geo: { ...region.geo, properties: { ...region.geo.properties, names } },
  };
}

interface PreparedGeoTreeData {
  worldContinentRegions: GeoMapRegion[];
  worldRegions: GeoMapRegion[];
  worldProvinceRegions: GeoMapRegion[];
  worldCityRegions: GeoMapRegion[];
  provinceGeoByCode: Map<string, GeoMapFeature>;
  provinceGeoByChineseName: Map<string, GeoMapFeature>;
}

const EMPTY_GEO_TREE_DATA: PreparedGeoTreeData = {
  worldContinentRegions: [],
  worldRegions: [],
  worldProvinceRegions: [],
  worldCityRegions: [],
  provinceGeoByCode: new Map(),
  provinceGeoByChineseName: new Map(),
};

function prepareGeoTreeData(geoTree: GeoNode[]): PreparedGeoTreeData {
  // GEO_TREE 顶层现在是大洲，国家变成了大洲的子节点，省份/城市相应再往下各退一层
  const worldContinentRegions: GeoMapRegion[] = geoTree.map((n) =>
    withNames({ code: n.code, geo: n.geo }, continentNamesByCode.get(n.code)),
  );
  const worldCountries = geoTree.flatMap(
    (continent) => continent.children ?? [],
  );
  const worldRegions: GeoMapRegion[] = worldCountries.map((n) =>
    withNames({ code: n.code, geo: n.geo }, countryNamesByCode.get(n.code)),
  );
  const worldProvinceRegions: GeoMapRegion[] = worldCountries.flatMap((n) =>
    (n.children ?? []).map((child) =>
      withNames(
        { code: child.code, geo: child.geo },
        provinceNamesByCode.get(child.code),
      ),
    ),
  );
  const worldCityRegions: GeoMapRegion[] = worldCountries.flatMap((n) =>
    (n.children ?? []).flatMap((province) =>
      (province.children ?? []).map((city) => ({
        code: city.code,
        geo: city.geo,
      })),
    ),
  );
  // db/geo 里省份的 code 跟 db/provinces.ts 的 code 是同一套体系（都来自 Natural Earth admin-1 的 iso_3166_2），
  // 唯独中国走的是 DataV 的数字编码（CN-32 等），跟 provinces.ts 里的字母编码（CN-XJ 等）对不上，
  // 只能退而用中文名做兼容映射（两边的省份中文名是一致的）
  const provinceGeoByCode = new Map(
    worldProvinceRegions.map((r) => [r.code, r.geo]),
  );
  const provinceGeoByChineseName = new Map(
    worldProvinceRegions
      .filter((r) => r.geo.properties?.name)
      .map((r) => [r.geo.properties!.name, r.geo]),
  );
  return {
    worldContinentRegions,
    worldRegions,
    worldProvinceRegions,
    worldCityRegions,
    provinceGeoByCode,
    provinceGeoByChineseName,
  };
}

function provinceGeoCode(province: Province): string {
  return `${province.belongTo}*${province.code}`;
}

function cityGeoCode(city: CityData): string {
  return `${city.countryCode}*${city.provinceCode}*${city.code}`;
}

const FOCUS_ZOOM_COUNTRY = 4;
const FOCUS_ZOOM_PROVINCE_OR_CITY = 10;
const FOCUS_ZOOM_POINT = 50;

function regionCenter(
  geo?: GeoMapFeature,
): { lng: number; lat: number } | undefined {
  if (!geo) return undefined;
  if (geo.centroid) return { lng: geo.centroid[0], lat: geo.centroid[1] };
  const { geometry } = geo;
  const polygons =
    geometry.type === 'MultiPolygon'
      ? geometry.coordinates
      : [geometry.coordinates];
  const ring = (polygons as number[][][][])[0]?.[0];
  if (!ring || ring.length === 0) return undefined;
  const lngs = ring.map((p) => p[0]);
  const lats = ring.map((p) => p[1]);
  return {
    lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
    lat: (Math.min(...lats) + Math.max(...lats)) / 2,
  };
}

function matchesKeyword(values: string[], keyword: string): boolean {
  if (!keyword) return true;
  return values.some((value) => value.toLowerCase().includes(keyword));
}

interface ListColumnProps<T> {
  titleKey: LabelKey;
  items: T[];
  selectedKey?: string;
  onSelect: (key: string) => void;
  langKey: LanguageCode;
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  getKey: (item: T) => string;
  getNameMap: (item: T) => Record<string, string>;
  hasMissingChild?: (item: T) => boolean;
}

function ListColumn<T>({
  titleKey,
  items,
  selectedKey,
  onSelect,
  langKey,
  keyword,
  onKeywordChange,
  getKey,
  getNameMap,
  hasMissingChild,
}: ListColumnProps<T>) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 160,
        borderRight: '1px solid #f0f0f0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>
          <LanguageLabel langKey={langKey} labelKey={titleKey} />
        </div>
        <Input
          size="small"
          allowClear
          placeholder={getLabel('search', langKey)}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.map((item) => {
          const key = getKey(item);
          return (
            <div
              key={key}
              onClick={() => onSelect(key)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: key === selectedKey ? '#e6f4ff' : undefined,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {hasMissingChild?.(item) && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#ff4d4f',
                      flexShrink: 0,
                    }}
                  />
                )}
                <LanguageText langKey={langKey} map={getNameMap(item)} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PublishCenterPage() {
  const language = useAuthStore(selectCurrentLanguage);
  const [geoTree, setGeoTree] = useState<GeoNode[] | null>(null);
  const [geoTreeLoading, setGeoTreeLoading] = useState(true);
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined);
  const [provinceCode, setProvinceCode] = useState<string | undefined>(
    undefined,
  );
  const [cityCode, setCityCode] = useState<string | undefined>(undefined);
  const [pointId, setPointId] = useState<string | undefined>(undefined);
  const [landmarkId, setLandmarkId] = useState<string | undefined>(undefined);
  const [countryKeyword, setCountryKeyword] = useState('');
  const [provinceKeyword, setProvinceKeyword] = useState('');
  const [cityKeyword, setCityKeyword] = useState('');
  const [pointKeyword, setPointKeyword] = useState('');
  const [landmarkKeyword, setLandmarkKeyword] = useState('');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState(DEFAULT_MAP_HEIGHT);

  useEffect(() => {
    let disposed = false;
    import('@/db/geo')
      .then(({ GEO_TREE }) => {
        if (!disposed) setGeoTree(GEO_TREE);
      })
      .catch((error) => {
        console.error('加载地理数据失败:', error);
      })
      .finally(() => {
        if (!disposed) setGeoTreeLoading(false);
      });
    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const updateMapHeight = (nextHeight: number) => {
      if (nextHeight <= 0) return;
      setMapHeight(Math.max(1, Math.floor(nextHeight)));
    };

    updateMapHeight(container.clientHeight);
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      updateMapHeight(entry.contentRect.height);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const {
    worldContinentRegions,
    worldRegions,
    worldProvinceRegions,
    worldCityRegions,
    provinceGeoByCode,
    provinceGeoByChineseName,
  } = useMemo(
    () => (geoTree ? prepareGeoTreeData(geoTree) : EMPTY_GEO_TREE_DATA),
    [geoTree],
  );

  // 级联规则：选中某一层级后，再往下的层级强依赖"上一层级是否有具体选中值"；
  // 只有当上一层级及其更上层都没有任何选中（即一直没有被"锁住"）时，才独立展示全量数据，否则展示为空
  const provincesOfCountry = countryCode
    ? PROVINCES.filter((p) => p.belongTo === countryCode)
    : PROVINCES;
  const provinceFree = !countryCode;

  const citiesOfProvince = provinceCode
    ? CITIES.filter((c) => c.provinceCode === provinceCode)
    : provinceFree
      ? CITIES
      : [];
  const cityFree = !provinceCode && provinceFree;

  const pointsOfCity = cityCode
    ? points.filter((p) => p.cityCode === cityCode)
    : cityFree
      ? points
      : [];
  const pointFree = !cityCode && cityFree;

  const landmarksOfPoint = pointId
    ? landmarks.filter((l) => l.pointId === pointId)
    : pointFree
      ? landmarks
      : [];

  const filteredCountries = countryOptions.filter((c) =>
    matchesKeyword(Object.values(c), countryKeyword.trim().toLowerCase()),
  );
  const filteredProvinces = provincesOfCountry.filter((p) =>
    matchesKeyword(Object.values(p), provinceKeyword.trim().toLowerCase()),
  );
  const filteredCities = citiesOfProvince.filter((c) =>
    matchesKeyword(Object.values(c), cityKeyword.trim().toLowerCase()),
  );
  const filteredPoints = pointsOfCity.filter((p) =>
    matchesKeyword(Object.values(p.name), pointKeyword.trim().toLowerCase()),
  );
  const filteredLandmarks = landmarksOfPoint.filter((l) =>
    matchesKeyword(Object.values(l.name), landmarkKeyword.trim().toLowerCase()),
  );

  const hasGeoData = (geoCode: string) => geoLookup.has(geoCode);

  const provinceHasMissingChild = (province: Province) => {
    const citiesOf = CITIES.filter((c) => c.provinceCode === province.code);
    return (
      citiesOf.length > 0 && citiesOf.some((c) => !hasGeoData(cityGeoCode(c)))
    );
  };

  const countryHasMissingChild = (country: { code: string }) => {
    const provincesOf = PROVINCES.filter((p) => p.belongTo === country.code);
    return (
      provincesOf.length > 0 &&
      provincesOf.some(
        (p) => !hasGeoData(provinceGeoCode(p)) || provinceHasMissingChild(p),
      )
    );
  };

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode);
  const selectedProvince = PROVINCES.find((p) => p.code === provinceCode);
  const selectedCity = CITIES.find((c) => c.code === cityCode);
  const selectedPoint = points.find((p) => p.id === pointId);
  const selectedLandmark = landmarks.find((l) => l.id === landmarkId);

  const selectedPublishKey = selectedLandmark
    ? `landmark:${selectedLandmark.id}`
    : selectedPoint
      ? `point:${selectedPoint.id}`
      : selectedCity
        ? `city:${cityGeoCode(selectedCity)}`
        : selectedProvince
          ? `province:${provinceGeoCode(selectedProvince)}`
          : selectedCountry
            ? `country:${selectedCountry.code}`
            : undefined;

  const [, setStatusVersion] = useState(0);
  const currentPublishStatus = selectedPublishKey
    ? getPublishStatus(selectedPublishKey)
    : undefined;

  const handlePublish = async () => {
    if (!selectedPublishKey) return;
    await requestPublish(selectedPublishKey);
    message.success(getLabel('publishRequested', language));
    setStatusVersion((v) => v + 1);
  };

  const handleUnpublish = async () => {
    if (!selectedPublishKey) return;
    await requestUnpublish(selectedPublishKey);
    message.success(getLabel('unpublishRequested', language));
    setStatusVersion((v) => v + 1);
  };

  const handleSelectCountry = (code: string) => {
    setCountryCode((prev) => (prev === code ? undefined : code));
    setProvinceCode(undefined);
    setCityCode(undefined);
    setPointId(undefined);
    setLandmarkId(undefined);
  };

  const handleSelectProvince = (code: string) => {
    setProvinceCode((prev) => (prev === code ? undefined : code));
    setCityCode(undefined);
    setPointId(undefined);
    setLandmarkId(undefined);
  };

  const handleSelectCity = (code: string) => {
    setCityCode((prev) => (prev === code ? undefined : code));
    setPointId(undefined);
    setLandmarkId(undefined);
  };

  const handleSelectPoint = (id: string) => {
    setPointId((prev) => (prev === id ? undefined : id));
    setLandmarkId(undefined);
  };

  const handleSelectLandmark = (id: string) => {
    setLandmarkId((prev) => (prev === id ? undefined : id));
  };

  const pointMarker = selectedPoint
    ? {
        lat: selectedPoint.coordinates[0],
        lng: selectedPoint.coordinates[1],
        label: selectedPoint.name[language] ?? selectedPoint.name.en,
      }
    : undefined;

  const mapRegions: GeoMapRegion[] = [...worldRegions];
  const activeCodes: string[] = [];

  if (selectedCountry) {
    activeCodes.push(selectedCountry.code);
  }
  if (selectedProvince) {
    const geo =
      provinceGeoByCode.get(selectedProvince.code) ??
      provinceGeoByChineseName.get(selectedProvince.zh) ??
      (geoLookup.get(provinceGeoCode(selectedProvince)) as
        | GeoMapFeature
        | undefined);
    if (geo) {
      mapRegions.push({ code: 'selected-province', geo });
      activeCodes.push('selected-province');
    }
  }
  if (selectedCity) {
    const geo = geoLookup.get(cityGeoCode(selectedCity)) as
      | GeoMapFeature
      | undefined;
    if (geo) {
      mapRegions.push({ code: 'selected-city', geo });
      activeCodes.push('selected-city');
    }
  }

  let canvasMarker: GeoMapMarker | undefined;

  if (selectedLandmark && selectedPoint) {
    canvasMarker = {
      lat: selectedPoint.coordinates[0],
      lng: selectedPoint.coordinates[1],
      label: selectedLandmark.name[language] ?? selectedLandmark.name.en,
    };
  } else if (selectedPoint) {
    canvasMarker = pointMarker;
  }

  const countryGeo = selectedCountry
    ? worldRegions.find((r) => r.code === selectedCountry.code)?.geo
    : undefined;

  const selectedProvinceGeo = selectedProvince
    ? (provinceGeoByCode.get(selectedProvince.code) ??
      provinceGeoByChineseName.get(selectedProvince.zh) ??
      (geoLookup.get(provinceGeoCode(selectedProvince)) as
        | GeoMapFeature
        | undefined))
    : undefined;

  let mapFocus: GeoMapFocus | undefined;
  if (selectedPoint) {
    mapFocus = {
      lng: selectedPoint.coordinates[1],
      lat: selectedPoint.coordinates[0],
      zoom: FOCUS_ZOOM_POINT,
    };
  } else if (selectedCity) {
    const center =
      regionCenter(
        geoLookup.get(cityGeoCode(selectedCity)) as GeoMapFeature | undefined,
      ) ??
      regionCenter(selectedProvinceGeo) ??
      regionCenter(countryGeo);
    if (center) mapFocus = { ...center, zoom: FOCUS_ZOOM_PROVINCE_OR_CITY };
  } else if (selectedProvince) {
    const center =
      regionCenter(selectedProvinceGeo) ?? regionCenter(countryGeo);
    if (center) mapFocus = { ...center, zoom: FOCUS_ZOOM_PROVINCE_OR_CITY };
  } else if (selectedCountry) {
    const center = regionCenter(countryGeo);
    if (center) mapFocus = { ...center, zoom: FOCUS_ZOOM_COUNTRY };
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `${PUBLISH_CENTER_LEFT_WIDTH}px minmax(0, 1fr)`,
        columnGap: PUBLISH_CENTER_SECTION_GAP,
        height: '100%',
        minHeight: 720,
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: '1 1 0',
            flexDirection: 'column',
            marginBottom: PUBLISH_CENTER_SECTION_GAP,
            minHeight: 0,
          }}
        >
          <div ref={mapContainerRef} style={{ flex: 1, minHeight: 0 }}>
            {geoTreeLoading ? (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #f0f0f0',
                  background: '#dceefc',
                }}
              >
                <Spin size="small" />
              </div>
            ) : (
              <GeoMap
                continentRegions={worldContinentRegions}
                regions={mapRegions}
                provinceRegions={worldProvinceRegions}
                cityRegions={worldCityRegions}
                publishedCodes={countryCodes}
                activeCodes={activeCodes}
                marker={canvasMarker}
                focus={mapFocus}
                langKey={language}
                height={mapHeight}
              />
            )}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: '0 0 auto',
            height: PUBLISH_CENTER_LIST_HEIGHT,
            border: '1px solid #f0f0f0',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          <ListColumn
            titleKey="country"
            items={filteredCountries}
            selectedKey={countryCode}
            onSelect={handleSelectCountry}
            langKey={language}
            keyword={countryKeyword}
            onKeywordChange={setCountryKeyword}
            getKey={(item) => item.code}
            getNameMap={(item) => item}
            hasMissingChild={countryHasMissingChild}
          />
          <ListColumn
            titleKey="province"
            items={filteredProvinces}
            selectedKey={provinceCode}
            onSelect={handleSelectProvince}
            langKey={language}
            keyword={provinceKeyword}
            onKeywordChange={setProvinceKeyword}
            getKey={(item) => item.code}
            getNameMap={(item) => item}
            hasMissingChild={provinceHasMissingChild}
          />
          <ListColumn
            titleKey="city"
            items={filteredCities}
            selectedKey={cityCode}
            onSelect={handleSelectCity}
            langKey={language}
            keyword={cityKeyword}
            onKeywordChange={setCityKeyword}
            getKey={(item) => item.code}
            getNameMap={(item) => item}
          />
          <ListColumn<Point>
            titleKey="point"
            items={filteredPoints}
            selectedKey={pointId}
            onSelect={handleSelectPoint}
            langKey={language}
            keyword={pointKeyword}
            onKeywordChange={setPointKeyword}
            getKey={(item) => item.id}
            getNameMap={(item) => ({ ...item.name })}
          />
          <ListColumn<Landmark>
            titleKey="landmark"
            items={filteredLandmarks}
            selectedKey={landmarkId}
            onSelect={handleSelectLandmark}
            langKey={language}
            keyword={landmarkKeyword}
            onKeywordChange={setLandmarkKeyword}
            getKey={(item) => item.id}
            getNameMap={(item) => ({ ...item.name })}
          />
        </div>
      </div>
      <div
        style={{
          borderLeft: '1px solid #f0f0f0',
          minWidth: 0,
          paddingLeft: PUBLISH_CENTER_SECTION_GAP,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
          }}
        >
          {currentPublishStatus ? (
            <Tag color={STATUS_TAG_COLOR[currentPublishStatus]}>
              <LanguageLabel
                langKey={language}
                labelKey={STATUS_LABEL_KEY[currentPublishStatus]}
              />
            </Tag>
          ) : (
            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
              <LanguageLabel
                langKey={language}
                labelKey="pleaseSelectItemToPublish"
              />
            </span>
          )}
          <Button
            size="small"
            type="primary"
            disabled={
              !selectedPublishKey || currentPublishStatus !== 'unpublished'
            }
            onClick={handlePublish}
          >
            <LanguageLabel langKey={language} labelKey="publish" />
          </Button>
          <Button
            size="small"
            disabled={
              !selectedPublishKey || currentPublishStatus !== 'published'
            }
            onClick={handleUnpublish}
          >
            <LanguageLabel langKey={language} labelKey="unpublish" />
          </Button>
        </div>
      </div>
    </div>
  );
}
