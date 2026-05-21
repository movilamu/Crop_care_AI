import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HistoryTable } from "@/components/history/history-table"
import { HistoryFilters } from "@/components/history/history-filters"
import { HistoryStats } from "@/components/history/history-stats"

export const metadata = {
  title: "Scan History - CropCare AI",
  description: "View your past plant disease scans and track crop health over time.",
}

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Scan History</h1>
            <p className="text-muted-foreground">
              View and manage your past plant disease scans. Track crop health trends over time.
            </p>
          </div>
          
          <HistoryStats />
          <HistoryFilters />
          <HistoryTable />
        </div>
      </main>
      <Footer />
    </div>
  )
}
