import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const crops = [
  {
    name: "Tomato",
    diseases: 10,
    image: "from-red-500/20 to-red-600/10",
    examples: ["Late Blight", "Early Blight", "Leaf Mold"]
  },
  {
    name: "Potato",
    diseases: 3,
    image: "from-amber-500/20 to-amber-600/10",
    examples: ["Late Blight", "Early Blight", "Healthy"]
  },
  {
    name: "Apple",
    diseases: 4,
    image: "from-red-400/20 to-green-500/10",
    examples: ["Apple Scab", "Black Rot", "Cedar Rust"]
  },
  {
    name: "Corn",
    diseases: 4,
    image: "from-yellow-500/20 to-yellow-600/10",
    examples: ["Common Rust", "Northern Leaf Blight", "Gray Leaf Spot"]
  },
  {
    name: "Grape",
    diseases: 4,
    image: "from-purple-500/20 to-purple-600/10",
    examples: ["Black Rot", "Esca", "Leaf Blight"]
  },
  {
    name: "Pepper",
    diseases: 2,
    image: "from-green-500/20 to-red-500/10",
    examples: ["Bacterial Spot", "Healthy"]
  },
  {
    name: "Strawberry",
    diseases: 2,
    image: "from-red-500/20 to-pink-500/10",
    examples: ["Leaf Scorch", "Healthy"]
  },
  {
    name: "Cherry",
    diseases: 2,
    image: "from-red-600/20 to-red-700/10",
    examples: ["Powdery Mildew", "Healthy"]
  },
]

export function CropsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Supported Crops
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Our model is trained on the PlantVillage dataset covering 14 crop species and 38 disease classes.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {crops.map((crop) => (
            <Card key={crop.name} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-24 bg-gradient-to-br ${crop.image}`} />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{crop.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {crop.diseases} classes
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {crop.examples.slice(0, 2).map((example) => (
                    <span key={example} className="text-xs text-muted-foreground">
                      {example}{crop.examples.indexOf(example) < 1 ? "," : ""}
                    </span>
                  ))}
                  {crop.examples.length > 2 && (
                    <span className="text-xs text-muted-foreground">...</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
