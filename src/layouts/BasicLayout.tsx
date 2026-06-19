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
import { LANGUAGES } from '@/types/system';
import LanguageLabel from '@/components/LanguageLabel';

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
    (hasPermission('geo:manage') ||
      hasPermission('traffic:manage') ||
      hasPermission('communication:manage')) && {
      key: 'info-center',
      icon: <InfoCircleOutlined />,
      label: <LanguageLabel langKey={language} labelKey="informationCenter" />,
      children: [
        hasPermission('geo:manage') && {
          key: '/info-center/geo',
          label: <LanguageLabel langKey={language} labelKey="geoInformation" />,
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
      ].filter(Boolean) as MenuProps['items'],
    },
    (hasPermission('country:manage') ||
      hasPermission('city:manage') ||
      hasPermission('language:manage') ||
      hasPermission('province:manage')) && {
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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{ height: 32, margin: 16, color: '#fff', textAlign: 'center' }}
        >
          finger-more
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['info-center', 'master-data', 'system']}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
              options={availableLanguages.map((code) => ({
                value: code,
                label: LANGUAGES.find((l) => l.code === code)?.label ?? code,
              }))}
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
        <Content style={{ margin: 16, background: '#fff', padding: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
