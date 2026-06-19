import { createBrowserRouter, Navigate } from 'react-router-dom'
import BasicLayout from '@/layouts/BasicLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import AdminUserPage from '@/pages/AdminUser'
import RolePage from '@/pages/Role'
import CountryPage from '@/pages/Country'
import CityPage from '@/pages/City'
import LanguagePage from '@/pages/Language'
import ProvincePage from '@/pages/Province'
import PublishCenterPage from '@/pages/PublishCenter'
import GeoInfoPage from '@/pages/GeoInfo'
import TrafficInfoPage from '@/pages/TrafficInfo'
import CommunicationInfoPage from '@/pages/CommunicationInfo'
import RequireAuth from './RequireAuth'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <BasicLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'publish-center', element: <PublishCenterPage /> },
      { path: 'info-center/geo', element: <GeoInfoPage /> },
      { path: 'info-center/traffic', element: <TrafficInfoPage /> },
      { path: 'info-center/communication', element: <CommunicationInfoPage /> },
      { path: 'system/admin-users', element: <AdminUserPage /> },
      { path: 'system/roles', element: <RolePage /> },
      { path: 'master-data/countries', element: <CountryPage /> },
      { path: 'master-data/cities', element: <CityPage /> },
      { path: 'master-data/languages', element: <LanguagePage /> },
      { path: 'master-data/provinces', element: <ProvincePage /> },
    ],
  },
])
