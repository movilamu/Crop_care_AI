import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

const ANALYSIS_PROMPT = `You are an expert agricultural scientist and plant pathologist with 20+ years of experience. Analyze this leaf image and respond ONLY in this exact JSON format with no extra text:
{
  "disease_detected": true/false,
  "disease_name": "exact disease name or Healthy",
  "scientific_name": "scientific name of pathogen or N/A if healthy",
  "confidence": 0-100,
  "severity": "None/Mild/Moderate/Severe/Critical",
  "severity_score": 0-10,
  "affected_area_percentage": 0-100,
  "symptoms_observed": ["symptom1", "symptom2", "symptom3"],
  "primary_cause": "main cause of disease or N/A",
  "contributing_factors": ["factor1", "factor2"],
  "organic_treatments": ["treatment1", "treatment2", "treatment3"],
  "chemical_treatments": [
    {"product": "name", "dosage": "amount", "frequency": "how often"}
  ],
  "fertilizer_recommendation": "specific fertilizer advice",
  "preventive_measures": ["measure1", "measure2", "measure3"],
  "urgency": "Immediate/Within 3 days/Within a week/Monitor only",
  "yield_impact": "estimated yield loss percentage if untreated",
  "recovery_probability": "High/Medium/Low with treatment",
  "estimated_recovery_days": number,
  "icar_guidelines": "relevant ICAR recommendation",
  "farmer_advice": "simple actionable advice in plain language"
}`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageBase64, cropType, mediaType = "image/jpeg" } = body

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: "No image provided" },
        { status: 400 }
      )
    }

    if (!cropType) {
      return NextResponse.json(
        { success: false, error: "Please select a crop type" },
        { status: 400 }
      )
    }

    const groqApiKey = process.env.GROQ_API_KEY
    if (!groqApiKey) {
      return NextResponse.json(
        { success: false, error: "AI service not configured. Please add GROQ_API_KEY." },
        { status: 500 }
      )
    }

    const startTime = Date.now()

    // Call Groq API with vision model
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:${mediaType};base64,${imageBase64}`,
                },
              },
              {
                type: "text",
                text: `The crop type is: ${cropType}\n\n${ANALYSIS_PROMPT}`,
              },
            ],
          },
        ],
      }),
    })

    if (!groqResponse.ok) {
      const errorData = await groqResponse.text()
      console.error("Groq API error:", errorData)
      return NextResponse.json(
        { success: false, error: "AI analysis failed. Please try again." },
        { status: 500 }
      )
    }

    const groqData = await groqResponse.json()
    const responseText = groqData.choices?.[0]?.message?.content

    if (!responseText) {
      return NextResponse.json(
        { success: false, error: "No response from AI service" },
        { status: 500 }
      )
    }

    // Parse the JSON response from Groq
    let analysis
    try {
      // Clean up the response - remove markdown code blocks if present
      const cleanedText = responseText.replace(/```json|```/g, "").trim()
      analysis = JSON.parse(cleanedText)
    } catch {
      console.error("Failed to parse Groq response:", responseText)
      return NextResponse.json(
        { success: false, error: "Failed to parse AI response" },
        { status: 500 }
      )
    }

    const processingTime = Date.now() - startTime

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        processingTimeMs: processingTime,
      },
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to analyze image. Please try again." },
      { status: 500 }
    )
  }
}
