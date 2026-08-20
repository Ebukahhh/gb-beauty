import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf']

export async function POST(req) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'File upload storage is not configured yet. Please contact us directly to send your payment receipt.' },
      { status: 503 }
    )
  }

  const form = await req.formData()
  const file = form.get('file')

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File is larger than 10MB.' }, { status: 400 })
  }
  if (ALLOWED_TYPES.length && !ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Please upload an image or PDF file.' }, { status: 400 })
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const blob = await put(`receipts/${Date.now()}-${safeName}`, file, {
    access: 'public',
    addRandomSuffix: true,
  })

  return NextResponse.json({ url: blob.url })
}
