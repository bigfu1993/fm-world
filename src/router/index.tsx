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
import AttractionPage from '@/pages/MasterData/Attraction'
import PointPage from '@/pages/MasterData/Point'
import PublishCenterPage from '@/pages/PublishCenter'
import GeoInfoPage from '@/pages/InfoCenter/Geo'
import TrafficInfoPage from '@/pages/InfoCenter/Traffic'
import CommunicationInfoPage from '@/pages/InfoCenter/Communication'
import FoodRecommendationPage from '@/pages/InfoCenter/Food'
import AccommodationRecommendationPage from '@/pages/InfoCenter/Accommodation'
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
      { path: 'info-center/food', element: <FoodRecommendationPage /> },
      { path: 'info-center/accommodation', element: <AccommodationRecommendationPage /> },
      { path: 'system/admin-users', element: <AdminUserPage /> },
      { path: 'system/roles', element: <RolePage /> },
      { path: 'master-data/countries', element: <CountryPage /> },
      { path: 'master-data/cities', element: <CityPage /> },
      { path: 'master-data/languages', element: <LanguagePage /> },
      { path: 'master-data/provinces', element: <ProvincePage /> },
      { path: 'master-data/attractions', element: <AttractionPage /> },
      { path: 'master-data/points', element: <PointPage /> },
    ],
  },
])
