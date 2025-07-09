import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  onUpload: (urls: string[]) => void;
  label?: string;
  disabled?: boolean;
  multiple?: boolean;
}

export function ImageUpload({ onUpload, label = 'Upload Image', disabled, multiple = false }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (validFiles.length === 0) {
      setError('Only image files are allowed.');
      return;
    }
    setError(null);
    setUploading(true);
    setProgress(0);
    const uploadedUrls: string[] = [];
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      try {
        const reader = new FileReader();
        const filePromise = new Promise<string>((resolve, reject) => {
          reader.onload = async (event) => {
            const result = event.target?.result;
            if (!result || typeof result !== 'string') {
              reject('Failed to read file.');
              return;
            }
            const base64 = result.replace(/^data:[^,]+,/, '');
            setProgress(Math.round(((i + 0.5) / validFiles.length) * 100));
            const res = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                filename: file.name,
                filetype: file.type,
                base64,
              }),
            });
            if (res.ok) {
              const { url } = await res.json();
              resolve(url);
            } else {
              const { error: apiError } = await res.json();
              reject(apiError || 'Upload failed.');
            }
          };
          reader.onerror = () => reject('Failed to read file.');
        });
        reader.readAsDataURL(file);
        const url = await filePromise;
        uploadedUrls.push(url);
      } catch (err: any) {
        setError(typeof err === 'string' ? err : 'Upload failed.');
      }
      setProgress(Math.round(((i + 1) / validFiles.length) * 100));
    }
    setUploading(false);
    if (uploadedUrls.length > 0) {
      setImageUrls(prev => multiple ? [...prev, ...uploadedUrls] : uploadedUrls);
      onUpload(multiple ? [...imageUrls, ...uploadedUrls] : uploadedUrls);
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="block"
        multiple={multiple}
      />
      {uploading && (
        <div className="text-sm text-muted-foreground">Uploading... {progress}%</div>
      )}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {imageUrls.length > 0 && (
        <div className="mt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageUrls.map((url, idx) => (
              <div key={url + idx} className="flex flex-col items-center border rounded p-2 bg-muted">
                <img src={url} alt={`Uploaded preview ${idx + 1}`} className="rounded-md object-cover max-w-[120px] max-h-[80px] border mb-2" />
                <button
                  type="button"
                  className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/80"
                  onClick={() => handleCopy(url)}
                >
                  {copiedUrl === url ? 'Copied!' : 'Copy URL'}
                </button>
                <div className="text-[10px] mt-1 break-all text-muted-foreground">{url}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 