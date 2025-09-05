"use client"

export function AnalyzingPage() {
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
