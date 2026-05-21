// Disease knowledge base with treatment recommendations
// Based on PlantVillage dataset classes

export interface DiseaseInfo {
  disease_name: string
  crop: string
  severity: "Low" | "Medium" | "High" | "Critical"
  severity_score: number
  symptoms: string
  causes: string
  organic_treatment: string[]
  chemical_treatment: string[]
  prevention: string[]
  fertilizer: string
  references: string[]
}

export const DISEASE_KNOWLEDGE_BASE: Record<string, DiseaseInfo> = {
  "Apple___Apple_scab": {
    disease_name: "Apple Scab",
    crop: "Apple",
    severity: "Medium",
    severity_score: 5,
    symptoms: "Olive-green to brown velvety spots on leaves and fruit, leaf curling and premature drop",
    causes: "Venturia inaequalis fungus, spreads through wind and rain splash",
    organic_treatment: ["Neem oil spray", "Sulfur-based fungicides", "Copper spray in dormant season"],
    chemical_treatment: ["Captan 50% WP", "Myclobutanil", "Trifloxystrobin"],
    prevention: ["Remove fallen leaves", "Prune for air circulation", "Plant resistant varieties"],
    fertilizer: "Balanced NPK with extra potassium for disease resistance",
    references: ["Cornell University Plant Pathology", "USDA Plant Disease Guidelines"]
  },
  "Apple___Black_rot": {
    disease_name: "Black Rot",
    crop: "Apple",
    severity: "High",
    severity_score: 7,
    symptoms: "Brown leaf spots with purple margins, dark sunken cankers on fruit",
    causes: "Botryosphaeria obtusa fungus, overwinters in mummified fruit and cankers",
    organic_treatment: ["Copper-based fungicides", "Remove infected plant material"],
    chemical_treatment: ["Captan", "Thiophanate-methyl", "Strobilurin fungicides"],
    prevention: ["Remove mummified fruits", "Prune dead wood", "Maintain tree vigor"],
    fertilizer: "Calcium-rich fertilizers to strengthen cell walls",
    references: ["Penn State Extension", "University of Kentucky Agriculture"]
  },
  "Apple___Cedar_apple_rust": {
    disease_name: "Cedar Apple Rust",
    crop: "Apple",
    severity: "Medium",
    severity_score: 5,
    symptoms: "Bright orange spots on leaves, yellow spots with red border on fruit",
    causes: "Gymnosporangium juniperi-virginianae fungus, requires juniper as alternate host",
    organic_treatment: ["Sulfur sprays", "Neem oil applications"],
    chemical_treatment: ["Myclobutanil", "Fenarimol", "Triadimefon"],
    prevention: ["Remove nearby juniper trees", "Plant resistant apple varieties", "Apply fungicides before infection"],
    fertilizer: "Balanced fertilizer with micronutrients",
    references: ["Missouri Botanical Garden", "University of Illinois Extension"]
  },
  "Apple___healthy": {
    disease_name: "Healthy",
    crop: "Apple",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - plant appears healthy",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices", "Regular monitoring", "Balanced nutrition"],
    fertilizer: "Regular balanced NPK fertilization",
    references: ["Standard agricultural practices"]
  },
  "Tomato___Late_blight": {
    disease_name: "Late Blight",
    crop: "Tomato",
    severity: "Critical",
    severity_score: 9,
    symptoms: "Dark brown lesions on leaves and stems, white fuzzy growth on undersides, rapidly spreading decay",
    causes: "Phytophthora infestans oomycete, favored by cool wet conditions",
    organic_treatment: ["Copper-based fungicides", "Neem oil spray", "Bacillus subtilis products"],
    chemical_treatment: ["Mancozeb 75% WP", "Chlorothalonil", "Metalaxyl-M"],
    prevention: ["Avoid overhead irrigation", "Crop rotation", "Remove infected plants immediately", "Plant resistant varieties"],
    fertilizer: "Potassium-rich fertilizer to boost immunity",
    references: ["ICAR guidelines", "FAO recommendation", "Cornell Late Blight Network"]
  },
  "Tomato___Early_blight": {
    disease_name: "Early Blight",
    crop: "Tomato",
    severity: "High",
    severity_score: 7,
    symptoms: "Concentric ring pattern (target spot) on lower leaves, yellowing around spots, stem lesions",
    causes: "Alternaria solani fungus, spreads through splashing water and infected debris",
    organic_treatment: ["Copper fungicides", "Neem oil", "Trichoderma-based biocontrol"],
    chemical_treatment: ["Chlorothalonil", "Mancozeb", "Azoxystrobin"],
    prevention: ["Mulching to prevent splash", "Stake plants", "Remove lower leaves", "Rotate crops"],
    fertilizer: "Calcium and potassium supplements",
    references: ["University of Florida IFAS", "Clemson Cooperative Extension"]
  },
  "Tomato___Septoria_leaf_spot": {
    disease_name: "Septoria Leaf Spot",
    crop: "Tomato",
    severity: "Medium",
    severity_score: 6,
    symptoms: "Small circular spots with dark borders and gray centers, tiny black dots in center",
    causes: "Septoria lycopersici fungus, spreads through water splash",
    organic_treatment: ["Copper sprays", "Baking soda solution", "Compost tea"],
    chemical_treatment: ["Chlorothalonil", "Mancozeb", "Copper hydroxide"],
    prevention: ["Avoid wetting foliage", "Remove infected leaves", "Space plants properly"],
    fertilizer: "Balanced nutrition with adequate nitrogen",
    references: ["NC State Extension", "Ohio State University"]
  },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    disease_name: "Tomato Yellow Leaf Curl Virus",
    crop: "Tomato",
    severity: "Critical",
    severity_score: 9,
    symptoms: "Upward curling of leaves, yellowing leaf margins, stunted growth, flower drop",
    causes: "TYLCV virus transmitted by whiteflies (Bemisia tabaci)",
    organic_treatment: ["Remove infected plants", "Reflective mulches to repel whiteflies", "Insecticidal soap"],
    chemical_treatment: ["Imidacloprid for whitefly control", "Thiamethoxam"],
    prevention: ["Use virus-free transplants", "Control whitefly populations", "Plant resistant varieties", "Use fine mesh barriers"],
    fertilizer: "Healthy plants are more resistant - maintain balanced nutrition",
    references: ["UC Davis Plant Pathology", "AVRDC World Vegetable Center"]
  },
  "Tomato___healthy": {
    disease_name: "Healthy",
    crop: "Tomato",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - plant appears healthy with vibrant green foliage",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices", "Regular monitoring", "Balanced nutrition"],
    fertilizer: "Regular balanced NPK fertilization with calcium",
    references: ["Standard agricultural practices"]
  },
  "Potato___Late_blight": {
    disease_name: "Late Blight",
    crop: "Potato",
    severity: "Critical",
    severity_score: 9,
    symptoms: "Water-soaked lesions on leaves, white mold on undersides, rapid plant collapse",
    causes: "Phytophthora infestans, same pathogen that caused Irish Potato Famine",
    organic_treatment: ["Copper-based fungicides", "Remove all infected material", "Destroy volunteer potatoes"],
    chemical_treatment: ["Ridomil Gold", "Mancozeb", "Chlorothalonil"],
    prevention: ["Plant certified seed potatoes", "Hill soil around plants", "Destroy cull piles", "Monitor weather conditions"],
    fertilizer: "Avoid excess nitrogen, maintain balanced fertility",
    references: ["CIP International Potato Center", "USDA Late Blight Guidelines"]
  },
  "Potato___Early_blight": {
    disease_name: "Early Blight",
    crop: "Potato",
    severity: "High",
    severity_score: 7,
    symptoms: "Target-like concentric rings on leaves, starting from older leaves, premature defoliation",
    causes: "Alternaria solani fungus, favored by warm humid conditions",
    organic_treatment: ["Copper sprays", "Bacillus-based products", "Neem oil"],
    chemical_treatment: ["Chlorothalonil", "Azoxystrobin", "Mancozeb"],
    prevention: ["Crop rotation", "Remove plant debris", "Adequate spacing", "Water early in day"],
    fertilizer: "Balanced NPK, avoid nitrogen deficiency",
    references: ["University of Wisconsin Extension", "Maine Potato Board"]
  },
  "Potato___healthy": {
    disease_name: "Healthy",
    crop: "Potato",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - plant appears healthy",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices", "Regular monitoring"],
    fertilizer: "Balanced nutrition with emphasis on potassium",
    references: ["Standard agricultural practices"]
  },
  "Corn___Common_rust": {
    disease_name: "Common Rust",
    crop: "Corn",
    severity: "Medium",
    severity_score: 5,
    symptoms: "Reddish-brown powdery pustules on both leaf surfaces, may coalesce",
    causes: "Puccinia sorghi fungus, spores carried by wind from southern regions",
    organic_treatment: ["Usually not economically warranted in field corn"],
    chemical_treatment: ["Triazole fungicides", "Strobilurin fungicides if severe"],
    prevention: ["Plant resistant hybrids", "Early planting", "Scout fields regularly"],
    fertilizer: "Balanced fertility program",
    references: ["Purdue University Extension", "University of Nebraska-Lincoln"]
  },
  "Corn___Northern_Leaf_Blight": {
    disease_name: "Northern Leaf Blight",
    crop: "Corn",
    severity: "High",
    severity_score: 7,
    symptoms: "Long elliptical gray-green lesions on leaves, 1-6 inches long",
    causes: "Exserohilum turcicum fungus, survives in corn residue",
    organic_treatment: ["Crop rotation", "Residue management"],
    chemical_treatment: ["Headline (pyraclostrobin)", "Stratego", "Quilt"],
    prevention: ["Plant resistant hybrids", "Rotate away from corn", "Tillage to bury residue"],
    fertilizer: "Adequate nitrogen for plant vigor",
    references: ["Iowa State University Extension", "Pioneer Agronomy"]
  },
  "Corn___healthy": {
    disease_name: "Healthy",
    crop: "Corn",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - plant appears healthy",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices", "Scout regularly"],
    fertilizer: "Follow soil test recommendations",
    references: ["Standard agricultural practices"]
  },
  "Grape___Black_rot": {
    disease_name: "Black Rot",
    crop: "Grape",
    severity: "High",
    severity_score: 8,
    symptoms: "Circular tan lesions with dark borders on leaves, fruit becomes hard black mummies",
    causes: "Guignardia bidwellii fungus, overwinters in mummified berries",
    organic_treatment: ["Sulfur sprays", "Copper-based fungicides"],
    chemical_treatment: ["Myclobutanil", "Mancozeb", "Captan"],
    prevention: ["Remove mummies", "Prune for air circulation", "Canopy management"],
    fertilizer: "Moderate nitrogen to reduce excessive vegetative growth",
    references: ["University of California IPM", "Cornell Grape Program"]
  },
  "Grape___Esca": {
    disease_name: "Esca (Black Measles)",
    crop: "Grape",
    severity: "Critical",
    severity_score: 9,
    symptoms: "Tiger-stripe pattern on leaves, dark spots on berries, sudden vine collapse",
    causes: "Complex of fungal pathogens including Phaeomoniella and Phaeoacremonium",
    organic_treatment: ["Remove infected cordons", "Wound protection"],
    chemical_treatment: ["No effective chemical control", "Focus on prevention"],
    prevention: ["Protect pruning wounds", "Remove infected wood", "Proper vineyard sanitation"],
    fertilizer: "Maintain vine vigor without excess nitrogen",
    references: ["UC Davis Viticulture", "American Journal of Enology and Viticulture"]
  },
  "Grape___Leaf_blight": {
    disease_name: "Leaf Blight (Isariopsis)",
    crop: "Grape",
    severity: "Medium",
    severity_score: 5,
    symptoms: "Brown spots with irregular margins, often starting at leaf edges",
    causes: "Isariopsis clavispora fungus, favored by humid conditions",
    organic_treatment: ["Copper sprays", "Improve air circulation"],
    chemical_treatment: ["Mancozeb", "Captan"],
    prevention: ["Canopy management", "Proper spacing", "Remove infected leaves"],
    fertilizer: "Balanced nutrition",
    references: ["Extension viticulture resources"]
  },
  "Grape___healthy": {
    disease_name: "Healthy",
    crop: "Grape",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - vine appears healthy",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices", "Regular scouting"],
    fertilizer: "Follow soil and tissue test recommendations",
    references: ["Standard viticulture practices"]
  },
  "Pepper___Bacterial_spot": {
    disease_name: "Bacterial Spot",
    crop: "Pepper",
    severity: "High",
    severity_score: 7,
    symptoms: "Small water-soaked spots that turn brown, raised corky spots on fruit",
    causes: "Xanthomonas bacteria, spread by rain splash and contaminated seed",
    organic_treatment: ["Copper sprays (limited effectiveness)", "Remove infected plants"],
    chemical_treatment: ["Copper + mancozeb tank mix", "Actigard (plant activator)"],
    prevention: ["Use disease-free seed", "Avoid overhead irrigation", "Crop rotation"],
    fertilizer: "Balanced nutrition, avoid excess nitrogen",
    references: ["University of Georgia Extension", "NC State Vegetable Pathology"]
  },
  "Pepper___healthy": {
    disease_name: "Healthy",
    crop: "Pepper",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - plant appears healthy",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices"],
    fertilizer: "Balanced NPK with calcium",
    references: ["Standard agricultural practices"]
  },
  "Strawberry___Leaf_scorch": {
    disease_name: "Leaf Scorch",
    crop: "Strawberry",
    severity: "Medium",
    severity_score: 5,
    symptoms: "Irregular dark purple spots, leaves appear scorched, may affect fruit caps",
    causes: "Diplocarpon earlianum fungus",
    organic_treatment: ["Remove infected leaves", "Improve air circulation"],
    chemical_treatment: ["Captan", "Myclobutanil"],
    prevention: ["Plant resistant varieties", "Renovation after harvest", "Proper spacing"],
    fertilizer: "Avoid excess nitrogen",
    references: ["University of Minnesota Extension", "Ohio State Berry Pathology"]
  },
  "Strawberry___healthy": {
    disease_name: "Healthy",
    crop: "Strawberry",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - plant appears healthy",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices", "Annual renovation"],
    fertilizer: "Balanced nutrition",
    references: ["Standard berry production practices"]
  },
  "Cherry___Powdery_mildew": {
    disease_name: "Powdery Mildew",
    crop: "Cherry",
    severity: "Medium",
    severity_score: 5,
    symptoms: "White powdery coating on leaves and fruit, leaf curling, stunted growth",
    causes: "Podosphaera clandestina fungus",
    organic_treatment: ["Sulfur sprays", "Potassium bicarbonate", "Neem oil"],
    chemical_treatment: ["Myclobutanil", "Trifloxystrobin", "Propiconazole"],
    prevention: ["Prune for air circulation", "Avoid excessive nitrogen", "Site selection"],
    fertilizer: "Moderate nitrogen, adequate potassium",
    references: ["Washington State University Tree Fruit", "Oregon State Extension"]
  },
  "Cherry___healthy": {
    disease_name: "Healthy",
    crop: "Cherry",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - tree appears healthy",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices"],
    fertilizer: "Follow soil test recommendations",
    references: ["Standard orchard practices"]
  },
  "Peach___Bacterial_spot": {
    disease_name: "Bacterial Spot",
    crop: "Peach",
    severity: "High",
    severity_score: 7,
    symptoms: "Angular purple-brown spots on leaves, sunken lesions on fruit, twig cankers",
    causes: "Xanthomonas arboricola pv. pruni bacteria",
    organic_treatment: ["Copper sprays during dormancy", "Limited options during season"],
    chemical_treatment: ["Oxytetracycline", "Copper hydroxide"],
    prevention: ["Plant resistant varieties", "Avoid low-lying sites", "Proper pruning"],
    fertilizer: "Avoid excess nitrogen",
    references: ["Clemson University Peach Program", "University of Georgia"]
  },
  "Peach___healthy": {
    disease_name: "Healthy",
    crop: "Peach",
    severity: "Low",
    severity_score: 0,
    symptoms: "No visible disease symptoms - tree appears healthy",
    causes: "N/A - Plant is healthy",
    organic_treatment: ["Continue regular maintenance"],
    chemical_treatment: ["No treatment needed"],
    prevention: ["Maintain good cultural practices", "Regular scouting"],
    fertilizer: "Balanced nutrition based on leaf analysis",
    references: ["Standard stone fruit practices"]
  },
  "Squash___Powdery_mildew": {
    disease_name: "Powdery Mildew",
    crop: "Squash",
    severity: "Medium",
    severity_score: 5,
    symptoms: "White powdery patches on upper leaf surfaces, premature leaf death",
    causes: "Podosphaera xanthii and Erysiphe cichoracearum fungi",
    organic_treatment: ["Potassium bicarbonate", "Neem oil", "Sulfur (with caution)"],
    chemical_treatment: ["Myclobutanil", "Trifloxystrobin", "Chlorothalonil"],
    prevention: ["Plant resistant varieties", "Proper spacing", "Avoid overhead irrigation"],
    fertilizer: "Balanced nutrition, avoid excess nitrogen",
    references: ["Cornell Vegetable Program", "UC ANR Pest Management"]
  }
}

// Get all unique crops from the knowledge base
export const SUPPORTED_CROPS = [...new Set(Object.values(DISEASE_KNOWLEDGE_BASE).map(d => d.crop))]

// Get diseases by crop
export function getDiseasesByCrop(crop: string): DiseaseInfo[] {
  return Object.values(DISEASE_KNOWLEDGE_BASE).filter(d => d.crop === crop)
}

// Get disease info by key
export function getDiseaseInfo(diseaseKey: string): DiseaseInfo | undefined {
  return DISEASE_KNOWLEDGE_BASE[diseaseKey]
}

// Get severity color
export function getSeverityColor(severity: DiseaseInfo["severity"]): string {
  switch (severity) {
    case "Low": return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
    case "Medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "High": return "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
    case "Critical": return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
    default: return "text-muted-foreground bg-muted"
  }
}
