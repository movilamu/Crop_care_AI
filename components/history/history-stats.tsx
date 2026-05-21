"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScanLine, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { getScanHistory } from "@/hooks/use-analysis"
import type { ScanHistoryItem } from "@/lib/types"

export function HistoryStats() {
  const [history, setHistory] = useState<ScanHistoryItem[]>([])

  useEffect(() => {
    setHistory(getScanHistory())
  }, [])

  const stats = useMemo(() => {
    const totalScans = history.length
    const diseasesDetected = history.filter(
      scan => scan.disease !== "Healthy" && scan.severity !== "None"
    ).length
    const healthyPlants = totalScans - diseasesDetected

    // Calculate average processing time
    const avgResponseTime = totalScans > 0
      ? history.reduce((acc, scan) => acc + (scan.fullResult?.processingTimeMs || 0), 0) / totalScans / 1000
      : 0

    // Calculate weekly scans
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const weeklyScans = history.filter(
      scan => new Date(scan.timestamp) > oneWeekAgo
    ).length

    return [
      {
        label: "Total Scans",
        value: totalScans.toString(),
        icon: ScanLine,
        change: `+${weeklyScans} this week`,
        changeType: "neutral" as const,
      },
      {
        label: "Diseases Detected",
        value: diseasesDetected.toString(),
        icon: AlertTriangle,
        change: totalScans > 0 
          ? `${Math.round((diseasesDetected / totalScans) * 100)}% of scans`
          : "0% of scans",
        changeType: "warning" as const,
      },
      {
        label: "Healthy Plants",
        value: healthyPlants.toString(),
        icon: CheckCircle,
        change: totalScans > 0 
          ? `${Math.round((healthyPlants / totalScans) * 100)}% of scans`
          : "0% of scans",
        changeType: "success" as const,
      },
      {
        label: "Avg Response Time",
        value: `${avgResponseTime.toFixed(1)}s`,
        icon: Clock,
        change: "AI analysis time",
        changeType: "success" as const,
      },
    ]
  }, [history])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
              <p className={`text-xs mt-2 ${
                stat.changeType === "success" ? "text-green-600" :
                stat.changeType === "warning" ? "text-orange-600" :
                "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
