"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { AnalysisStep } from "@/lib/types"
import { Loader2, CheckCircle2, XCircle, Circle } from "lucide-react"

interface AnalysisProgressProps {
  steps: AnalysisStep[]
  currentStep: number
}

export function AnalysisProgress({ steps, currentStep }: AnalysisProgressProps) {
  const completedSteps = steps.filter(s => s.status === "complete").length
  const progress = (completedSteps / steps.length) * 100

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span>Analyzing Your Plant</span>
          <span className="text-sm text-muted-foreground font-normal">
            {completedSteps}/{steps.length} steps
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />
        
        <div className="space-y-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                step.status === "active" && "bg-primary/10",
                step.status === "complete" && "opacity-70",
                step.status === "error" && "bg-destructive/10"
              )}
            >
              <div className="flex-shrink-0">
                {step.status === "pending" && (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                {step.status === "active" && (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                )}
                {step.status === "complete" && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {step.status === "error" && (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm",
                  step.status === "active" && "font-medium text-primary",
                  step.status === "error" && "text-destructive"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
