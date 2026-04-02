interface UploadedFile {
    id: string;
    name: string;
    size: number;
    url?: string;
}
interface FileUploaderProps {
    value?: UploadedFile[];
    onChange?: (files: UploadedFile[]) => void;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
}
export declare function FileUploader({ value, onChange, accept, maxSize, maxFiles, }: FileUploaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=file-uploader.d.ts.map