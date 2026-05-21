import { Card, CardContent } from "@/components/ui/card"
import { 
  ScanLine, 
  Brain, 
  FileText, 
  Shield, 
  Clock, 
  Smartphone 
} from "lucide-react"

const features = [
  {
    icon: ScanLine,
    title: "Instant Detection",
    description: "Upload a plant image and get disease diagnosis in seconds using state-of-the-art deep learning models."
  },
  {
    icon: Brain,
    title: "AI Explainability",
    description: "Grad-CAM heatmaps show exactly which parts of the leaf the AI analyzed, ensuring transparent predictions."
  },
  {
    icon: FileText,
    title: "Treatment Plans",
    description: "Get detailed treatment recommendations including organic and chemical options, plus prevention tips."
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description: "Our ensemble model combining MobileNetV2 and ResNet50 achieves 92%+ accuracy on the PlantVillage dataset."
  },
  {
    icon: Clock,
    title: "Scan History",
    description: "Track all your past scans, monitor crop health over time, and export detailed PDF reports."
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access CropCare AI from any device - optimized for use in the field with limited connectivity."
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Everything You Need to Protect Your Crops
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Comprehensive tools powered by machine learning to detect, diagnose, and treat plant diseases effectively.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
