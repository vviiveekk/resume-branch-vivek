"use client"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function GreenlightLogo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="flex flex-col items-center gap-1 p-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/30 border border-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/30 border border-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 border border-green-400 animate-apple-pulse shadow-sm shadow-green-500/50"></div>
          </div>
        </div>
      </div>

      {showText && <span className={`font-light text-green-500 tracking-wide ${textSizes[size]}`}>Greenlight</span>}
    </div>
  )
}

export { GreenlightLogo as Logo }
