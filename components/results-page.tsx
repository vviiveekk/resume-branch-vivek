"use client"

import { GreenlightLogo } from "@/components/logo"

interface AnalysisData {
  status: "red" | "yellow" | "green"
  message: string
  details: string[]
  score: number
  recommendations: string[]
}

interface ResultsPageProps {
  analysisData: AnalysisData | null
  onReset: () => void
}

export function ResultsPage({ analysisData, onReset }: ResultsPageProps) {
  if (!analysisData) return null

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

  const goodQualities = analysisData.details.filter(
    (detail) =>
      detail.toLowerCase().includes("good") ||
      detail.toLowerCase().includes("strong") ||
      detail.toLowerCase().includes("excellent") ||
      detail.toLowerCase().includes("professional") ||
      detail.toLowerCase().includes("clear") ||
      detail.toLowerCase().includes("well") ||
      detail.toLowerCase().includes("appropriate"),
  )

  const poorQualities = analysisData.details.filter((detail) => !goodQualities.includes(detail))

  // If no clear split, use first half as good, second half as poor
  const finalGoodQualities =
    goodQualities.length > 0 ? goodQualities : analysisData.details.slice(0, Math.ceil(analysisData.details.length / 2))
  const finalPoorQualities =
    poorQualities.length > 0 ? poorQualities : analysisData.details.slice(Math.ceil(analysisData.details.length / 2))

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1F1F1F" }}>
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <GreenlightLogo size="sm" />
            <button onClick={onReset} className="px-4 py-2 text-white/70 hover:text-white apple-interactive">
              New Analysis
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 animate-apple-results-entrance">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          {/* Left side - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top left - Split box for good and poor qualities */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden animate-apple-stagger-1 apple-results-card h-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Top half - Good qualities */}
                <div className="p-6 border-r border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-apple-pulse"></div>
                    <h2 className="text-lg font-semibold text-white">Good Qualities</h2>
                  </div>
                  <div className="space-y-3 overflow-y-auto max-h-[calc(100%-60px)]">
                    {finalGoodQualities.map((quality, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-green-300 animate-apple-text-reveal"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{quality}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom half - Poor qualities */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-apple-pulse"></div>
                    <h2 className="text-lg font-semibold text-white">Areas for Improvement</h2>
                  </div>
                  <div className="space-y-3 overflow-y-auto max-h-[calc(100%-60px)]">
                    {finalPoorQualities.map((quality, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-red-300 animate-apple-text-reveal"
                        style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{quality}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom left - Recommendations */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 animate-apple-stagger-2 apple-results-card h-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl animate-apple-icon-bounce">💡</div>
                <h2 className="text-xl font-semibold text-white">Recommendations</h2>
              </div>
              <div className="space-y-4 overflow-y-auto max-h-[calc(100%-80px)]">
                {analysisData.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl animate-apple-text-reveal"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-blue-300 leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 animate-apple-stagger-4 apple-results-card h-full">
              <h3 className="text-lg font-semibold text-white mb-6 text-center">Actions</h3>
              <div className="space-y-4 h-[calc(100%-60px)] flex flex-col">
                {/* First 3 buttons */}
                <button className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl apple-button-hover apple-interactive font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <span>📊</span>
                    <span>Export Report</span>
                  </div>
                </button>

                <button className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl apple-button-hover apple-interactive font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <span>🔗</span>
                    <span>Share Results</span>
                  </div>
                </button>

                <button
                  onClick={onReset}
                  className="w-full py-4 px-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl apple-button-hover apple-interactive font-medium shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>🔄</span>
                    <span>New Analysis</span>
                  </div>
                </button>

                {/* 4th button - Text input box at bottom */}
                <div className="flex-1 flex flex-col justify-end">
                  <div className="space-y-3">
                    <label className="text-white text-sm font-medium">Quick Note:</label>
                    <textarea
                      className="w-full p-4 bg-white/20 text-white placeholder-white/60 rounded-xl border border-white/30 focus:border-white/60 focus:outline-none resize-none apple-interactive backdrop-blur-sm"
                      placeholder="Add your thoughts or notes about this analysis..."
                      rows={4}
                    />
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl apple-button-hover apple-interactive font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                      <div className="flex items-center justify-center gap-2">
                        <span>💾</span>
                        <span>Save Note</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator at bottom */}
        <div className="text-center mt-8">
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium animate-apple-card-float shadow-2xl"
            style={{ backgroundColor: getStatusColor(analysisData.status) }}
          >
            <div className="w-4 h-4 rounded-full bg-white/80 animate-apple-pulse"></div>
            <span className="text-lg">{analysisData.message}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
