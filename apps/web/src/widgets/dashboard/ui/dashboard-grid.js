import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { ResponsiveGridLayout, verticalCompactor } from 'react-grid-layout';
import { useDashboardStore } from '@features/dashboard-layout';
import { WidgetContainer } from './widget-container';
export function DashboardGrid() {
    const { widgets, layouts, updateLayouts, removeWidget } = useDashboardStore();
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(1200);
    useEffect(() => {
        const el = containerRef.current;
        if (!el)
            return;
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry)
                setContainerWidth(entry.contentRect.width);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    if (widgets.length === 0) {
        return (_jsxs("div", { ref: containerRef, className: "flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg text-muted-foreground", children: [_jsx("p", { className: "text-sm", children: "\uC704\uC82F\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }), _jsx("p", { className: "text-xs mt-1", children: "\uC704\uC82F \uCD94\uAC00 \uBC84\uD2BC\uC744 \uB20C\uB7EC \uB300\uC2DC\uBCF4\uB4DC\uB97C \uAD6C\uC131\uD574 \uBCF4\uC138\uC694." })] }));
    }
    return (_jsx("div", { ref: containerRef, className: "w-full", children: _jsx(ResponsiveGridLayout, { width: containerWidth, layouts: layouts, breakpoints: { lg: 1200, md: 768, sm: 480 }, cols: { lg: 12, md: 8, sm: 4 }, rowHeight: 80, dragConfig: { enabled: true, handle: '.widget-drag-handle' }, resizeConfig: { handles: ['se'] }, compactor: verticalCompactor, onLayoutChange: (_layout, allLayouts) => {
                updateLayouts(allLayouts);
            }, children: widgets.map((widget) => (_jsx("div", { children: _jsx(WidgetContainer, { widget: widget, onRemove: () => removeWidget(widget.instanceId) }) }, widget.instanceId))) }) }));
}
//# sourceMappingURL=dashboard-grid.js.map