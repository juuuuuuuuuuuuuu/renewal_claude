import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Upload, X, FileIcon } from 'lucide-react';
import { Button } from '@hub/ui';
import { cn } from '@hub/ui';
function formatFileSize(bytes) {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
export function FileUploader({ value = [], onChange, accept, maxSize = 10 * 1024 * 1024, maxFiles = 5, }) {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const handleFiles = (files) => {
        const newFiles = Array.from(files)
            .filter((f) => f.size <= maxSize)
            .slice(0, maxFiles - value.length)
            .map((f) => ({ id: crypto.randomUUID(), name: f.name, size: f.size }));
        onChange?.([...value, ...newFiles]);
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: cn('rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors', isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'), onDragOver: (e) => { e.preventDefault(); setIsDragging(true); }, onDragLeave: () => setIsDragging(false), onDrop: (e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }, onClick: () => inputRef.current?.click(), children: [_jsx(Upload, { className: "mx-auto h-8 w-8 text-muted-foreground" }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "\uD30C\uC77C\uC744 \uB4DC\uB798\uADF8\uD558\uAC70\uB098 \uD074\uB9AD\uD558\uC5EC \uC5C5\uB85C\uB4DC" }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: ["\uCD5C\uB300 ", formatFileSize(maxSize)] })] }), _jsx("input", { ref: inputRef, type: "file", accept: accept, multiple: true, hidden: true, onChange: (e) => e.target.files && handleFiles(e.target.files) }), value.length > 0 && (_jsx("ul", { className: "space-y-1", children: value.map((file) => (_jsxs("li", { className: "flex items-center gap-2 rounded-md border p-2 text-sm", children: [_jsx(FileIcon, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "flex-1 truncate", children: file.name }), _jsx("span", { className: "text-muted-foreground", children: formatFileSize(file.size) }), _jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "h-6 w-6", onClick: () => onChange?.(value.filter((f) => f.id !== file.id)), children: _jsx(X, { className: "h-3 w-3" }) })] }, file.id))) }))] }));
}
//# sourceMappingURL=file-uploader.js.map