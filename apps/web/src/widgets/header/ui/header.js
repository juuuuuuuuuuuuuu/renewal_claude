import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@hub/ui';
import { useAuthStore } from '@shared/model';
import { GlobalSearch } from '@features/search';
export function Header({ onMenuToggle }) {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    return (_jsxs("header", { className: "flex h-16 items-center gap-4 border-b bg-background px-4 shrink-0", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", onClick: onMenuToggle, "aria-label": "\uBA54\uB274 \uC5F4\uAE30", children: _jsx(Menu, { className: "h-5 w-5" }) }), _jsx("span", { className: "text-lg font-bold cursor-pointer select-none", onClick: () => navigate('/'), children: "Hub" }), _jsx("div", { className: "flex-1" }), _jsx("div", { className: "hidden sm:block", children: _jsx(GlobalSearch, {}) }), _jsx(Button, { variant: "ghost", size: "icon", "aria-label": "\uC54C\uB9BC", children: _jsx(Bell, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", onClick: () => navigate('/profile'), "aria-label": "\uD504\uB85C\uD544", children: _jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: user?.profileImage, alt: user?.name }), _jsx(AvatarFallback, { className: "text-xs", children: user?.name?.slice(0, 2) ?? 'U' })] }) })] }));
}
//# sourceMappingURL=header.js.map