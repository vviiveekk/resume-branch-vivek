"use client"

import { TrafficLight } from "./traffic-light"

interface AnalysisResultsProps {
  status: "red" | "yellow" | "green"
  message: string
  details: string[]
  score: number
  recommendations: string[]
  onReset: () => void
}

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
)

export function AnalysisResults({ status, message, details, score, recommendations, onReset }: AnalysisResultsProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "red":
        return {
          textColor: "text-white",
          icon: XCircleIcon,
          title: "At Risk",
        }
      case "yellow":
        return {
          textColor: "text-white",
          icon: AlertCircleIcon,
          title: "Needs Work",
        }
      case "green":
        return {
          textColor: "text-white",
          icon: CheckCircleIcon,
          title: "Good to Go",
        }
    }
  }

  const config = getStatusConfig()
  const StatusIcon = config.icon

  return (
    <div
      className={`min-h-screen ${config.textColor} p-8 animate-apple-results-entrance`}
      style={{ backgroundColor: "#1F1F1F" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8 animate-apple-stagger-1">
            <TrafficLight status={status} />
          </div>

          <div className="flex items-center justify-center gap-4 mb-6 animate-apple-stagger-2">
            <StatusIcon className="w-12 h-12 animate-apple-icon-bounce" />
            <h1 className="text-5xl font-light animate-apple-text-reveal">{config.title}</h1>
          </div>

          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-4 animate-apple-stagger-3 animate-apple-text-reveal">
            {message}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Analysis Details */}
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm apple-results-card animate-apple-stagger-3 animate-apple-card-float">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <StatusIcon className="w-6 h-6 animate-apple-pulse" />
              Analysis Details
            </h3>
            <ul className="space-y-3">
              {details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 animate-apple-text-reveal"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0 animate-apple-pulse" />
                  <span className="text-white/90">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div
            className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm apple-results-card animate-apple-stagger-4 animate-apple-card-float"
            style={{ animationDelay: "0.5s" }}
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <LightbulbIcon className="w-6 h-6 animate-apple-pulse" />
              Recommendations
            </h3>
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 animate-apple-text-reveal"
                  style={{ animationDelay: `${0.2 + 0.1 * index}s` }}
                >
                  <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0 animate-apple-pulse" />
                  <span className="text-white/90">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center animate-apple-stagger-4">
          <button
            onClick={onReset}
            className="px-12 py-4 bg-white/20 border border-white/30 rounded-full text-lg font-medium backdrop-blur-sm apple-button-hover apple-interactive hover:bg-white/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:scale-105"
          >
            Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  )
}
