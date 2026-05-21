"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, ScanLine, AlertTriangle, CheckCircle, Target } from "lucide-react"

const metrics = [
  {
    title: "Total Scans",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: ScanLine,
    description: "vs last month",
  },
  {
    title: "Diseases Detected",
    value: "892",
    change: "+8.2%",
    trend: "up" as const,
    icon: AlertTriangle,
    description: "vs last month",
  },
  {
    title: "Healthy Plants",
    value: "1,955",
    change: "+15.3%",
    trend: "up" as const,
    icon: CheckCircle,
    description: "vs last month",
  },
  {
    title: "Model Accuracy",
    value: "94.2%",
    change: "+1.8%",
    trend: "up" as const,
    icon: Target,
    description: "vs last month",
  },
]

export function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
        
        return (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendIcon className="h-4 w-4" />
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
