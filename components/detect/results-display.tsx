"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { 
  AlertCircle, 
  CheckCircle, 
  Leaf, 
  Beaker, 
  Shield, 
  Download,
  ExternalLink,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  AlertTriangle,
  Clock,
  TrendingDown,
  Heart,
  Share2,
  Copy,
  Check,
  Plus,
  MessageCircle
} from "lucide-react"
import type { ScanResult, Severity } from "@/lib/types"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface ResultsDisplayProps {
  result: ScanResult | null
  isLoading: boolean
  imagePreview: string | null
  onNewScan: () => void
}

function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case "None":
      return "bg-green-500/10 text-green-700 border-green-500/20"
    case "Mild":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
    case "Moderate":
      return "bg-orange-500/10 text-orange-700 border-orange-500/20"
    case "Severe":
      return "bg-red-500/10 text-red-700 border-red-500/20"
    case "Critical":
      return "bg-red-700/10 text-red-800 border-red-700/20 animate-pulse"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getUrgencyColor(urgency: string): string {
  if (urgency.includes("Immediate")) return "text-red-600"
  if (urgency.includes("3 days")) return "text-orange-600"
  if (urgency.includes("week")) return "text-yellow-600"
  return "text-green-600"
}

export function ResultsDisplay({ result, isLoading, imagePreview, onNewScan }: ResultsDisplayProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const [checkedPrevention, setCheckedPrevention] = useState<number[]>([])

  const handleCopyToClipboard = useCallback(async () => {
    if (!result) return
    
    const summary = `CropCare AI Analysis Report
Crop: ${result.cropLabel}
Disease: ${result.analysis.disease_name}
Severity: ${result.analysis.severity}
Confidence: ${result.analysis.confidence}%
Urgency: ${result.analysis.urgency}

Farmer Advice: ${result.analysis.farmer_advice}

Organic Treatments:
${result.analysis.organic_treatments.map((t, i) => `${i + 1}. ${t}`).join("\n")}
`
    
    await navigator.clipboard.writeText(summary)
    setCopiedToClipboard(true)
    setTimeout(() => setCopiedToClipboard(false), 2000)
  }, [result])

  const handleWhatsAppShare = useCallback(() => {
    if (!result) return
    
    const message = encodeURIComponent(
      `CropCare AI Report\n\nCrop: ${result.cropLabel}\nDisease: ${result.analysis.disease_name}\nSeverity: ${result.analysis.severity}\n\nAdvice: ${result.analysis.farmer_advice}`
    )
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }, [result])

  const handleDownloadPDF = useCallback(() => {
    if (!result) return
    
    // Create a simple text-based report for download
    const report = `
CROPCARE AI - DISEASE ANALYSIS REPORT
=====================================
Date: ${new Date(result.timestamp).toLocaleString()}
Processing Time: ${result.processingTimeMs}ms

CROP INFORMATION
----------------
Crop Type: ${result.cropLabel}
${result.location ? `Location: ${result.location.lat.toFixed(4)}, ${result.location.lon.toFixed(4)}` : ""}

DIAGNOSIS
---------
Disease Detected: ${result.analysis.disease_detected ? "Yes" : "No"}
Disease Name: ${result.analysis.disease_name}
Scientific Name: ${result.analysis.scientific_name}
Confidence: ${result.analysis.confidence}%
Severity: ${result.analysis.severity} (${result.analysis.severity_score}/10)
Affected Area: ${result.analysis.affected_area_percentage}%

SYMPTOMS OBSERVED
-----------------
${result.analysis.symptoms_observed.map((s, i) => `${i + 1}. ${s}`).join("\n")}

PRIMARY CAUSE
-------------
${result.analysis.primary_cause}

Contributing Factors:
${result.analysis.contributing_factors.map((f, i) => `- ${f}`).join("\n")}

${result.weather ? `
WEATHER CONDITIONS
------------------
Temperature: ${result.weather.temperature}°C
Humidity: ${result.weather.humidity}%
Rainfall: ${result.weather.rainfall}mm
Wind Speed: ${result.weather.windSpeed} m/s
Condition: ${result.weather.condition}
Disease Risk: ${result.weather.diseaseRiskLevel}
` : ""}

TREATMENT RECOMMENDATIONS
-------------------------
ORGANIC TREATMENTS:
${result.analysis.organic_treatments.map((t, i) => `${i + 1}. ${t}`).join("\n")}

CHEMICAL TREATMENTS:
${result.analysis.chemical_treatments.map((t, i) => `${i + 1}. ${t.product} - ${t.dosage} (${t.frequency})`).join("\n")}

FERTILIZER RECOMMENDATION:
${result.analysis.fertilizer_recommendation}

PREVENTIVE MEASURES
-------------------
${result.analysis.preventive_measures.map((m, i) => `${i + 1}. ${m}`).join("\n")}

PROGNOSIS
---------
Urgency: ${result.analysis.urgency}
Recovery Probability: ${result.analysis.recovery_probability}
Estimated Recovery: ${result.analysis.estimated_recovery_days} days
Yield Impact if Untreated: ${result.analysis.yield_impact}

FARMER ADVICE
-------------
${result.analysis.farmer_advice}

ICAR GUIDELINES
---------------
${result.analysis.icar_guidelines}

---
Generated by CropCare AI
https://icar.org.in
`
    
    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cropcare-report-${result.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [result])

  const togglePreventionCheck = useCallback((index: number) => {
    setCheckedPrevention(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }, [])

  if (!imagePreview && !isLoading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Leaf className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Select a crop and upload an image to see analysis results
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Analyzing...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
          </div>
          <Skeleton className="h-32 rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground">
              Click &quot;Analyze Plant&quot; to start detection
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { analysis, weather } = result
  const isHealthy = !analysis.disease_detected || analysis.disease_name === "Healthy"

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isHealthy ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-orange-500" />
          )}
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Diagnosis Header */}
        <div className="rounded-xl border bg-muted/30 p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h3 className="text-xl font-semibold">{analysis.disease_name}</h3>
                  <Badge className={cn("border", getSeverityColor(analysis.severity))}>
                    {analysis.severity}
                  </Badge>
                </div>
                {analysis.scientific_name && analysis.scientific_name !== "N/A" && (
                  <p className="text-sm text-muted-foreground italic mb-2">
                    {analysis.scientific_name}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Crop: <span className="font-medium text-foreground">{result.cropLabel}</span>
                </p>
              </div>
            </div>

            {/* Confidence and Affected Area */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                <div className="flex items-center gap-2">
                  <Progress value={analysis.confidence} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{analysis.confidence}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Affected Area</p>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={analysis.affected_area_percentage} 
                    className="h-2 flex-1"
                  />
                  <span className="text-sm font-medium">{analysis.affected_area_percentage}%</span>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            {analysis.symptoms_observed.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Symptoms Observed</p>
                <div className="flex flex-wrap gap-1">
                  {analysis.symptoms_observed.map((symptom, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Weather Risk Panel */}
        {weather && (
          <div className="rounded-lg border p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-blue-500" />
              Weather Conditions
            </h4>
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="text-center">
                <Thermometer className="h-4 w-4 mx-auto mb-1 text-red-500" />
                <p className="text-sm font-medium">{weather.temperature}°C</p>
                <p className="text-[10px] text-muted-foreground">Temp</p>
              </div>
              <div className="text-center">
                <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                <p className="text-sm font-medium">{weather.humidity}%</p>
                <p className="text-[10px] text-muted-foreground">Humidity</p>
              </div>
              <div className="text-center">
                <CloudRain className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                <p className="text-sm font-medium">{weather.rainfall}mm</p>
                <p className="text-[10px] text-muted-foreground">Rain</p>
              </div>
              <div className="text-center">
                <Wind className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                <p className="text-sm font-medium">{weather.windSpeed}m/s</p>
                <p className="text-[10px] text-muted-foreground">Wind</p>
              </div>
            </div>
            <div className={cn(
              "p-2 rounded-lg text-center text-sm",
              weather.diseaseRiskLevel.includes("HIGH") 
                ? "bg-red-500/10 text-red-700"
                : weather.diseaseRiskLevel.includes("MEDIUM")
                  ? "bg-yellow-500/10 text-yellow-700"
                  : "bg-green-500/10 text-green-700"
            )}>
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              {weather.diseaseRiskLevel}
            </div>
          </div>
        )}

        {/* Farmer Action Card */}
        {!isHealthy && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-full",
                getUrgencyColor(analysis.urgency) === "text-red-600" ? "bg-red-100" : "bg-primary/10"
              )}>
                <Clock className={cn("h-5 w-5", getUrgencyColor(analysis.urgency))} />
              </div>
              <div className="flex-1">
                <p className={cn("font-medium", getUrgencyColor(analysis.urgency))}>
                  {analysis.urgency}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {analysis.farmer_advice}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    Recovery: {analysis.recovery_probability}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ~{analysis.estimated_recovery_days} days
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    Yield Impact: {analysis.yield_impact}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Treatment Tabs */}
        {!isHealthy && (
          <Tabs defaultValue="organic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="organic">Organic</TabsTrigger>
              <TabsTrigger value="chemical">Chemical</TabsTrigger>
              <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
            </TabsList>
            
            <TabsContent value="organic" className="mt-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium">Organic Treatments</h4>
                </div>
                <ol className="space-y-2">
                  {analysis.organic_treatments.map((treatment, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 text-green-600 text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      {treatment}
                    </li>
                  ))}
                </ol>
              </div>
            </TabsContent>
            
            <TabsContent value="chemical" className="mt-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Beaker className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium">Chemical Treatments</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Product</th>
                        <th className="text-left p-2 font-medium">Dosage</th>
                        <th className="text-left p-2 font-medium">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.chemical_treatments.map((treatment, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-2">{treatment.product}</td>
                          <td className="p-2 text-muted-foreground">{treatment.dosage}</td>
                          <td className="p-2 text-muted-foreground">{treatment.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="fertilizer" className="mt-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="h-4 w-4 text-amber-600" />
                  <h4 className="font-medium">Fertilizer Recommendation</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {analysis.fertilizer_recommendation}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="prevention" className="mt-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Prevention Checklist</h4>
                </div>
                <ul className="space-y-2">
                  {analysis.preventive_measures.map((measure, i) => (
                    <li 
                      key={i} 
                      className="flex items-start gap-2 cursor-pointer"
                      onClick={() => togglePreventionCheck(i)}
                    >
                      <button
                        className={cn(
                          "mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                          checkedPrevention.includes(i)
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground/30"
                        )}
                      >
                        {checkedPrevention.includes(i) && <Check className="h-3 w-3" />}
                      </button>
                      <span className={cn(
                        "text-sm",
                        checkedPrevention.includes(i) && "line-through text-muted-foreground"
                      )}>
                        {measure}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* ICAR Guidelines */}
        {analysis.icar_guidelines && analysis.icar_guidelines !== "N/A" && (
          <div className="rounded-lg border p-4 bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium">ICAR Guidelines</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {analysis.icar_guidelines}
            </p>
            <a
              href="https://icar.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              Visit ICAR <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* Export Options */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button variant="outline" className="flex-1 gap-2" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleWhatsAppShare}>
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={handleCopyToClipboard}
          >
            {copiedToClipboard ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* New Scan Button */}
        <Button 
          variant="default" 
          className="w-full gap-2"
          onClick={onNewScan}
        >
          <Plus className="h-4 w-4" />
          Start New Scan
        </Button>
      </CardContent>
    </Card>
  )
}
