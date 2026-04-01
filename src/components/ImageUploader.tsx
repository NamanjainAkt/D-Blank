'use client';

import { useState, useRef } from 'react';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  type?: 'image' | 'pdf';
  label?: string;
  accept?: string;
}

export function ImageUploader({
  value,
  onChange,
  type = 'image',
  label = 'Upload Image',
  accept,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      onChange(data.url);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const defaultAccept = type === 'pdf' 
    ? '.pdf' 
    : 'image/png,image/jpeg,image/webp,image/gif';

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept || defaultAccept}
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative">
          {type === 'image' ? (
            <div className="relative h-40 bg-charcoal border border-carbon rounded-lg overflow-hidden">
              <img
                src={value}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="p-4 bg-charcoal border border-carbon rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                  📄
                </div>
                <div>
                  <div className="text-sm text-white">PDF Uploaded</div>
                  <div className="text-xs text-gray-500">Click to replace</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-ghost text-xs"
              >
                Change
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${dragOver 
              ? 'border-blue-500 bg-blue-500/5' 
              : 'border-carbon hover:border-white/30'
            }
            ${uploading ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span className="text-sm text-gray-500">Uploading...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 mx-auto mb-4 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                {type === 'pdf' ? '📄' : '📷'}
              </div>
              <div className="text-sm text-gray-400 mb-1">
                {label}
              </div>
              <div className="text-xs text-gray-600">
                {type === 'pdf' ? 'PDF up to 10MB' : 'PNG, JPG, WebP up to 5MB'}
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
    </div>
  );
}
