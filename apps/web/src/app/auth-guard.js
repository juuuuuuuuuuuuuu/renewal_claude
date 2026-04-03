import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Skeleton } from '@hub/ui';
import { useAuthStore } from '@shared/model';
export function AuthGuard({ children }) {
    // const { isAuthenticated } = useAuthStore();
    // const navigate = useNavigate();
    // const location = useLocation();
    // useEffect(() => {
    //     if (!isAuthenticated && location.pathname !== '/login') {
    //         navigate('/login', { state: { from: location.pathname }, replace: true });
    //     }
    // }, [isAuthenticated, location.pathname, navigate]);
    // if (!isAuthenticated && location.pathname !== '/login') {
    //     return (_jsxs("div", { className: "flex h-screen flex-col gap-4 p-4", children: [_jsx(Skeleton, { className: "h-16 w-full" }), _jsxs("div", { className: "flex flex-1 gap-4", children: [_jsx(Skeleton, { className: "h-full w-64" }), _jsx(Skeleton, { className: "h-full flex-1" })] })] }));
    // }
    return _jsx(_Fragment, { children: children });
}
//# sourceMappingURL=auth-guard.js.map