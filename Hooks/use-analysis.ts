"use client"

import { useState, useCallback } from "react"
import type { 
  ScanResult, 
  AnalysisResult, 
  WeatherData, 
  Location, 
  AnalysisStep, 
  ANALYSIS_STEPS 
} from "@/lib/types"

interface UseAnalysisReturn {
  analyze: (image: File, cropType: string, cropLabel: string) => Promise<void>
  isLoading: boolean
  result: ScanResult | null
  error: string | null
  steps: AnalysisStep[]
  currentStep: number
  reset: () => void
}

const INITIAL_STEPS: AnalysisStep[] = [
  { id: 1, label: "Uploading image securely...", status: "pending" },
  { id: 2, label: "Preprocessing leaf image...", status: "pending" },
  { id: 3, label: "Running AI disease detection...", status: "pending" },
  { id: 4, label: "Fetching live weather data...", status: "pending" },
  { id: 5, label: "Generating treatment plan...", status: "pending" },
  { id: 6, label: "Preparing your report...", status: "pending" },
]

// Process image to base64 with resizing
async function processImage(file: File): Promise<{ base64: string; thumbnail: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // Resize to 512x512 for API
      canvas.width = 512
      canvas.height = 512
      ctx?.drawImage(img, 0, 0, 512, 512)
      const base64 = canvas.toDataURL("image/jpeg", 0.85).split(",")[1]
      
      // Create thumbnail (128x128)
      canvas.width = 128
      canvas.height = 128
      ctx?.drawImage(img, 0, 0, 128, 128)
      const thumbnail = canvas.toDataURL("image/jpeg", 0.7).split(",")[1]
      
      resolve({ base64, thumbnail, mediaType: "image/jpeg" })
    }

    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = URL.createObjectURL(file)
  })
}

// Get user's geolocation
async function getLocation(): Promise<Location | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
      },
      () => resolve(null),
      { timeout: 10000, maximumAge: 300000 }
    )
  })
}

// Fetch weather data
async function fetchWeather(location: Location): Promise<WeatherData | null> {
  try {
    const response = await fetch(`/api/weather?lat=${location.lat}&lon=${location.lon}`)
    if (!response.ok) return null
    const data = await response.json()
    return data.success ? data.data : null
  } catch {
    return null
  }
}

export function useAnalysis(): UseAnalysisReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [steps, setSteps] = useState<AnalysisStep[]>(INITIAL_STEPS)
  const [currentStep, setCurrentStep] = useState(0)

  const updateStep = useCallback((stepId: number, status: AnalysisStep["status"]) => {
    setSteps(prev => prev.map(s => 
      s.id === stepId ? { ...s, status } : s
    ))
    if (status === "active") {
      setCurrentStep(stepId)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setSteps(INITIAL_STEPS)
    setCurrentStep(0)
  }, [])

  const analyze = useCallback(async (image: File, cropType: string, cropLabel: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    setSteps(INITIAL_STEPS)
    setCurrentStep(0)

    const startTime = performance.now()

    try {
      // Validate image
      const validTypes = ["image/jpeg", "image/png", "image/webp"]
      if (!validTypes.includes(image.type)) {
        throw new Error("Invalid image type. Please use JPG, PNG, or WebP.")
      }

      if (image.size > 10 * 1024 * 1024) {
        throw new Error("Image too large. Maximum size is 10MB.")
      }

      if (image.size < 5 * 1024) {
        throw new Error("Image may be too small or blurry. Please upload a clearer photo.")
      }

      // Step 1: Upload
      updateStep(1, "active")
      await new Promise(r => setTimeout(r, 300))
      updateStep(1, "complete")

      // Step 2: Preprocess
      updateStep(2, "active")
      const { base64, thumbnail, mediaType } = await processImage(image)
      updateStep(2, "complete")

      // Step 3: AI Analysis
      updateStep(3, "active")
      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          cropType: cropType,
          mediaType,
        }),
      })

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json()
        throw new Error(errorData.error || "Analysis failed")
      }

      const analyzeData = await analyzeResponse.json()
      if (!analyzeData.success) {
        throw new Error(analyzeData.error || "Analysis failed")
      }

      const analysis: AnalysisResult = analyzeData.data.analysis
      updateStep(3, "complete")

      // Step 4: Weather
      updateStep(4, "active")
      let weather: WeatherData | null = null
      let location: Location | null = null
      
      try {
        location = await getLocation()
        if (location) {
          weather = await fetchWeather(location)
        }
      } catch {
        // Weather is optional, continue without it
      }
      updateStep(4, "complete")

      // Step 5: Treatment plan (included in AI response)
      updateStep(5, "active")
      await new Promise(r => setTimeout(r, 200))
      updateStep(5, "complete")

      // Step 6: Prepare report
      updateStep(6, "active")
      const endTime = performance.now()

      const scanResult: ScanResult = {
        id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cropType,
        cropLabel,
        imageBase64: base64,
        thumbnailBase64: thumbnail,
        analysis,
        weather,
        location,
        timestamp: new Date().toISOString(),
        processingTimeMs: Math.round(endTime - startTime),
      }

      updateStep(6, "complete")
      setResult(scanResult)

      // Save to localStorage
      saveScanToHistory(scanResult)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      
      // Mark current step as error
      setSteps(prev => prev.map(s => 
        s.status === "active" ? { ...s, status: "error" } : s
      ))
    } finally {
      setIsLoading(false)
    }
  }, [updateStep])

  return {
    analyze,
    isLoading,
    result,
    error,
    steps,
    currentStep,
    reset,
  }
}

// Save scan to localStorage history
function saveScanToHistory(scanResult: ScanResult) {
  try {
    const historyKey = "cropcare_history"
    const existingHistory = localStorage.getItem(historyKey)
    const history = existingHistory ? JSON.parse(existingHistory) : []

    const historyItem = {
      id: scanResult.id,
      timestamp: scanResult.timestamp,
      crop: scanResult.cropLabel,
      disease: scanResult.analysis.disease_name,
      severity: scanResult.analysis.severity,
      confidence: scanResult.analysis.confidence,
      weather: scanResult.weather,
      location: scanResult.location,
      imageThumb: scanResult.thumbnailBase64,
      fullResult: scanResult,
    }

    history.unshift(historyItem)

    // Keep last 50 scans
    const trimmedHistory = history.slice(0, 50)
    localStorage.setItem(historyKey, JSON.stringify(trimmedHistory))
  } catch (err) {
    console.error("Failed to save scan to history:", err)
  }
}

// Get scan history from localStorage
export function getScanHistory() {
  try {
    const historyKey = "cropcare_history"
    const existingHistory = localStorage.getItem(historyKey)
    return existingHistory ? JSON.parse(existingHistory) : []
  } catch {
    return []
  }
}

// Delete scan from history
export function deleteScanFromHistory(id: string) {
  try {
    const historyKey = "cropcare_history"
    const existingHistory = localStorage.getItem(historyKey)
    if (!existingHistory) return

    const history = JSON.parse(existingHistory)
    const filtered = history.filter((item: { id: string }) => item.id !== id)
    localStorage.setItem(historyKey, JSON.stringify(filtered))
  } catch (err) {
    console.error("Failed to delete scan from history:", err)
  }
}

// Clear all history
export function clearScanHistory() {
  try {
    localStorage.removeItem("cropcare_history")
  } catch (err) {
    console.error("Failed to clear history:", err)
  }
}
