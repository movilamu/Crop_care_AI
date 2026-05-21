import { NextResponse } from "next/server"
import { DISEASE_KNOWLEDGE_BASE, SUPPORTED_CROPS } from "@/lib/knowledge-base"

// GET /api/analytics - Get analytics data
// In production, this would aggregate data from the database
export async function GET() {
  try {
    // Generate mock analytics data
    const totalScans = 2847
    const diseasesDetected = 892
    const healthyPlants = totalScans - diseasesDetected

    // Scans by date (last 30 days)
    const scansByDate = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toISOString().split("T")[0],
        count: Math.floor(50 + Math.random() * 100),
      }
    })

    // Top diseases
    const diseaseKeys = Object.keys(DISEASE_KNOWLEDGE_BASE).filter(
      (key) => !key.includes("healthy")
    )
    const topDiseases = diseaseKeys
      .slice(0, 8)
      .map((key) => ({
        name: DISEASE_KNOWLEDGE_BASE[key].disease_name,
        count: Math.floor(50 + Math.random() * 150),
        crop: DISEASE_KNOWLEDGE_BASE[key].crop,
      }))
      .sort((a, b) => b.count - a.count)

    // Scans by crop
    const scansByCrop = SUPPORTED_CROPS.map((crop) => ({
      crop,
      count: Math.floor(100 + Math.random() * 400),
    })).sort((a, b) => b.count - a.count)

    // Severity distribution
    const severityDistribution = [
      { severity: "Healthy", count: healthyPlants },
      { severity: "Medium", count: Math.floor(diseasesDetected * 0.4) },
      { severity: "High", count: Math.floor(diseasesDetected * 0.35) },
      { severity: "Critical", count: Math.floor(diseasesDetected * 0.25) },
    ]

    const analyticsData = {
      total_scans: totalScans,
      diseases_detected: diseasesDetected,
      healthy_plants: healthyPlants,
      accuracy_rate: 94.2,
      scans_by_date: scansByDate,
      top_diseases: topDiseases,
      scans_by_crop: scansByCrop,
      severity_distribution: severityDistribution,
    }

    return NextResponse.json({
      success: true,
      data: analyticsData,
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
