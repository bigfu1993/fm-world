import { Layout, Menu, Button, Select } from 'antd';
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  SettingOutlined,
  GlobalOutlined,
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
    (hasPermission('country:manage') || hasPermission('city:manage')) && {
      key: 'master-data',
      icon: <GlobalOutlined />,
      label: <LanguageLabel langKey={language} labelKey="masterData" />,
      children: [
        hasPermission('country:manage') && {
          key: '/master-data/countries',
          label: (
            <LanguageLabel langKey={language} labelKey="countryManagement" />
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
          defaultOpenKeys={['master-data', 'system']}
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
