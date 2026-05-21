"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { SUPPORTED_CROPS, type CropType } from "@/lib/types"
import { 
  Leaf, 
  CircleDot, 
  Wheat,
  Bean,
  Flower2
} from "lucide-react"

interface CropSelectorProps {
  selectedCrop: CropType | null
  onSelect: (crop: CropType) => void
  disabled?: boolean
}

// Map crop icons to Lucide components
function getCropIcon(iconName: string) {
  switch (iconName) {
    case "tomato":
      return <CircleDot className="h-6 w-6 text-red-500" />
    case "potato":
      return <CircleDot className="h-6 w-6 text-amber-700" />
    case "rice":
      return <Wheat className="h-6 w-6 text-amber-500" />
    case "wheat":
      return <Wheat className="h-6 w-6 text-yellow-600" />
    case "corn":
      return <Wheat className="h-6 w-6 text-yellow-500" />
    case "cotton":
      return <Flower2 className="h-6 w-6 text-gray-100" />
    case "sugarcane":
      return <Leaf className="h-6 w-6 text-green-600" />
    case "soybean":
      return <Bean className="h-6 w-6 text-green-500" />
    case "pepper":
      return <CircleDot className="h-6 w-6 text-red-600" />
    case "grape":
      return <CircleDot className="h-6 w-6 text-purple-500" />
    default:
      return <Leaf className="h-6 w-6 text-green-500" />
  }
}

export function CropSelector({ selectedCrop, onSelect, disabled }: CropSelectorProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Leaf className="h-5 w-5 text-primary" />
          Select Crop Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SUPPORTED_CROPS.map((crop) => (
            <button
              key={crop.id}
              onClick={() => onSelect(crop)}
              disabled={disabled}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all",
                "hover:border-primary hover:bg-primary/5",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                selectedCrop?.id === crop.id
                  ? "border-primary bg-primary/10"
                  : "border-muted"
              )}
            >
              <div className="mb-2">
                {getCropIcon(crop.icon)}
              </div>
              <span className="text-xs font-medium">{crop.label}</span>
              <span className="text-[10px] text-muted-foreground">{crop.season}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
