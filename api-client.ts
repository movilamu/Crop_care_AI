// API client for CropCare AI backend
// Configure these environment variables to connect to your ML model

import type { PredictionResult, ScanHistoryItem, AnalyticsData } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Predict disease from image
export async function predictDisease(
  image: File,
  includeGradcam = true
): Promise<ApiResponse<PredictionResult>> {
  const formData = new FormData()
  formData.append("image", image)
  formData.append("include_gradcam", String(includeGradcam))

  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: "POST",
    body: formData,
  })

  return response.json()
}

// Get scan history
export async function getHistory(params?: {
  page?: number
  limit?: number
  crop?: string
  severity?: string
  dateRange?: string
}): Promise<ApiResponse<PaginatedResponse<ScanHistoryItem>>> {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.set("page", String(params.page))
  if (params?.limit) searchParams.set("limit", String(params.limit))
  if (params?.crop) searchParams.set("crop", params.crop)
  if (params?.severity) searchParams.set("severity", params.severity)
  if (params?.dateRange) searchParams.set("dateRange", params.dateRange)

  const response = await fetch(
    `${API_BASE_URL}/api/history?${searchParams.toString()}`
  )

  return response.json()
}

// Get analytics data
export async function getAnalytics(): Promise<ApiResponse<AnalyticsData>> {
  const response = await fetch(`${API_BASE_URL}/api/analytics`)
  return response.json()
}

// Health check
export async function healthCheck(): Promise<{
  status: string
  timestamp: string
  version: string
  services: Record<string, string>
}> {
  const response = await fetch(`${API_BASE_URL}/api/health`)
  return response.json()
}
