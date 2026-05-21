import { NextRequest, NextResponse } from "next/server"
import type { WeatherData } from "@/lib/types"

export const runtime = "edge"

// Calculate disease risk based on weather conditions
function calculateDiseaseRisk(humidity: number, temp: number, rainfall: number): string {
  if (humidity > 80 && temp > 25) {
    return "HIGH - Fungal disease conditions present"
  }
  if (humidity > 70 && rainfall > 0) {
    return "MEDIUM - Monitor crops closely"
  }
  if (humidity > 60 || (temp > 30 && humidity > 50)) {
    return "LOW-MEDIUM - Some risk factors present"
  }
  return "LOW - Favorable conditions"
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")

    if (!lat || !lon) {
      return NextResponse.json(
        { success: false, error: "Latitude and longitude are required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENWEATHER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Weather service not configured" },
        { status: 500 }
      )
    }

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )

    if (!weatherResponse.ok) {
      const errorText = await weatherResponse.text()
      console.error("OpenWeather API error:", errorText)
      return NextResponse.json(
        { success: false, error: "Failed to fetch weather data" },
        { status: 500 }
      )
    }

    const weather = await weatherResponse.json()

    const humidity = weather.main?.humidity || 0
    const temperature = weather.main?.temp || 0
    const rainfall = weather.rain?.["1h"] || weather.rain?.["3h"] || 0

    const weatherData: WeatherData = {
      temperature: Math.round(temperature * 10) / 10,
      humidity: humidity,
      rainfall: rainfall,
      windSpeed: Math.round((weather.wind?.speed || 0) * 10) / 10,
      condition: weather.weather?.[0]?.description || "Unknown",
      diseaseRiskLevel: calculateDiseaseRisk(humidity, temperature, rainfall),
      icon: weather.weather?.[0]?.icon || "01d",
    }

    return NextResponse.json({
      success: true,
      data: weatherData,
    })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch weather data" },
      { status: 500 }
    )
  }
}
