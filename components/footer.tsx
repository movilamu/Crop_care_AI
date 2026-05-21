import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">CropCare AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced AI-powered crop disease detection for farmers and agricultural professionals worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/detect" className="hover:text-foreground transition-colors">Disease Detection</Link></li>
              <li><Link href="/history" className="hover:text-foreground transition-colors">Scan History</Link></li>
              <li><Link href="/analytics" className="hover:text-foreground transition-colors">Analytics Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Supported Crops</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Tomato</li>
              <li>Potato</li>
              <li>Apple</li>
              <li>Corn</li>
              <li>Grape & More</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Research Papers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CropCare AI. All rights reserved.</p>
          <p>Powered by PlantVillage Dataset & Deep Learning</p>
        </div>
      </div>
    </footer>
  )
}
