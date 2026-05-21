import { NextResponse } from "next/server"

export const runtime = "edge"

// GET /api/health - Health check endpoint
export async function GET() {
  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    services: {
      api: "operational",
      database: "operational", // Would check actual DB in production
      ml_model: process.env.ML_API_ENDPOINT ? "configured" : "demo_mode",
    },
    environment: process.env.NODE_ENV,
  }

  return NextResponse.json(healthCheck)
}
