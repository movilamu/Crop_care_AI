import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScanLine, ArrowRight, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Trusted by 10,000+ farmers worldwide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Protect Your Crops with{" "}
            <span className="text-primary">AI-Powered</span>{" "}
            Disease Detection
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed text-pretty">
            Upload a photo of your plant and get instant disease diagnosis with treatment recommendations. 
            Powered by deep learning trained on 54,000+ plant images.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/detect">
              <Button size="lg" className="gap-2 text-base h-12 px-8">
                <ScanLine className="h-5 w-5" />
                Start Detection
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="gap-2 text-base h-12 px-8">
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-6 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Instant Results</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span>38 Disease Classes</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span>92%+ Accuracy</span>
            </div>
          </div>
        </div>
        
        {/* Hero Image/Preview */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
            <div className="aspect-[16/9] bg-muted flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 p-8 w-full max-w-3xl">
                {/* Mock Detection Cards */}
                <div className="col-span-2 rounded-xl border bg-background p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-lg bg-muted" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-32 bg-muted rounded" />
                      <div className="h-3 w-24 bg-primary/20 rounded" />
                      <div className="h-3 w-full bg-muted rounded" />
                      <div className="h-3 w-3/4 bg-muted rounded" />
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-background p-4 shadow-sm space-y-3">
                  <div className="h-3 w-16 bg-muted rounded" />
                  <div className="h-8 w-full bg-primary/20 rounded" />
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-8 w-full bg-muted rounded" />
                </div>
                <div className="col-span-3 rounded-xl border bg-background p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-32 bg-muted rounded" />
                    <div className="flex gap-2">
                      <div className="h-8 w-20 bg-primary/20 rounded" />
                      <div className="h-8 w-20 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-8 w-3/4 bg-primary/20 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  )
}
