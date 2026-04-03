import { lazy, Suspense } from 'react'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom'

import { AuthGuard } from './auth-guard'

const AppLayout = lazy(() =>
  import('../widgets/layout').then((m) => ({ default: m.AppLayout }))
)
const DashboardPage = lazy(() =>
  import('../pages/home').then((m) => ({ default: m.DashboardPage }))
)
const KonDashboardPage = lazy(() =>
  import('../pages/home').then((m) => ({ default: m.KonDashboardPage }))
)
const CommunityListPage = lazy(() =>
  import('../pages/community').then((m) => ({ default: m.CommunityListPage }))
)
const CommunityDetailPage = lazy(() =>
  import('../pages/community').then((m) => ({ default: m.CommunityDetailPage }))
)
const CommunityWritePage = lazy(() =>
  import('../pages/community').then((m) => ({ default: m.CommunityWritePage }))
)
const LeaveManagementPage = lazy(() =>
  import('../pages/leave').then((m) => ({ default: m.LeaveManagementPage }))
)
const LeaveRequestPage = lazy(() =>
  import('../pages/leave').then((m) => ({ default: m.LeaveRequestPage }))
)
const LeaveCalendarPage = lazy(() =>
  import('../pages/leave').then((m) => ({ default: m.LeaveCalendarPage }))
)
const NoticeListPage = lazy(() =>
  import('../pages/notice').then((m) => ({ default: m.NoticeListPage }))
)
const NoticeDetailPage = lazy(() =>
  import('../pages/notice').then((m) => ({ default: m.NoticeDetailPage }))
)
const ProfilePage = lazy(() =>
  import('../pages/profile').then((m) => ({ default: m.ProfilePage }))
)
const OrganizationPage = lazy(() =>
  import('../pages/organization').then((m) => ({ default: m.OrganizationPage }))
)
const AttendancePage = lazy(() =>
  import('../pages/attendance').then((m) => ({ default: m.AttendancePage }))
)
const ApprovalListPage = lazy(() =>
  import('../pages/approval').then((m) => ({ default: m.ApprovalListPage }))
)
const ApprovalDetailPage = lazy(() =>
  import('../pages/approval').then((m) => ({ default: m.ApprovalDetailPage }))
)
const ApprovalRequestPage = lazy(() =>
  import('../pages/approval').then((m) => ({ default: m.ApprovalRequestPage }))
)
const LoginPage = lazy(() =>
  import('../pages/auth').then((m) => ({ default: m.LoginPage }))
)
const SettingsPage = lazy(() =>
  import('../pages/settings').then((m) => ({ default: m.SettingsPage }))
)

function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function ProtectedLayout() {
  return (
    <AuthGuard>
      <Suspense fallback={<PageLoader />}>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </Suspense>
    </AuthGuard>
  )
}

const router = createBrowserRouter([
  // {
  //   path: '/login',
  //   element: (
  //     <Suspense fallback={<PageLoader />}>
  //       <LoginPage />
  //     </Suspense>
  //   ),
  // },
  {
    path: '/kon',
    element: (
      <Suspense fallback={<PageLoader />}>
        <KonDashboardPage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'community', element: <CommunityListPage /> },
      { path: 'community/write', element: <CommunityWritePage /> },
      { path: 'community/:id', element: <CommunityDetailPage /> },
      { path: 'leave', element: <LeaveManagementPage /> },
      { path: 'leave/request', element: <LeaveRequestPage /> },
      { path: 'leave/calendar', element: <LeaveCalendarPage /> },
      { path: 'notice', element: <NoticeListPage /> },
      { path: 'notice/:id', element: <NoticeDetailPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'organization', element: <OrganizationPage /> },
      { path: 'attendance', element: <AttendancePage /> },
      { path: 'approval', element: <ApprovalListPage /> },
      { path: 'approval/request', element: <ApprovalRequestPage /> },
      { path: 'approval/:id', element: <ApprovalDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
