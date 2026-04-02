import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUIStore } from '@shared/model';
import { Sidebar } from '@widgets/sidebar';
import { Header } from '@widgets/header';
import { BottomNavigation } from '@widgets/bottom-nav';
export function AppLayout({ children }) {
    const { sidebarOpen, toggleSidebar } = useUIStore();
    return (_jsxs("div", { className: "flex h-screen overflow-hidden bg-background", children: [_jsx(Sidebar, { open: sidebarOpen, className: "hidden md:flex" }), _jsxs("div", { className: "flex flex-col flex-1 min-w-0 overflow-hidden", children: [_jsx(Header, { onMenuToggle: toggleSidebar }), _jsx("main", { className: "flex-1 overflow-y-auto p-4 pb-20 md:pb-4", children: children }), _jsx(BottomNavigation, { className: "flex md:hidden" })] })] }));
}
//# sourceMappingURL=app-layout.js.map