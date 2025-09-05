import { type NextRequest, NextResponse } from "next/server"
import { ResumeAnalyzer } from "@/lib/resume-analyzer"

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MIN_FILE_SIZE = 1024 // 1KB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type) && !isValidFileExtension(file.name)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Please upload a PDF, DOC, or DOCX file.",
        },
        { status: 400 },
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File too large. Maximum size is 10MB.",
        },
        { status: 400 },
      )
    }

    if (file.size < MIN_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File too small. Please upload a valid resume.",
        },
        { status: 400 },
      )
    }

    const buffer = await file.arrayBuffer()
    const fileContent = Buffer.from(buffer)

    console.log(`[v0] Processing file: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}`)

    const analysisResult = await ResumeAnalyzer.analyzeResume(file, fileContent)

    // Simulate processing time for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(`[v0] Analysis complete for ${file.name}: ${analysisResult.status} (Score: ${analysisResult.score})`)

    return NextResponse.json({
      status: analysisResult.status,
      message: analysisResult.message,
      details: analysisResult.details,
      score: analysisResult.score,
      recommendations: analysisResult.recommendations,
      fileName: file.name,
      fileSize: file.size,
    })
  } catch (error) {
    console.error("[v0] Analysis error:", error)
    return NextResponse.json(
      {
        error: "Analysis failed. Please try again.",
      },
      { status: 500 },
    )
  }
}

function isValidFileExtension(fileName: string): boolean {
  const validExtensions = [".pdf", ".doc", ".docx"]
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf("."))
  return validExtensions.includes(extension)
}
