import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@hub/ui';
import { ROUTES } from '@shared/config';
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}
export function GlobalSearch() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const navigate = useNavigate();
    const ref = useRef(null);
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSearch = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            navigate(`${ROUTES.COMMUNITY.LIST}?keyword=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };
    return (_jsx("div", { ref: ref, className: "relative", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { className: "pl-9 w-64", placeholder: "\uAC80\uC0C9...", value: query, onChange: (e) => { setQuery(e.target.value); setIsOpen(true); }, onKeyDown: handleSearch })] }) }));
}
//# sourceMappingURL=global-search.js.map