import { Upload, File } from 'lucide-react';
import { useState } from 'react';

const UploadArea = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).map((f) => f.name);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  return (
    <div className="w-full">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full min-h-[300px] rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
      >
        {/* Animated glow when dragging */}
        {isDragging && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-brand opacity-10 animate-pulse" />
        )}

        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center transition-transform duration-300 ${
            isDragging ? 'scale-110 animate-float' : ''
          }`}
        >
          <Upload className="w-10 h-10 text-white" />
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-foreground mb-1">
            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-sm text-muted-foreground">
            or click to browse from your device
          </p>
        </div>

        {/* Supported formats */}
        <div className="flex items-center gap-2 mt-2">
          <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            PDF
          </span>
          <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            DOC
          </span>
          <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            PNG
          </span>
          <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            JPG
          </span>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="glass-card p-4 flex items-center gap-4 animate-scale-in"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                <File className="w-5 h-5 text-white" />
              </div>
              <span className="flex-1 text-foreground font-medium truncate">
                {file}
              </span>
              <button
                onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
