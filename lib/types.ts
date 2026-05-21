// Types for CropCare AI application - Production Version

export type Severity = "None" | "Mild" | "Moderate" | "Severe" | "Critical"
export type Urgency = "Immediate" | "Within 3 days" | "Within a week" | "Monitor only"
export type RecoveryProbability = "High" | "Medium" | "Low"

export interface ChemicalTreatment {
  product: string
  dosage: string
  frequency: string
}

export interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
  condition: string
  diseaseRiskLevel: string
  icon: string
}

export interface Location {
  lat: number
  lon: number
}

export interface AnalysisResult {
  disease_detected: boolean
  disease_name: string
  scientific_name: string
  confidence: number
  severity: Severity
  severity_score: number
  affected_area_percentage: number
  symptoms_observed: string[]
  primary_cause: string
  contributing_factors: string[]
  organic_treatments: string[]
  chemical_treatments: ChemicalTreatment[]
  fertilizer_recommendation: string
  preventive_measures: string[]
  urgency: Urgency
  yield_impact: string
  recovery_probability: RecoveryProbability
  estimated_recovery_days: number
  icar_guidelines: string
  farmer_advice: string
}

export interface ScanResult {
  id: string
  cropType: string
  cropLabel: string
  imageBase64: string
  thumbnailBase64: string
  analysis: AnalysisResult
  weather: WeatherData | null
  location: Location | null
  timestamp: string
  processingTimeMs: number
}

export interface ScanHistoryItem {
  id: string
  timestamp: string
  crop: string
  disease: string
  severity: Severity
  confidence: number
  weather: WeatherData | null
  location: Location | null
  imageThumb: string
  fullResult: ScanResult
}

export interface AnalysisStep {
  id: number
  label: string
  status: "pending" | "active" | "complete" | "error"
}

export interface CropType {
  id: string
  label: string
  icon: string
  season: string
}

export const SUPPORTED_CROPS: CropType[] = [
  { id: "tomato", label: "Tomato", icon: "tomato", season: "Kharif/Rabi" },
  { id: "potato", label: "Potato", icon: "potato", season: "Rabi" },
  { id: "rice", label: "Rice", icon: "rice", season: "Kharif" },
  { id: "wheat", label: "Wheat", icon: "wheat", season: "Rabi" },
  { id: "maize", label: "Maize", icon: "corn", season: "Kharif" },
  { id: "cotton", label: "Cotton", icon: "cotton", season: "Kharif" },
  { id: "sugarcane", label: "Sugarcane", icon: "sugarcane", season: "Annual" },
  { id: "soybean", label: "Soybean", icon: "soybean", season: "Kharif" },
  { id: "pepper", label: "Pepper", icon: "pepper", season: "Annual" },
  { id: "grape", label: "Grape", icon: "grape", season: "Annual" },
]

export const ERROR_MESSAGES = {
  IMAGE_TOO_SMALL: "Please upload a clearer, closer photo of the leaf.",
  NOT_A_LEAF: "This doesn't appear to be a crop leaf. Please retry.",
  API_TIMEOUT: "Analysis is taking longer than usual. Please retry.",
  NO_INTERNET: "No internet connection. Please check your network.",
  INVALID_CROP: "Please select the crop type before scanning.",
  LOCATION_DENIED: "Location access denied. Weather data unavailable.",
  API_ERROR: "Analysis service temporarily unavailable. Retry in 30s.",
  IMAGE_TOO_LARGE: "Image too large. Maximum size is 10MB.",
  INVALID_IMAGE_TYPE: "Invalid image type. Please use JPG, PNG, or WebP.",
}

export const ANALYSIS_STEPS: Omit<AnalysisStep, "status">[] = [
  { id: 1, label: "Uploading image securely..." },
  { id: 2, label: "Preprocessing leaf image..." },
  { id: 3, label: "Running AI disease detection..." },
  { id: 4, label: "Fetching live weather data..." },
  { id: 5, label: "Generating treatment plan..." },
  { id: 6, label: "Preparing your report..." },
]
