"use client"

import { useState, useCallback } from "react"
import { ImageUploader } from "./image-uploader"
import { CropSelector } from "./crop-selector"
import { AnalysisProgress } from "./analysis-progress"
import { ResultsDisplay } from "./results-display"
import { useAnalysis } from "@/hooks/use-analysis"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScanLine, AlertCircle, RefreshCw } from "lucide-react"
import type { CropType } from "@/lib/types"

export function DetectionInterface() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  
  const { analyze, isLoading, result, error, steps, currentStep, reset } = useAnalysis()

  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file)
    setValidationError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    reset()
  }, [reset])

  const handleCropSelect = useCallback((crop: CropType) => {
    setSelectedCrop(crop)
    setValidationError(null)
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!selectedImage) {
      setValidationError("Please upload an image first")
      return
    }
    if (!selectedCrop) {
      setValidationError("Please select a crop type")
      return
    }
    setValidationError(null)
    await analyze(selectedImage, selectedCrop.id, selectedCrop.label)
  }, [selectedImage, selectedCrop, analyze])

  const handleReset = useCallback(() => {
    setSelectedImage(null)
    setImagePreview(null)
    setSelectedCrop(null)
    setValidationError(null)
    reset()
  }, [reset])

  const handleRetry = useCallback(() => {
    if (selectedImage && selectedCrop) {
      analyze(selectedImage, selectedCrop.id, selectedCrop.label)
    }
  }, [selectedImage, selectedCrop, analyze])

  const canAnalyze = selectedImage && selectedCrop && !isLoading

  return (
    <div className="space-y-6">
      {/* Top Section: Crop Selector */}
      <CropSelector
        selectedCrop={selectedCrop}
        onSelect={handleCropSelect}
        disabled={isLoading}
      />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: Image Upload */}
        <div className="space-y-4">
          <ImageUploader
            onImageSelect={handleImageSelect}
            imagePreview={imagePreview}
            isLoading={isLoading}
            onReset={handleReset}
            hasImage={!!selectedImage}
            validationError={validationError}
          />

          {/* Analyze Button */}
          {selectedImage && !isLoading && !result && (
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="w-full gap-2"
              size="lg"
            >
              <ScanLine className="h-5 w-5" />
              Analyze Plant
            </Button>
          )}

          {/* Analysis Progress */}
          {isLoading && (
            <AnalysisProgress steps={steps} currentStep={currentStep} />
          )}

          {/* Error Display */}
          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription className="mt-2">
                {error}
                <div className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Right Column: Results */}
        <ResultsDisplay
          result={result}
          isLoading={isLoading}
          imagePreview={imagePreview}
          onNewScan={handleReset}
        />
      </div>
    </div>
  )
}
