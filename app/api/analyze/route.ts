import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

// Current Groq multimodal/vision model
const VISION_MODEL = "qwen/qwen3.8-27b"

const ANALYSIS_PROMPT = `You are an expert agricultural scientist and plant pathologist with 20+ years of experience.

Analyze the supplied plant leaf image carefully.

The crop type will be provided separately.

Return ONLY a valid JSON object. Do not use Markdown. Do not wrap the JSON in code fences.

Use exactly this structure:

{
  "disease_detected": true,
  "disease_name": "exact disease name or Healthy",
  "scientific_name": "scientific name of pathogen or N/A if healthy",
  "confidence": 0,
  "severity": "None",
  "severity_score": 0,
  "affected_area_percentage": 0,
  "symptoms_observed": [],
  "primary_cause": "main cause of disease or N/A",
  "contributing_factors": [],
  "organic_treatments": [],
  "chemical_treatments": [
    {
      "product": "name",
      "dosage": "amount",
      "frequency": "how often"
    }
  ],
  "fertilizer_recommendation": "specific fertilizer advice or N/A",
  "preventive_measures": [],
  "urgency": "Monitor only",
  "yield_impact": "estimated yield loss percentage if untreated",
  "recovery_probability": "High",
  "estimated_recovery_days": 0,
  "icar_guidelines": "relevant ICAR recommendation",
  "farmer_advice": "simple actionable advice in plain language"
}

Rules:

- disease_detected must be true or false.
- If the plant appears healthy, use "Healthy" for disease_name.
- If healthy, scientific_name should be "N/A".
- confidence must be an integer from 0 to 100.
- severity must be exactly one of:
  "None", "Mild", "Moderate", "Severe", "Critical".
- severity_score must be an integer from 0 to 10.
- affected_area_percentage must be from 0 to 100.
- symptoms_observed must be an array of strings.
- contributing_factors must be an array of strings.
- organic_treatments must be an array of strings.
- chemical_treatments must be an array of objects.
- preventive_measures must be an array of strings.
- urgency must be exactly one of:
  "Immediate", "Within 3 days", "Within a week", "Monitor only".
- recovery_probability must be exactly one of:
  "High", "Medium", "Low".
- estimated_recovery_days must be a number.
- Do not invent certainty when the image is unclear.
- If the image quality is insufficient to confidently identify a disease, state that appropriately and reduce confidence.
- Do not identify a disease solely from the crop name.
- Base the diagnosis primarily on visible symptoms in the image.
- Treatment recommendations should be appropriate for the identified crop and disease.
- Do not recommend dangerous or obviously inappropriate chemical use.
- For chemical treatments, provide practical agricultural guidance and indicate that the farmer should follow the product label and local agricultural guidance.
- ICAR guidance should only be stated when reasonably applicable; otherwise use "Consult local ICAR/KVK agricultural guidance".
- Return valid JSON only.
`

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // ------------------------------------------------------------
    // 1. Read request body
    // ------------------------------------------------------------
    let body: {
      imageBase64?: string
      cropType?: string
      mediaType?: string
    }

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body.",
        },
        { status: 400 }
      )
    }

    const {
      imageBase64,
      cropType,
      mediaType = "image/jpeg",
    } = body

    // ------------------------------------------------------------
    // 2. Validate image
    // ------------------------------------------------------------
    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "No image provided.",
        },
        { status: 400 }
      )
    }

    // ------------------------------------------------------------
    // 3. Validate crop
    // ------------------------------------------------------------
    if (!cropType || typeof cropType !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a crop type.",
        },
        { status: 400 }
      )
    }

    // ------------------------------------------------------------
    // 4. Check Groq API key
    // ------------------------------------------------------------
    const groqApiKey = process.env.GROQ_API_KEY

    if (!groqApiKey) {
      console.error("GROQ_API_KEY is not configured")

      return NextResponse.json(
        {
          success: false,
          error:
            "AI service is not configured. Please configure GROQ_API_KEY in Vercel.",
        },
        { status: 500 }
      )
    }

    // ------------------------------------------------------------
    // 5. Normalize base64
    //
    // Some frontends send:
    // data:image/jpeg;base64,AAAA...
    //
    // while others send only:
    // AAAA...
    //
    // Support both formats.
    // ------------------------------------------------------------
    let cleanBase64 = imageBase64

    if (cleanBase64.includes(",")) {
      cleanBase64 = cleanBase64.split(",")[1]
    }

    if (!cleanBase64) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid image data.",
        },
        { status: 400 }
      )
    }

    // ------------------------------------------------------------
    // 6. Validate image type
    // ------------------------------------------------------------
    const allowedMediaTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ]

    const normalizedMediaType = allowedMediaTypes.includes(mediaType)
      ? mediaType
      : "image/jpeg"

    // ------------------------------------------------------------
    // 7. Protect against excessively large requests
    //
    // Groq currently documents a 20 MB maximum for requests
    // containing an image URL.
    // ------------------------------------------------------------
    const approximateImageBytes =
      Math.floor((cleanBase64.length * 3) / 4)

    const MAX_IMAGE_BYTES = 19 * 1024 * 1024

    if (approximateImageBytes > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Image is too large. Please upload an image smaller than 19 MB.",
        },
        { status: 413 }
      )
    }

    // ------------------------------------------------------------
    // 8. Build data URL
    // ------------------------------------------------------------
    const imageDataUrl = `data:${normalizedMediaType};base64,${cleanBase64}`

    // ------------------------------------------------------------
    // 9. Call Groq Vision
    // ------------------------------------------------------------
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: VISION_MODEL,

        messages: [
          {
            role: "system",
            content: ANALYSIS_PROMPT,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this plant leaf.

Crop type: ${cropType}

Return the requested JSON diagnosis.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageDataUrl,
                },
              },
            ],
          },
        ],

        // Current Groq API parameter
        max_completion_tokens: 3000,

        // Low temperature makes structured agricultural
        // diagnosis output more consistent.
        temperature: 0.2,

        // Qwen 3.8 27B supports JSON mode.
        response_format: {
          type: "json_object",
        },

        stream: false,
      }),
    })

    // ------------------------------------------------------------
    // 10. Handle Groq errors properly
    // ------------------------------------------------------------
    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()

      console.error("========== GROQ API ERROR ==========")
      console.error("Status:", groqResponse.status)
      console.error("Response:", errorText)
      console.error("Model:", VISION_MODEL)
      console.error("=====================================")

      let groqMessage = "Groq AI service rejected the request."

      try {
        const parsedError = JSON.parse(errorText)

        if (parsedError?.error?.message) {
          groqMessage = parsedError.error.message
        }
      } catch {
        // Keep generic message if Groq response isn't JSON.
      }

      return NextResponse.json(
        {
          success: false,
          error: groqMessage,
        },
        { status: 502 }
      )
    }

    // ------------------------------------------------------------
    // 11. Parse Groq response
    // ------------------------------------------------------------
    let groqData: any

    try {
      groqData = await groqResponse.json()
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid response received from AI service.",
        },
        { status: 502 }
      )
    }

    const responseText =
      groqData?.choices?.[0]?.message?.content

    if (!responseText) {
      console.error("Groq returned no content:", groqData)

      return NextResponse.json(
        {
          success: false,
          error: "AI service returned an empty response.",
        },
        { status: 502 }
      )
    }

    // ------------------------------------------------------------
    // 12. Parse JSON
    // ------------------------------------------------------------
    let analysis: any

    try {
      let cleanedText = String(responseText).trim()

      // Defensive cleanup in case the model still returns
      // Markdown code fences.
      cleanedText = cleanedText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim()

      analysis = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error("Failed to parse AI JSON:", parseError)
      console.error("Raw AI response:", responseText)

      return NextResponse.json(
        {
          success: false,
          error: "AI returned an invalid analysis format.",
        },
        { status: 502 }
      )
    }

    // ------------------------------------------------------------
    // 13. Basic response validation
    // ------------------------------------------------------------
    if (
      typeof analysis.disease_detected !== "boolean" ||
      typeof analysis.disease_name !== "string" ||
      typeof analysis.confidence !== "number" ||
      typeof analysis.severity !== "string"
    ) {
      console.error("Invalid analysis structure:", analysis)

      return NextResponse.json(
        {
          success: false,
          error: "AI returned an incomplete analysis.",
        },
        { status: 502 }
      )
    }

    // ------------------------------------------------------------
    // 14. Return successful result
    // ------------------------------------------------------------
    const processingTimeMs = Date.now() - startTime

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        processingTimeMs,
      },
    })
  } catch (error) {
    console.error("========== ANALYSIS SERVER ERROR ==========")
    console.error(error)
    console.error("============================================")

    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze image. Please try again.",
      },
      { status: 500 }
    )
  }
}
