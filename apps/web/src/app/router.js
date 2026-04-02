import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, } from 'react-router-dom';
import { AuthGuard } from './auth-guard';

const AppLayout = lazy(() => import('../widgets/layout').then((m) => ({ default: m.AppLayout })));
const DashboardPage = lazy(() => import('../pages/home').then((m) => ({ default: m.DashboardPage })));
const KonDashboardPage = lazy(() => import('../pages/home/ui/kon-dashboard-page').then((m) => ({ default: m.KonDashboardPage })));
const CommunityListPage = lazy(() => import('../pages/community').then((m) => ({ default: m.CommunityListPage })));
const CommunityDetailPage = lazy(() => import('../pages/community').then((m) => ({ default: m.CommunityDetailPage })));
const CommunityWritePage = lazy(() => import('../pages/community').then((m) => ({ default: m.CommunityWritePage })));
const LeaveManagementPage = lazy(() => import('../pages/leave').then((m) => ({ default: m.LeaveManagementPage })));
const LeaveRequestPage = lazy(() => import('../pages/leave').then((m) => ({ default: m.LeaveRequestPage })));
const LeaveCalendarPage = lazy(() => import('../pages/leave').then((m) => ({ default: m.LeaveCalendarPage })));
const NoticeListPage = lazy(() => import('../pages/notice').then((m) => ({ default: m.NoticeListPage })));
const NoticeDetailPage = lazy(() => import('../pages/notice').then((m) => ({ default: m.NoticeDetailPage })));
const ProfilePage = lazy(() => import('../pages/profile').then((m) => ({ default: m.ProfilePage })));
const OrganizationPage = lazy(() => import('../pages/organization').then((m) => ({ default: m.OrganizationPage })));
const AttendancePage = lazy(() => import('../pages/attendance').then((m) => ({ default: m.AttendancePage })));
const ApprovalListPage = lazy(() => import('../pages/approval').then((m) => ({ default: m.ApprovalListPage })));
const ApprovalDetailPage = lazy(() => import('../pages/approval').then((m) => ({ default: m.ApprovalDetailPage })));
const ApprovalRequestPage = lazy(() => import('../pages/approval').then((m) => ({ default: m.ApprovalRequestPage })));
const LoginPage = lazy(() => import('../pages/auth').then((m) => ({ default: m.LoginPage })));
const SettingsPage = lazy(() => import('../pages/settings').then((m) => ({ default: m.SettingsPage })));
function PageLoader() {
    return (_jsx("div", { className: "flex h-full items-center justify-center", children: _jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }) }));
}
function ProtectedLayout() {
    return (_jsx(AuthGuard, { children: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(AppLayout, { children: _jsx(Outlet, {}) }) }) }));
}
const router = createBrowserRouter([
    {
        path: '/login',
        element: (_jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(LoginPage, {}) })),
    },
    {
        element: _jsx(ProtectedLayout, {}),
        children: [
            { index: true, element: _jsx(DashboardPage, {}) },
            { path: 'community', element: _jsx(CommunityListPage, {}) },
            { path: 'community/write', element: _jsx(CommunityWritePage, {}) },
            { path: 'community/:id', element: _jsx(CommunityDetailPage, {}) },
            { path: 'leave', element: _jsx(LeaveManagementPage, {}) },
            { path: 'leave/request', element: _jsx(LeaveRequestPage, {}) },
            { path: 'leave/calendar', element: _jsx(LeaveCalendarPage, {}) },
            { path: 'notice', element: _jsx(NoticeListPage, {}) },
            { path: 'notice/:id', element: _jsx(NoticeDetailPage, {}) },
            { path: 'profile', element: _jsx(ProfilePage, {}) },
            { path: 'organization', element: _jsx(OrganizationPage, {}) },
            { path: 'attendance', element: _jsx(AttendancePage, {}) },
            { path: 'approval', element: _jsx(ApprovalListPage, {}) },
            { path: 'approval/request', element: _jsx(ApprovalRequestPage, {}) },
            { path: 'approval/:id', element: _jsx(ApprovalDetailPage, {}) },
            { path: 'settings', element: _jsx(SettingsPage, {}) },
            { path: 'kon', element: _jsx(KonDashboardPage, {}) },
        ],
    },
    { path: '*', element: _jsx(Navigate, { to: "/", replace: true }) },
]);
export function AppRouter() {
    return _jsx(RouterProvider, { router: router });
}
//# sourceMappingURL=router.js.map