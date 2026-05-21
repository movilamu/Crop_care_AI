import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScanLine, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-lg opacity-90 mb-8 text-pretty">
            Start detecting plant diseases today. Free to use, no registration required.
          </p>
          <Link href="/detect">
            <Button size="lg" variant="secondary" className="gap-2 text-base h-12 px-8">
              <ScanLine className="h-5 w-5" />
              Start Disease Detection
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
