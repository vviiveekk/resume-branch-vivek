"use client"

interface WelcomePageProps {
  onContinue: () => void
}

export function WelcomePage({ onContinue }: WelcomePageProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-20 text-white relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full animate-apple-float"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-green-500/3 rounded-full animate-apple-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="text-center animate-apple-fade-in relative z-10">
        <div className="mb-4 animate-apple-slide-up">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              {/* Traffic light icon with glowing effect */}
              <div className="flex flex-col items-center gap-2 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500/30 border border-red-500/50"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500/30 border border-yellow-500/50"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500 border border-green-400 animate-apple-pulse shadow-lg shadow-green-500/50"></div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-green-500 mb-2 tracking-wide">Greenlight</h2>
          <p className="text-lg text-white/70 max-w-md mx-auto leading-relaxed">
            AI-powered resume analysis that gives you the green light for your dream job
          </p>
        </div>

        <h1
          className="text-6xl md:text-8xl font-light tracking-tight mb-4 animate-apple-slide-up drop-shadow-lg animate-apple-float"
          style={{ color: "#ffffff" }}
        >
          Welcome
        </h1>

        <div className="space-y-4">
          <button
            onClick={onContinue}
            className="px-12 py-4 border border-white/20 rounded-full text-xl font-medium apple-glass apple-button-hover apple-interactive animate-apple-slide-up-delay text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
            style={{ backgroundColor: "#40912F" }}
          >
            Get Started
          </button>

          <div className="flex items-center justify-center gap-8 text-sm text-white/50 animate-apple-slide-up-delay">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>AI Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Expert Tips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
