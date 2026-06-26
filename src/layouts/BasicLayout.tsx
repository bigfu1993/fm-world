import { Layout, Menu, Button, Select } from 'antd';
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  SettingOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Outlet } from 'react-router-dom';
import { useAuthStore, selectCurrentLanguage } from '@/store/useAuthStore';
import { GLOBAL_LANGUAGES } from '@/mock/languages';
import LanguageLabel from '@/components/LanguageLabel';
import LanguageText from '@/components/LanguageText';

const { Header, Sider, Content } = Layout;

export default function BasicLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const hasPermission = useAuthStore((s) => s.hasPermission);
  const language = useAuthStore(selectCurrentLanguage);
  const availableLanguages = useAuthStore((s) => s.user?.languages ?? []);
  const setCurrentLanguage = useAuthStore((s) => s.setCurrentLanguage);

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <LanguageLabel langKey={language} labelKey="dashboard" />,
    },
    hasPermission('publish:manage') && {
      key: '/publish-center',
      icon: <SendOutlined />,
      label: <LanguageLabel langKey={language} labelKey="publishCenter" />,
    },
    (hasPermission('country:manage') ||
      hasPermission('city:manage') ||
      hasPermission('language:manage') ||
      hasPermission('province:manage') ||
      hasPermission('point:manage') ||
      hasPermission('landmark:manage')) && {
      key: 'master-data',
      icon: <GlobalOutlined />,
      label: <LanguageLabel langKey={language} labelKey="masterData" />,
      children: [
        hasPermission('language:manage') && {
          key: '/master-data/languages',
          label: (
            <LanguageLabel langKey={language} labelKey="languageManagement" />
          ),
        },
        hasPermission('country:manage') && {
          key: '/master-data/countries',
          label: (
            <LanguageLabel langKey={language} labelKey="countryManagement" />
          ),
        },
        hasPermission('province:manage') && {
          key: '/master-data/provinces',
          label: (
            <LanguageLabel langKey={language} labelKey="provinceManagement" />
          ),
        },
        hasPermission('city:manage') && {
          key: '/master-data/cities',
          label: <LanguageLabel langKey={language} labelKey="cityManagement" />,
        },
        hasPermission('point:manage') && {
          key: '/master-data/points',
          label: <LanguageLabel langKey={language} labelKey="pointManagement" />,
        },
        hasPermission('landmark:manage') && {
          key: '/master-data/landmarks',
          label: (
            <LanguageLabel langKey={language} labelKey="landmarkManagement" />
          ),
        },
      ].filter(Boolean) as MenuProps['items'],
    },
    (hasPermission('traffic:manage') ||
      hasPermission('communication:manage') ||
      hasPermission('standardSpec:manage') ||
      hasPermission('serviceInfo:manage') ||
      hasPermission('securityRisk:manage') ||
      hasPermission('cultureCustoms:manage') ||
      hasPermission('currencyPayment:manage') ||
      hasPermission('emergencyHandling:manage') ||
      hasPermission('pointType:manage') ||
      hasPermission('landmarkType:manage')) && {
      key: 'info-center',
      icon: <InfoCircleOutlined />,
      label: <LanguageLabel langKey={language} labelKey="informationCenter" />,
      children: [
        hasPermission('standardSpec:manage') && {
          key: '/info-center/standard-specs',
          label: (
            <LanguageLabel langKey={language} labelKey="standardSpecification" />
          ),
        },
        hasPermission('traffic:manage') && {
          key: '/info-center/traffic',
          label: <LanguageLabel langKey={language} labelKey="trafficInformation" />,
        },
        hasPermission('communication:manage') && {
          key: '/info-center/communication',
          label: (
            <LanguageLabel langKey={language} labelKey="communicationInformation" />
          ),
        },
        hasPermission('serviceInfo:manage') && {
          key: '/info-center/service-info',
          label: (
            <LanguageLabel langKey={language} labelKey="serviceInformation" />
          ),
        },
        hasPermission('securityRisk:manage') && {
          key: '/info-center/security-risk',
          label: <LanguageLabel langKey={language} labelKey="securityRisk" />,
        },
        hasPermission('cultureCustoms:manage') && {
          key: '/info-center/culture-customs',
          label: <LanguageLabel langKey={language} labelKey="cultureCustoms" />,
        },
        hasPermission('currencyPayment:manage') && {
          key: '/info-center/currency-payment',
          label: <LanguageLabel langKey={language} labelKey="currencyPayment" />,
        },
        hasPermission('emergencyHandling:manage') && {
          key: '/info-center/emergency-handling',
          label: (
            <LanguageLabel langKey={language} labelKey="emergencyHandling" />
          ),
        },
        hasPermission('pointType:manage') && {
          key: '/info-center/point-types',
          label: (
            <LanguageLabel langKey={language} labelKey="pointTypeManagement" />
          ),
        },
        hasPermission('landmarkType:manage') && {
          key: '/info-center/landmark-types',
          label: (
            <LanguageLabel langKey={language} labelKey="landmarkTypeManagement" />
          ),
        },
      ].filter(Boolean) as MenuProps['items'],
    },
    (hasPermission('admin:manage') || hasPermission('role:manage')) && {
      key: 'system',
      icon: <SettingOutlined />,
      label: <LanguageLabel langKey={language} labelKey="systemManagement" />,
      children: [
        hasPermission('admin:manage') && {
          key: '/system/admin-users',
          label: (
            <LanguageLabel langKey={language} labelKey="adminUserManagement" />
          ),
        },
        hasPermission('role:manage') && {
          key: '/system/roles',
          label: <LanguageLabel langKey={language} labelKey="roleManagement" />,
        },
      ].filter(Boolean) as MenuProps['items'],
    },
  ].filter(Boolean) as MenuProps['items'];

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100%' }}>
        <div style={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{ height: 32, margin: 16, color: '#fff', textAlign: 'center', flexShrink: 0 }}
          >
            finger-more
          </div>
          <div className="sider-menu-scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              defaultOpenKeys={['master-data', 'info-center', 'system']}
              items={menuItems}
              onClick={({ key }) => navigate(key)}
            />
          </div>
        </div>
      </Sider>
      <Layout style={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
        <Header
          style={{
            padding: 0,
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Select
              size="small"
              value={language}
              onChange={setCurrentLanguage}
              style={{ width: 120 }}
              options={availableLanguages.map((code) => {
                const lang = GLOBAL_LANGUAGES.find((l) => l.code === code)
                return { value: code, label: lang ? <LanguageText langKey={language} map={lang} /> : code }
              })}
            />
          </div>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={{ marginRight: 16 }}
          >
            <LanguageLabel langKey={language} labelKey="logout" />
          </Button>
        </Header>
        <Content style={{ margin: 16, background: '#fff', padding: 16, overflowY: 'auto', flex: 1, minHeight: 0 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
