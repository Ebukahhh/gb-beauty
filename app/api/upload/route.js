import { put, issueSignedToken, presignUrl } from '@vercel/blob'
import { NextResponse } from 'next/server'

const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf']
const LINK_LIFETIME_MS = 6 * 24 * 60 * 60 * 1000 // 6 days (max allowed is 7 — leaving margin for clock drift)

export async function POST(req) {
  const form = await req.formData()
  const file = form.get('file')

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File is larger than 10MB.' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Please upload an image or PDF file.' }, { status: 400 })
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const pathname = `receipts/${Date.now()}-${safeName}`

  try {
    // Receipts are sensitive (bank transfer proof), so the store is private —
    // the plain blob URL requires auth and isn't shareable on its own.
    await put(pathname, file, { access: 'private' })

    // Mint a signed, time-limited link so staff can open it straight from WhatsApp.
    const token = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil: Date.now() + LINK_LIFETIME_MS,
    })
    const { presignedUrl } = await presignUrl(token, {
      operation: 'get',
      pathname,
      access: 'private',
      validUntil: Date.now() + LINK_LIFETIME_MS,
    })

    return NextResponse.json({ url: presignedUrl })
  } catch (err) {
    console.error('Blob upload failed:', err)
    return NextResponse.json(
      { error: 'File upload storage is not configured yet. Please contact us directly to send your payment receipt.' },
      { status: 503 }
    )
  }
}
