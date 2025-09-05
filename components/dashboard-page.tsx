"use client"

import { useState } from "react"
import { GreenlightLogo } from "@/components/logo"

interface AnalysisData {
  status: "red" | "yellow" | "green"
  message: string
  details: string[]
  score: number
  recommendations: string[]
}

interface DashboardPageProps {
  analysisData: AnalysisData | null
  onViewResults: () => void
  onReset: () => void
  onViewProfile: () => void
}

type DashboardSection = "overview" | "analytics" | "optimization" | "progress"

export function DashboardPage({ analysisData, onViewResults, onReset, onViewProfile }: DashboardPageProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview")
  const [clickedSection, setClickedSection] = useState<DashboardSection | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "red":
        return "#ef4444"
      case "yellow":
        return "#eab308"
      case "green":
        return "#22c55e"
      default:
        return "#6b7280"
    }
  }

  const handleSectionClick = (section: DashboardSection) => {
    setClickedSection(section)
    setActiveSection(section)
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case "analytics":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-apple-slide-up">
            <h3 className="text-2xl font-light text-gray-900 mb-6">Analytics Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Resume Performance</h4>
                <p className="text-gray-600">Detailed metrics and performance indicators for your resume.</p>
                <div className="mt-4 text-sm text-gray-500">Coming soon...</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Industry Benchmarks</h4>
                <p className="text-gray-600">Compare your resume against industry standards.</p>
                <div className="mt-4 text-sm text-gray-500">Coming soon...</div>
              </div>
            </div>
          </div>
        )
      case "optimization":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-apple-slide-up">
            <h3 className="text-2xl font-light text-gray-900 mb-6">Optimization Tools</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Suggestions</h4>
                <p className="text-gray-600">Get personalized recommendations to improve your resume.</p>
                <div className="mt-4 text-sm text-gray-500">Coming soon...</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Keyword Optimization</h4>
                <p className="text-gray-600">Optimize your resume for ATS systems and job descriptions.</p>
                <div className="mt-4 text-sm text-gray-500">Coming soon...</div>
              </div>
            </div>
          </div>
        )
      case "progress":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-apple-slide-up">
            <h3 className="text-2xl font-light text-gray-900 mb-6">Progress Tracking</h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Improvement Timeline</h4>
              <p className="text-gray-600">Track your resume improvements and version history over time.</p>
              <div className="mt-4 text-sm text-gray-500">Coming soon...</div>
            </div>
          </div>
        )
      default:
        return (
          <>
            {analysisData && (
              <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg animate-apple-slide-up">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-6 h-6 rounded-full animate-apple-pulse"
                    style={{ backgroundColor: getStatusColor(analysisData.status) }}
                  ></div>
                  <h2 className="text-2xl font-light text-gray-900">Latest Analysis Complete</h2>
                </div>
                <p className="text-gray-600 mb-6">{analysisData.message}</p>
                <div className="flex gap-4">
                  <button
                    onClick={onViewResults}
                    className="px-6 py-3 text-white font-medium rounded-lg apple-button-hover apple-interactive"
                    style={{ backgroundColor: "#40912F" }}
                  >
                    View Detailed Results
                  </button>
                  <button
                    onClick={onReset}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg apple-button-hover apple-interactive hover:bg-gray-200"
                  >
                    New Analysis
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-apple-slide-up-delay">
              <div
                onClick={() => handleSectionClick("analytics")}
                className={`bg-white rounded-2xl p-8 shadow-lg apple-card-hover apple-interactive cursor-pointer transition-all duration-300 ${
                  clickedSection === "analytics" ? "ring-2 ring-green-500 transform scale-105" : ""
                }`}
              >
                <div className="w-12 h-12 mb-4 text-blue-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600">View detailed analytics and insights about your resume performance.</p>
                <div className="mt-4 text-sm text-green-600 font-medium">Click to explore →</div>
              </div>

              <div
                onClick={() => handleSectionClick("optimization")}
                className={`bg-white rounded-2xl p-8 shadow-lg apple-card-hover apple-interactive cursor-pointer transition-all duration-300 ${
                  clickedSection === "optimization" ? "ring-2 ring-green-500 transform scale-105" : ""
                }`}
              >
                <div className="w-12 h-12 mb-4 text-red-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimization</h3>
                <p className="text-gray-600">Get personalized recommendations to improve your resume.</p>
                <div className="mt-4 text-sm text-green-600 font-medium">Click to explore →</div>
              </div>

              <div
                onClick={() => handleSectionClick("progress")}
                className={`bg-white rounded-2xl p-8 shadow-lg apple-card-hover apple-interactive cursor-pointer transition-all duration-300 ${
                  clickedSection === "progress" ? "ring-2 ring-green-500 transform scale-105" : ""
                }`}
              >
                <div className="w-12 h-12 mb-4 text-green-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 7l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress</h3>
                <p className="text-gray-600">Track your resume improvements over time.</p>
                <div className="mt-4 text-sm text-green-600 font-medium">Click to explore →</div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <GreenlightLogo size="sm" />
              <nav className="flex items-center gap-2 text-sm text-gray-500">
                <button
                  onClick={() => setActiveSection("overview")}
                  className={`px-3 py-1 rounded-lg apple-interactive ${
                    activeSection === "overview" ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </button>
                {activeSection !== "overview" && (
                  <>
                    <span>/</span>
                    <span className="text-gray-900 capitalize">{activeSection}</span>
                  </>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onViewProfile}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 apple-interactive"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </button>
              <button onClick={onReset} className="px-4 py-2 text-gray-600 hover:text-gray-900 apple-interactive">
                New Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 animate-apple-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {activeSection === "overview"
              ? "Dashboard Overview"
              : `${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}`}
          </h1>
          <p className="text-gray-600">
            {activeSection === "overview"
              ? "Monitor your resume performance and access optimization tools"
              : `Manage your resume ${activeSection} and insights`}
          </p>
        </div>

        {renderSectionContent()}
      </div>
    </div>
  )
}
