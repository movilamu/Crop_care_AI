import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DetectionInterface } from "@/components/detect/detection-interface"

export const metadata = {
  title: "Disease Detection - CropCare AI",
  description: "Upload a plant image to get instant AI-powered disease diagnosis with treatment recommendations.",
}

export default function DetectPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Disease Detection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload a photo of your plant leaf to get instant AI-powered diagnosis 
              with treatment recommendations.
            </p>
          </div>
          <DetectionInterface />
        </div>
      </main>
      <Footer />
    </div>
  )
}
