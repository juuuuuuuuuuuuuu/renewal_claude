import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@hub/ui';
import { getWidgetDefinition } from '@features/dashboard-layout';
export function WidgetContainer({ widget, onRemove }) {
    const definition = getWidgetDefinition(widget.definitionId);
    if (!definition)
        return null;
    const Component = definition.component;
    return (_jsxs(Card, { className: "h-full flex flex-col overflow-hidden", children: [_jsxs(CardHeader, { className: "widget-drag-handle flex-row items-center justify-between py-2 px-3 cursor-grab active:cursor-grabbing select-none shrink-0", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: definition.name }), _jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            onRemove();
                        }, className: "p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors", "aria-label": "\uC704\uC82F \uC0AD\uC81C", children: _jsx(X, { className: "w-3.5 h-3.5" }) })] }), _jsx(CardContent, { className: "flex-1 p-2 pb-4 min-h-0", children: _jsx(Component, {}) })] }));
}
//# sourceMappingURL=widget-container.js.map