import { cn } from "@/lib/utils"

interface TrafficLightProps {
  status: "red" | "yellow" | "green"
  className?: string
}

export function TrafficLight({ status, className }: TrafficLightProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Traffic Light Container */}
      <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl border-4 border-gray-700">
        <div className="flex flex-col gap-3">
          {/* Red Light */}
          <div
            className={cn(
              "w-12 h-12 rounded-full border-2 transition-all duration-500",
              status === "red"
                ? "bg-red-500 border-red-400 shadow-lg shadow-red-500/50 animate-pulse"
                : "bg-red-900/30 border-red-800/50",
            )}
          />

          {/* Yellow Light */}
          <div
            className={cn(
              "w-12 h-12 rounded-full border-2 transition-all duration-500",
              status === "yellow"
                ? "bg-yellow-500 border-yellow-400 shadow-lg shadow-yellow-500/50 animate-pulse"
                : "bg-yellow-900/30 border-yellow-800/50",
            )}
          />

          {/* Green Light */}
          <div
            className={cn(
              "w-12 h-12 rounded-full border-2 transition-all duration-500",
              status === "green"
                ? "bg-green-500 border-green-400 shadow-lg shadow-green-500/50 animate-pulse"
                : "bg-green-900/30 border-green-800/50",
            )}
          />
        </div>
      </div>

      {/* Status Label */}
      <div className="text-center">
        <div
          className={cn(
            "text-sm font-medium px-3 py-1 rounded-full",
            status === "red" && "bg-red-100 text-red-800",
            status === "yellow" && "bg-yellow-100 text-yellow-800",
            status === "green" && "bg-green-100 text-green-800",
          )}
        >
          {status === "red" && "At Risk"}
          {status === "yellow" && "Needs Work"}
          {status === "green" && "Good to Go"}
        </div>
      </div>
    </div>
  )
}
