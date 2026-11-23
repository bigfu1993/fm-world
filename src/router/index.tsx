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
import ProvincePage from '@/pages/MasterData/Province'
import PointPage from '@/pages/MasterData/Point'
import LandmarkPage from '@/pages/MasterData/Landmark'
import LanguagePage from '@/pages/InfoCenter/Language'
import PaymentInfoPage from '@/pages/InfoCenter/Payment'
import TrafficInfoPage from '@/pages/InfoCenter/Traffic'
import CommunicationInfoPage from '@/pages/InfoCenter/Communication'
import TimezoneInfoPage from '@/pages/InfoCenter/Timezone'
import ClimateInfoPage from '@/pages/InfoCenter/Climate'
import EntryPolicyInfoPage from '@/pages/InfoCenter/EntryPolicy'
import CustomsRestrictionInfoPage from '@/pages/InfoCenter/CustomsRestriction'
import NetworkInfoPage from '@/pages/InfoCenter/Network'
import TrafficRuleInfoPage from '@/pages/InfoCenter/TrafficRule'
import DrivingLicenseInfoPage from '@/pages/InfoCenter/DrivingLicense'
import StandardSpecPage from '@/pages/InfoCenter/StandardSpec'
import SecurityRiskPage from '@/pages/InfoCenter/SecurityRisk'
import CultureCustomsPage from '@/pages/InfoCenter/CultureCustoms'
import TourismInfoPage from '@/pages/InfoCenter/TourismInfo'
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
      { path: 'info-center/languages', element: <LanguagePage /> },
      { path: 'info-center/timezones', element: <TimezoneInfoPage /> },
      { path: 'info-center/climates', element: <ClimateInfoPage /> },
      {
        path: 'info-center/currencies',
        element: <Navigate to="/info-center/payment" replace />,
      },
      { path: 'info-center/payment', element: <PaymentInfoPage /> },
      { path: 'info-center/traffic', element: <TrafficInfoPage /> },
      { path: 'info-center/traffic-rules', element: <TrafficRuleInfoPage /> },
      { path: 'info-center/driving-licenses', element: <DrivingLicenseInfoPage /> },
      { path: 'info-center/communication', element: <CommunicationInfoPage /> },
      { path: 'info-center/networks', element: <NetworkInfoPage /> },
      { path: 'info-center/entry-policies', element: <EntryPolicyInfoPage /> },
      {
        path: 'info-center/customs-restrictions',
        element: <CustomsRestrictionInfoPage />,
      },
      { path: 'info-center/standard-specs', element: <StandardSpecPage /> },
      {
        path: 'info-center/service-info',
        element: <Navigate to="/info-center/traffic" replace />,
      },
      { path: 'info-center/security-risk', element: <SecurityRiskPage /> },
      { path: 'info-center/culture', element: <CultureCustomsPage /> },
      { path: 'info-center/tourism-info', element: <TourismInfoPage /> },
      {
        path: 'info-center/culture-customs',
        element: <Navigate to="/info-center/culture" replace />,
      },
      {
        path: 'info-center/currency-payment',
        element: <Navigate to="/info-center/payment" replace />,
      },
      { path: 'system/admin-users', element: <AdminUserPage /> },
      { path: 'system/roles', element: <RolePage /> },
      { path: 'master-data/countries', element: <CountryPage /> },
      { path: 'master-data/cities', element: <CityPage /> },
      {
        path: 'master-data/languages',
        element: <Navigate to="/info-center/languages" replace />,
      },
      { path: 'master-data/provinces', element: <ProvincePage /> },
      { path: 'master-data/points', element: <PointPage /> },
      { path: 'master-data/landmarks', element: <LandmarkPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
