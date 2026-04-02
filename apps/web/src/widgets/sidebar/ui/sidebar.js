import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, MessageSquare, CalendarDays, Bell, User, Building2, Clock, FileCheck, Settings, ChevronLeft, } from 'lucide-react';
import { Button, cn } from '@hub/ui';
import { ROUTES } from '@shared/config';
const MENU_ITEMS = [
    { labelKey: 'nav.home', path: ROUTES.HOME, icon: Home },
    { labelKey: 'nav.community', path: ROUTES.COMMUNITY.LIST, icon: MessageSquare },
    { labelKey: 'nav.leave', path: ROUTES.LEAVE.LIST, icon: CalendarDays },
    { labelKey: 'nav.notice', path: ROUTES.NOTICE.LIST, icon: Bell },
    { labelKey: 'nav.profile', path: ROUTES.PROFILE, icon: User },
    { labelKey: 'nav.organization', path: ROUTES.ORGANIZATION, icon: Building2 },
    { labelKey: 'nav.attendance', path: ROUTES.ATTENDANCE, icon: Clock },
    { labelKey: 'nav.approval', path: ROUTES.APPROVAL.LIST, icon: FileCheck },
    { labelKey: 'nav.settings', path: ROUTES.SETTINGS, icon: Settings },
];
export function Sidebar({ open, className, onClose }) {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    return (_jsxs("aside", { className: cn('flex-col border-r bg-background transition-all duration-200', open ? 'w-60' : 'w-16', className), children: [_jsxs("div", { className: "flex h-16 items-center justify-between px-3 border-b shrink-0", children: [open && _jsx("span", { className: "text-lg font-bold", children: "Hub" }), _jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, className: cn('ml-auto', !open && 'rotate-180'), "aria-label": open ? '사이드바 접기' : '사이드바 펼치기', children: _jsx(ChevronLeft, { className: "h-4 w-4" }) })] }), _jsx("nav", { className: "flex-1 overflow-y-auto py-2", children: _jsx("ul", { className: "space-y-1 px-2", children: MENU_ITEMS.map(({ labelKey, path, icon: Icon }) => {
                        const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
                        return (_jsx("li", { children: _jsxs("button", { onClick: () => navigate(path), className: cn('flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors', 'hover:bg-accent hover:text-accent-foreground', isActive && 'bg-accent text-accent-foreground', !open && 'justify-center px-2'), "aria-current": isActive ? 'page' : undefined, title: !open ? t(labelKey) : undefined, children: [_jsx(Icon, { className: "h-5 w-5 shrink-0" }), open && _jsx("span", { className: "truncate", children: t(labelKey) })] }) }, path));
                    }) }) })] }));
}
//# sourceMappingURL=sidebar.js.map