import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { Button } from '@hub/ui';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info);
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback)
                return this.props.fallback;
            return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx("h2", { className: "text-xl font-semibold", children: "\uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4" }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: this.state.error?.message }), _jsx(Button, { className: "mt-4", variant: "outline", onClick: () => this.setState({ hasError: false, error: null }), children: "\uB2E4\uC2DC \uC2DC\uB3C4" })] }));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=error-boundary.js.map