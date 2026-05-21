import { Upload, Cpu, ClipboardList, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Image",
    description: "Take a photo or upload an image of the affected plant leaf. Our system accepts JPG, PNG, and WebP formats."
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analysis",
    description: "Our deep learning model analyzes the image, identifying disease patterns and generating a Grad-CAM visualization."
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Get Results",
    description: "Receive instant diagnosis with confidence scores, severity assessment, and actionable treatment recommendations."
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Get disease diagnosis in three simple steps. No expertise required.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/30 -translate-x-1/2" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
