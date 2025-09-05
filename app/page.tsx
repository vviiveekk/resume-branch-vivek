"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { AnalysisResults } from "@/components/analysis-results"

type Screen = "welcome" | "main" | "analyzing" | "results" | "error"

interface AnalysisData {
  status: "red" | "yellow" | "green"
  message: string
  details: string[]
  score: number
  recommendations: string[]
}

interface ErrorState {
  message: string
  canRetry: boolean
}

const FileTextIcon = () => (
  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
)

export default function ResumeAnalyzer() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<ErrorState | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (currentScreen === "welcome") {
      document.body.style.background = "#000000"
      document.body.style.color = "#ffffff"
    } else {
      document.body.style.background = ""
      document.body.style.color = ""
    }

    return () => {
      document.body.style.background = ""
      document.body.style.color = ""
    }
  }, [currentScreen])

  const handleContinue = () => {
    setCurrentScreen("main")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const resumeFile = files.find(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().includes(".pdf") ||
        file.name.toLowerCase().includes(".doc") ||
        file.name.toLowerCase().includes(".docx"),
    )

    if (resumeFile) {
      handleFileUpload(resumeFile)
    } else {
      setError({
        message: "Please upload a PDF or Word document (.pdf, .doc, .docx)",
        canRetry: true,
      })
      setCurrentScreen("error")
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleFileUpload = async (file: File) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const minSize = 1024 // 1KB

    if (file.size > maxSize) {
      setError({
        message: "File too large. Maximum size is 10MB.",
        canRetry: true,
      })
      setCurrentScreen("error")
      return
    }

    if (file.size < minSize) {
      setError({
        message: "File too small. Please upload a valid resume.",
        canRetry: true,
      })
      setCurrentScreen("error")
      return
    }

    setUploadedFile(file)
    setError(null)

    // Automatically start analysis
    await handleAnalyze(file)
  }

  const handleAnalyze = async (file?: File) => {
    const fileToAnalyze = file || uploadedFile
    if (!fileToAnalyze) return

    setIsAnalyzing(true)
    setCurrentScreen("analyzing")
    setError(null)

    await new Promise((resolve) => setTimeout(resolve, 3500))

    const formData = new FormData()
    formData.append("resume", fileToAnalyze)

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error occurred" }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()

      if (!result.status || !result.message) {
        throw new Error("Invalid response from analysis service")
      }

      setAnalysisData({
        status: result.status,
        message: result.message,
        details: result.details || [],
        score: result.score || 0,
        recommendations: result.recommendations || [],
      })
      setCurrentScreen("results")
    } catch (error) {
      console.error("[v0] Analysis failed:", error)
      setError({
        message: error instanceof Error ? error.message : "Analysis failed. Please try again.",
        canRetry: true,
      })
      setCurrentScreen("error")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetApp = () => {
    setCurrentScreen("welcome")
    setUploadedFile(null)
    setAnalysisData(null)
    setError(null)
    setIsAnalyzing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const retryFromError = () => {
    setError(null)
    setCurrentScreen("main")
  }

  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ backgroundColor: "#000000" }}>
        <div className="text-center animate-apple-fade-in">
          <h1
            className="text-6xl md:text-8xl font-light tracking-tight mb-12 animate-apple-slide-up drop-shadow-lg animate-apple-float"
            style={{ color: "#ffffff" }}
          >
            Welcome
          </h1>
          <button
            onClick={handleContinue}
            className="px-8 py-4 border border-white/20 rounded-full text-lg font-medium apple-glass apple-button-hover apple-interactive animate-apple-slide-up-delay text-white"
            style={{ backgroundColor: "#40912F" }}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  if (currentScreen === "analyzing") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#000000" }}>
        <div className="flex justify-center items-center gap-8 animate-apple-scale-in">
          <div
            className="w-20 h-20 rounded-full animate-apple-darkened-red"
            style={{
              animationDelay: "0s",
              background: "#7f1d1d",
            }}
          ></div>
          <div
            className="w-20 h-20 rounded-full animate-apple-darkened-yellow"
            style={{
              animationDelay: "0.7s",
              background: "#713f12",
            }}
          ></div>
          <div
            className="w-20 h-20 rounded-full animate-apple-darkened-green"
            style={{
              animationDelay: "1.4s",
              background: "#14532d",
            }}
          ></div>
        </div>
      </div>
    )
  }

  if (currentScreen === "error" && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-500 text-white p-8">
        <div className="text-center max-w-2xl animate-apple-scale-in">
          <AlertTriangleIcon className="w-16 h-16 mx-auto mb-8 animate-apple-pulse" />
          <h2 className="text-4xl font-light mb-6 animate-apple-slide-up">Oops! Something went wrong</h2>
          <p className="text-xl mb-12 opacity-90 animate-apple-slide-up-delay">{error.message}</p>
          <div className="flex gap-4 justify-center">
            {error.canRetry && (
              <button
                onClick={retryFromError}
                className="px-8 py-4 apple-glass border border-white/30 rounded-full text-lg font-medium apple-button-hover apple-interactive animate-apple-slide-up-delay"
              >
                Try Again
              </button>
            )}
            <button
              onClick={resetApp}
              className="px-8 py-4 bg-white/10 border border-white/20 rounded-full text-lg font-medium apple-button-hover apple-interactive animate-apple-slide-up-delay"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "results" && analysisData) {
    return (
      <AnalysisResults
        status={analysisData.status}
        message={analysisData.message}
        details={analysisData.details}
        score={analysisData.score}
        recommendations={analysisData.recommendations}
        onReset={resetApp}
      />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#1F1F1F" }}>
      <div className="w-full max-w-2xl text-center animate-apple-fade-in">
        <h1 className="text-4xl md:text-6xl font-light text-white mb-16 animate-apple-slide-up animate-apple-float">
          Drop your resume below
        </h1>

        <div
          className={`
            border-2 border-dashed border-white/30 rounded-3xl p-12 cursor-pointer
            apple-card-hover apple-interactive min-h-[200px] flex items-center justify-center
            animate-apple-slide-up-delay
            ${isDragOver ? "border-white border-solid animate-apple-pulse animate-apple-glow" : ""}
            ${uploadedFile ? "border-white border-solid animate-apple-glow" : ""}
          `}
          style={{ backgroundColor: "#40912F" }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!uploadedFile ? (
            <div className="text-white text-center">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="text-2xl font-medium mb-2">
                {isDragOver ? "Release to upload" : "Drop your resume here"}
              </div>
              <div className="text-white/80">or click to browse</div>
              <div className="text-sm text-white/60 mt-4">Supports PDF, DOC, and DOCX files (max 10MB)</div>
            </div>
          ) : (
            <div className="text-white text-center">
              <FileTextIcon />
              <div className="text-xl font-semibold mb-2 break-words">{uploadedFile.name}</div>
              <div className="text-white/80">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
