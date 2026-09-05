import { NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { file, folder = 'invoices' } = body

    if (!file) {
      return NextResponse.json({ error: 'No file data provided' }, { status: 400 })
    }

    const uploadResult = await uploadToCloudinary(file, folder)

    return NextResponse.json({
      success: true,
      data: uploadResult,
      message: uploadResult.isFallback
        ? 'Uploaded in demo sandbox mode (Configure CLOUDINARY_* env variables for production)'
        : 'Uploaded successfully to Cloudinary',
    })
  } catch (error) {
    console.error('[Upload API Route Error]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal upload failed' },
      { status: 500 }
    )
  }
}
