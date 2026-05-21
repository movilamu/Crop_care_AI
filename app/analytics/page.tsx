import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { ScanTrendsChart } from "@/components/analytics/scan-trends-chart"
import { TopDiseasesChart } from "@/components/analytics/top-diseases-chart"
import { CropDistributionChart } from "@/components/analytics/crop-distribution-chart"
import { SeverityDistributionChart } from "@/components/analytics/severity-distribution-chart"
import { AccuracyMetrics } from "@/components/analytics/accuracy-metrics"

export const metadata = {
  title: "Analytics Dashboard - CropCare AI",
  description: "View insights and analytics from your crop disease detection scans.",
}

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Insights and trends from your crop disease detection activities.
            </p>
          </div>
          
          <AnalyticsOverview />
          
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <ScanTrendsChart />
            <TopDiseasesChart />
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <CropDistributionChart />
            <SeverityDistributionChart />
            <AccuracyMetrics />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
