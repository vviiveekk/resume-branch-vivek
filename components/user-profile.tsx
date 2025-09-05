"use client"

import { useState, useEffect } from "react"
import { authService, type User } from "@/lib/auth"
import { Logo } from "@/components/logo"

interface UserProfileProps {
  onBack: () => void
  onSignOut: () => void
}

export function UserProfile({ onBack, onSignOut }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await authService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        setEditForm({
          name: currentUser.name,
          email: currentUser.email,
        })
      }
    }
    loadUser()
  }, [])

  const handleSaveProfile = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = {
        ...user,
        name: editForm.name,
        email: editForm.email,
      }

      authService.storeUser(updatedUser)
      setUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await authService.signOut()
    onSignOut()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-32 right-16 w-24 h-24 bg-green-400/5 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300/8 rounded-full blur-md animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <Logo />
        </div>

        {/* Profile Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 animate-fade-in">Profile</h1>
              <p className="text-gray-400 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Manage your account settings
              </p>
            </div>

            <div
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Profile Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Profile Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-white">{user.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-white">{user.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Member Since</label>
                  <div className="px-4 py-3 bg-gray-800/30 rounded-xl text-white">
                    {user.createdAt instanceof Date
                      ? user.createdAt.toLocaleDateString()
                      : new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Edit Profile
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
