import { Upload, File as FileIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface UploadAreaProps {
  compact?: boolean;
  onChange?: (files: File[]) => void;
}

const UploadArea = ({ compact = false, onChange }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateFiles = (newFiles: File[]) => {
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const handleFiles = (incoming: File[]) => {
    const merged = [...files, ...incoming];
    updateFiles(merged);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    updateFiles(updated);
  };

  return (
    <div className="w-full">

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) =>
          handleFiles(Array.from(e.target.files || []))
        }
      />

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300
        flex flex-col items-center justify-center gap-3 cursor-pointer
        ${compact ? 'min-h-[160px]' : 'min-h-[280px]'}
        ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
      >
        {isDragging && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-10 animate-pulse" />
        )}

        <div
          className={`w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center
          ${isDragging ? 'scale-110 animate-float' : ''}`}
        >
          <Upload className="w-7 h-7 text-white" />
        </div>

        <div className="text-center px-4">
          <p className="font-medium">
            {isDragging ? 'Drop files here' : 'Drag & drop files'}
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse
          </p>
        </div>

        {/* Formats */}
        <div className="flex flex-wrap justify-center gap-2 text-xs mt-1">
          {['PDF', 'DOC', 'PNG', 'JPG'].map((f) => (
            <span
              key={f}
              className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2 max-h-40 overflow-auto pr-1">
          {files.map((file, index) => (
            <div
              key={index}
              className="glass-card px-3 py-2 flex items-center gap-3 text-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center">
                <FileIcon className="w-4 h-4 text-white" />
              </div>

              <span className="flex-1 truncate">
                {file.name}
              </span>

              <button
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
