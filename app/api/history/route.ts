import { NextRequest, NextResponse } from "next/server"
import { DISEASE_KNOWLEDGE_BASE } from "@/lib/knowledge-base"
import type { ScanHistoryItem } from "@/lib/types"

// GET /api/history - Get scan history
// In production, this would fetch from a database
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const crop = searchParams.get("crop")
    const severity = searchParams.get("severity")
    const dateRange = searchParams.get("dateRange")

    // Generate mock data (in production, query database)
    const allHistory = generateMockHistory(50)
    
    // Apply filters
    let filteredHistory = allHistory
    
    if (crop && crop !== "all") {
      filteredHistory = filteredHistory.filter(
        (item) => item.crop.toLowerCase() === crop.toLowerCase()
      )
    }
    
    if (severity && severity !== "all") {
      filteredHistory = filteredHistory.filter(
        (item) => item.severity.toLowerCase() === severity.toLowerCase()
      )
    }

    if (dateRange && dateRange !== "all") {
      const now = new Date()
      const filterDate = new Date()
      
      switch (dateRange) {
        case "today":
          filterDate.setHours(0, 0, 0, 0)
          break
        case "week":
          filterDate.setDate(now.getDate() - 7)
          break
        case "month":
          filterDate.setMonth(now.getMonth() - 1)
          break
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      filteredHistory = filteredHistory.filter(
        (item) => new Date(item.timestamp) >= filterDate
      )
    }

    // Paginate
    const startIndex = (page - 1) * limit
    const paginatedHistory = filteredHistory.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      success: true,
      data: {
        items: paginatedHistory,
        total: filteredHistory.length,
        page,
        limit,
        totalPages: Math.ceil(filteredHistory.length / limit),
      },
    })
  } catch (error) {
    console.error("History error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch history" },
      { status: 500 }
    )
  }
}

function generateMockHistory(count: number): ScanHistoryItem[] {
  const diseaseKeys = Object.keys(DISEASE_KNOWLEDGE_BASE)
  const history: ScanHistoryItem[] = []

  for (let i = 0; i < count; i++) {
    const randomKey = diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)]
    const diseaseInfo = DISEASE_KNOWLEDGE_BASE[randomKey]
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 60))
    date.setHours(
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60)
    )

    history.push({
      id: `scan_${1000 + i}`,
      disease_key: randomKey,
      disease_name: diseaseInfo.disease_name,
      crop: diseaseInfo.crop,
      confidence: 0.75 + Math.random() * 0.24,
      severity: diseaseInfo.severity,
      severity_score: diseaseInfo.severity_score,
      image_url: `/placeholder-plant.jpg`,
      timestamp: date.toISOString(),
      processing_time_ms: 800 + Math.floor(Math.random() * 1500),
    })
  }

  return history.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}
