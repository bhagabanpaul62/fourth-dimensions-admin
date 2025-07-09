// Admin-only: Standalone image upload page
'use client';
import { useState } from 'react';
import { ImageUpload } from '@/components/image-upload';

export default function UploadsPage() {
  const [urls, setUrls] = useState<string[]>([]);
  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Image Upload (Admin Only)</h1>
      <ImageUpload multiple onUpload={setUrls} />
      {/* Gallery and copy buttons are handled inside ImageUpload */}
    </div>
  );
} 