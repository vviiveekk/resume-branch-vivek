"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { authService, type AuthState } from "@/lib/auth"

const AuthContext = createContext<{
  authState: AuthState
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
} | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const refreshUser = async () => {
    try {
      const user = await authService.getCurrentUser()
      setAuthState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      })
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }

  const signOut = async () => {
    await authService.signOut()
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return <AuthContext.Provider value={{ authState, signOut, refreshUser }}>{children}</AuthContext.Provider>
}
