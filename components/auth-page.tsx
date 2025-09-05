"use client"

import type React from "react"
import { useState } from "react"
import { authService } from "@/lib/auth"

interface AuthPageProps {
  onAuthComplete: (demoMode?: boolean) => void
}

export function AuthPage({ onAuthComplete }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      let user
      if (isSignUp) {
        user = await authService.signUp(email, password, name)
      } else {
        user = await authService.signIn(email, password)
      }

      authService.storeUser(user)
      onAuthComplete(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemo = () => {
    onAuthComplete(true)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="max-w-md w-full space-y-8 animate-apple-fade-in">
        <div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="flex flex-col items-center gap-2 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500/30 border border-red-500/50"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-500/30 border border-yellow-500/50"></div>
                    <div className="w-4 h-4 rounded-full bg-green-500 border border-green-400 animate-apple-pulse shadow-lg shadow-green-500/50"></div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-green-500">Greenlight</h2>
          </div>
          <h2 className="mt-6 text-center text-3xl font-light text-white">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-white/70">
            {isSignUp
              ? "Join thousands of professionals improving their resumes"
              : "Welcome back! Continue your resume optimization journey"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-apple-slide-up">
            <div className="flex">
              <div className="text-red-400">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 apple-interactive"
                  placeholder="Full name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 apple-interactive"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 apple-interactive"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-white font-medium rounded-lg apple-button-hover apple-interactive focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#40912F" }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isSignUp ? "Creating account..." : "Signing in..."}
                </div>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>

            <button
              type="button"
              onClick={handleDemo}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg bg-white apple-button-hover apple-interactive focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              Continue as Demo
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
              }}
              disabled={isLoading}
              className="text-green-600 hover:text-green-500 font-medium apple-interactive disabled:opacity-50"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="text-center text-sm text-white/50">
              <p className="mb-4">Why create an account?</p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Save your analysis history</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Track improvements over time</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Access premium features</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
