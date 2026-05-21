"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Clock, Zap, Award } from "lucide-react"

const metrics = [
  {
    label: "Overall Accuracy",
    value: 94.2,
    target: 95,
    icon: Target,
    color: "bg-chart-1",
  },
  {
    label: "Precision",
    value: 92.8,
    target: 93,
    icon: Award,
    color: "bg-chart-2",
  },
  {
    label: "Recall",
    value: 91.5,
    target: 92,
    icon: Zap,
    color: "bg-chart-4",
  },
  {
    label: "F1 Score",
    value: 92.1,
    target: 93,
    icon: Target,
    color: "bg-chart-5",
  },
]

export function AccuracyMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Model Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className="text-sm font-bold">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Target: {metric.target}%
              </p>
            </div>
          )
        })}
        
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Average Inference Time</span>
          </div>
          <p className="text-2xl font-bold">1.24s</p>
          <p className="text-xs text-muted-foreground">
            Per image (including Grad-CAM generation)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
