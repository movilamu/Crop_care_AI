"use client"

import { useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Image as ImageIcon, X, Camera, AlertCircle } from "lucide-react"
import Image from "next/image"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImageUploaderProps {
  onImageSelect: (file: File) => void
  imagePreview: string | null
  isLoading: boolean
  onReset: () => void
  hasImage: boolean
  validationError: string | null
}

export function ImageUploader({
  onImageSelect,
  imagePreview,
  isLoading,
  onReset,
  hasImage,
  validationError,
}: ImageUploaderProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const validateAndSelectImage = useCallback((file: File) => {
    // Basic validation
    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      return
    }
    onImageSelect(file)
  }, [onImageSelect])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        validateAndSelectImage(acceptedFiles[0])
      }
    },
    [validateAndSelectImage]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
    noClick: !!imagePreview,
    noKeyboard: !!imagePreview,
    maxSize: 10 * 1024 * 1024,
  })

  const handleCameraCapture = useCallback(() => {
    cameraInputRef.current?.click()
  }, [])

  const handleCameraChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndSelectImage(file)
    }
  }, [validateAndSelectImage])

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Upload Plant Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        {validationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleCameraChange}
        />

        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-xl transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
            ${!imagePreview ? "cursor-pointer hover:border-primary hover:bg-primary/5" : ""}
          `}
        >
          <input {...getInputProps()} />
          
          {imagePreview ? (
            <div className="relative aspect-square">
              <Image
                src={imagePreview}
                alt="Selected plant image"
                fill
                className="object-contain rounded-lg p-2"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  onReset()
                }}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium mb-2">
                {isDragActive ? "Drop your image here" : "Drag & drop your plant image"}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse (JPG, PNG, WebP - Max 10MB)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Browse Files
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCameraCapture()
                  }}
                >
                  <Camera className="h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          )}
        </div>

        {hasImage && (
          <Button
            variant="outline"
            onClick={open}
            disabled={isLoading}
            className="w-full mt-4"
          >
            Change Image
          </Button>
        )}

        <div className="mt-6 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Tips for best results:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">1.</span>
              Use clear, well-lit photos of individual leaves
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">2.</span>
              Ensure the affected area is clearly visible
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">3.</span>
              Avoid blurry or low-resolution images (min 200x200px)
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
