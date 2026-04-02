import { useRef, useState } from 'react'

import { Upload, X, FileIcon } from 'lucide-react'

import { Button } from '@hub/ui'
import { cn } from '@hub/ui'

interface UploadedFile {
  id: string
  name: string
  size: number
  url?: string
}

interface FileUploaderProps {
  value?: UploadedFile[]
  onChange?: (files: UploadedFile[]) => void
  accept?: string
  maxSize?: number
  maxFiles?: number
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUploader({
  value = [],
  onChange,
  accept,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files)
      .filter((f) => f.size <= maxSize)
      .slice(0, maxFiles - value.length)
      .map((f) => ({ id: crypto.randomUUID(), name: f.name, size: f.size }))
    onChange?.([...value, ...newFiles])
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          'rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          파일을 드래그하거나 클릭하여 업로드
        </p>
        <p className="text-xs text-muted-foreground mt-1">최대 {formatFileSize(maxSize)}</p>
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple hidden onChange={(e) => e.target.files && handleFiles(e.target.files)} />
      {value.length > 0 && (
        <ul className="space-y-1">
          {value.map((file) => (
            <li key={file.id} className="flex items-center gap-2 rounded-md border p-2 text-sm">
              <FileIcon className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 truncate">{file.name}</span>
              <span className="text-muted-foreground">{formatFileSize(file.size)}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onChange?.(value.filter((f) => f.id !== file.id))}
              >
                <X className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
