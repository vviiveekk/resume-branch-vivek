"use client"

import { useState, useEffect } from "react"
import { WelcomePage } from "@/components/welcome-page"
import { AuthPage } from "@/components/auth-page"
import { UploadPage } from "@/components/upload-page"
import { AnalyzingPage } from "@/components/analyzing-page"
import { DashboardPage } from "@/components/dashboard-page"
import { ResultsPage } from "@/components/results-page"
import { ErrorPage } from "@/components/error-page"
import { UserProfile } from "@/components/user-profile"

type Screen = "welcome" | "auth" | "upload" | "analyzing" | "dashboard" | "results" | "error" | "profile"

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

export default function ResumeAnalyzer() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<ErrorState | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    const body = document.body
    if (currentScreen === "welcome" || currentScreen === "analyzing") {
      body.style.background = "#000000"
      body.style.color = "#ffffff"
    } else if (currentScreen === "upload") {
      body.style.background = "#1F1F1F"
      body.style.color = "#ffffff"
    } else if (currentScreen === "results") {
      body.style.background = "#1F1F1F"
      body.style.color = "#ffffff"
    } else if (currentScreen === "profile") {
      body.style.background = "#1F1F1F"
      body.style.color = "#ffffff"
    } else {
      body.style.background = ""
      body.style.color = ""
    }

    return () => {
      body.style.background = ""
      body.style.color = ""
    }
  }, [currentScreen])

  const handleContinue = () => {
    setCurrentScreen("auth")
  }

  const handleAuthComplete = (demoMode = false) => {
    setIsDemo(demoMode)
    setCurrentScreen("upload")
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
    await handleAnalyze(file)
  }

  const handleAnalyze = async (file?: File) => {
    const fileToAnalyze = file || uploadedFile
    if (!fileToAnalyze) return

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
      setCurrentScreen("dashboard")
    } catch (error) {
      console.error("[v0] Analysis failed:", error)
      setError({
        message: error instanceof Error ? error.message : "Analysis failed. Please try again.",
        canRetry: true,
      })
      setCurrentScreen("error")
    }
  }

  const handleViewResults = () => {
    setCurrentScreen("results")
  }

  const resetApp = () => {
    setCurrentScreen("welcome")
    setUploadedFile(null)
    setAnalysisData(null)
    setError(null)
    setIsDemo(false)
  }

  const retryFromError = () => {
    setError(null)
    setCurrentScreen("upload")
  }

  const handleViewProfile = () => {
    setCurrentScreen("profile")
  }

  const handleBackFromProfile = () => {
    setCurrentScreen("dashboard")
  }

  const handleSignOutFromProfile = () => {
    resetApp()
  }

  switch (currentScreen) {
    case "welcome":
      return <WelcomePage onContinue={handleContinue} />
    case "auth":
      return <AuthPage onAuthComplete={handleAuthComplete} />
    case "upload":
      return <UploadPage onFileUpload={handleFileUpload} />
    case "analyzing":
      return <AnalyzingPage />
    case "dashboard":
      return (
        <DashboardPage
          analysisData={analysisData}
          onViewResults={handleViewResults}
          onReset={resetApp}
          onViewProfile={handleViewProfile}
        />
      )
    case "results":
      return <ResultsPage analysisData={analysisData} onReset={resetApp} />
    case "error":
      return <ErrorPage error={error} onRetry={retryFromError} onReset={resetApp} />
    case "profile":
      return <UserProfile onBack={handleBackFromProfile} onSignOut={handleSignOutFromProfile} />
    default:
      return <WelcomePage onContinue={handleContinue} />
  }
}
