import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export interface UploadResult {
  url: string
  publicId: string
  format?: string
  bytes?: number
  resourceType?: string
  isFallback?: boolean
}

/**
 * Uploads a base64 string or file buffer to Cloudinary.
 * If Cloudinary credentials are not configured, falls back to a simulated secure URL
 * ensuring uninterrupted operation in development/demo mode.
 */
export async function uploadToCloudinary(
  fileData: string,
  folder: string = 'carbyn_documents'
): Promise<UploadResult> {
  const isConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )

  if (!isConfigured) {
    // Graceful fallback for local development & demonstration
    const mockId = `carbyn_doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    return {
      url: fileData.startsWith('data:') 
        ? fileData 
        : `https://res.cloudinary.com/demo/image/upload/sample.jpg`,
      publicId: mockId,
      format: 'pdf',
      bytes: 145200,
      resourceType: 'auto',
      isFallback: true,
    }
  }

  try {
    const result = await cloudinary.uploader.upload(fileData, {
      folder: `carbyn/${folder}`,
      resource_type: 'auto',
      tags: ['carbyn', 'uae_ghg_compliance', folder],
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
      resourceType: result.resource_type,
      isFallback: false,
    }
  } catch (error) {
    console.error('[Cloudinary Upload Error]', error)
    throw new Error('Failed to upload document to Cloudinary')
  }
}

export { cloudinary }
