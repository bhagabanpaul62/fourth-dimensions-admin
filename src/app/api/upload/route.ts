import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(req: NextRequest) {
  // Try to handle multipart form data (App Router limitation workaround)
  const contentType = req.headers.get('content-type') || '';

  if (contentType.startsWith('multipart/form-data')) {
    // Not natively supported in App Router yet, so fallback to base64 for now
    return NextResponse.json({
      error: 'Direct multipart/form-data uploads are not fully supported in the App Router yet. Please use base64 JSON uploads.'
    }, { status: 400 });
  }

  // Fallback: Accept base64-encoded image in JSON body
  try {
    const body = await req.json();
    const { filename, filetype, base64 } = body;
    if (!filename || !filetype || !base64) {
      return NextResponse.json({ error: 'Missing filename, filetype, or base64 data.' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(filetype)) {
      return NextResponse.json({ error: 'File type not allowed.' }, { status: 400 });
    }
    const buffer = Buffer.from(base64, 'base64');
    if (buffer.length > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large.' }, { status: 400 });
    }
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = path.join(UPLOAD_DIR, safeName);
    await fs.writeFile(filePath, buffer);
    const url = `/uploads/${safeName}`;
    return NextResponse.json({ url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 