export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock authentication functions - ready for real implementation
export const authService = {
  async signIn(email: string, password: string): Promise<User> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email && password.length >= 6) {
      return {
        id: "1",
        email,
        name: email.split("@")[0],
        createdAt: new Date(),
      }
    }
    throw new Error("Invalid credentials")
  },

  async signUp(email: string, password: string, name?: string): Promise<User> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Mock validation
    if (email && password.length >= 6) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: name || email.split("@")[0],
        createdAt: new Date(),
      }
    }
    throw new Error("Registration failed")
  },

  async signOut(): Promise<void> {
    // Clear any stored auth tokens
    localStorage.removeItem("auth_token")
  },

  async getCurrentUser(): Promise<User | null> {
    // Check for stored auth token
    const token = localStorage.getItem("auth_token")
    if (token) {
      // In real implementation, validate token with backend
      const userData = JSON.parse(token)
      return {
        ...userData,
        createdAt: new Date(userData.createdAt),
      }
    }
    return null
  },

  storeUser(user: User): void {
    localStorage.setItem("auth_token", JSON.stringify(user))
  },
}
