import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import BasicLayout from '@/layouts/BasicLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import AdminUserPage from '@/pages/System/AdminUser'
import RolePage from '@/pages/System/Role'
import CountryPage from '@/pages/MasterData/Country'
import CityPage from '@/pages/MasterData/City'
import LanguagePage from '@/pages/MasterData/Language'
import ProvincePage from '@/pages/MasterData/Province'
import PointPage from '@/pages/MasterData/Point'
import LandmarkPage from '@/pages/MasterData/Landmark'
import TrafficInfoPage from '@/pages/InfoCenter/Traffic'
import CommunicationInfoPage from '@/pages/InfoCenter/Communication'
import StandardSpecPage from '@/pages/InfoCenter/StandardSpec'
import ServiceInfoPage from '@/pages/InfoCenter/ServiceInfo'
import SecurityRiskPage from '@/pages/InfoCenter/SecurityRisk'
import CultureCustomsPage from '@/pages/InfoCenter/CultureCustoms'
import CurrencyPaymentPage from '@/pages/InfoCenter/CurrencyPayment'
import EmergencyHandlingPage from '@/pages/InfoCenter/EmergencyHandling'
import PointTypePage from '@/pages/InfoCenter/PointType'
import LandmarkTypePage from '@/pages/InfoCenter/LandmarkType'
import NotFoundPage from '@/pages/NotFound'
import RequireAuth from './RequireAuth'

const PublishCenterPage = lazy(() => import('@/pages/PublishCenter'))

const routeFallback = (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
    <Spin />
  </div>
)

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
      {
        path: 'publish-center',
        element: (
          <Suspense fallback={routeFallback}>
            <PublishCenterPage />
          </Suspense>
        ),
      },
      { path: 'info-center/traffic', element: <TrafficInfoPage /> },
      { path: 'info-center/communication', element: <CommunicationInfoPage /> },
      { path: 'info-center/standard-specs', element: <StandardSpecPage /> },
      { path: 'info-center/service-info', element: <ServiceInfoPage /> },
      { path: 'info-center/security-risk', element: <SecurityRiskPage /> },
      { path: 'info-center/culture-customs', element: <CultureCustomsPage /> },
      { path: 'info-center/currency-payment', element: <CurrencyPaymentPage /> },
      { path: 'info-center/emergency-handling', element: <EmergencyHandlingPage /> },
      { path: 'info-center/point-types', element: <PointTypePage /> },
      { path: 'info-center/landmark-types', element: <LandmarkTypePage /> },
      { path: 'system/admin-users', element: <AdminUserPage /> },
      { path: 'system/roles', element: <RolePage /> },
      { path: 'master-data/countries', element: <CountryPage /> },
      { path: 'master-data/cities', element: <CityPage /> },
      { path: 'master-data/languages', element: <LanguagePage /> },
      { path: 'master-data/provinces', element: <ProvincePage /> },
      { path: 'master-data/points', element: <PointPage /> },
      { path: 'master-data/landmarks', element: <LandmarkPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
