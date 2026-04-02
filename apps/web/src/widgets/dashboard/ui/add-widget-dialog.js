import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from '@hub/ui';
import { useDashboardStore, widgetDefinitions } from '@features/dashboard-layout';
import { WidgetThumbnail } from '@entities/widget';
export function AddWidgetDialog() {
    const [open, setOpen] = useState(false);
    const addWidget = useDashboardStore((s) => s.addWidget);
    const handleSelect = (definitionId) => {
        addWidget(definitionId);
        setOpen(false);
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { size: "sm", className: "gap-1.5", children: [_jsx(Plus, { className: "w-4 h-4" }), "\uC704\uC82F \uCD94\uAC00"] }) }), _jsxs(DialogContent, { className: "max-w-lg", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "\uC704\uC82F \uCD94\uAC00" }) }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2", children: widgetDefinitions.map((def) => (_jsx(WidgetThumbnail, { definition: def, onClick: () => handleSelect(def.id) }, def.id))) })] })] }));
}
//# sourceMappingURL=add-widget-dialog.js.map