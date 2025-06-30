"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const storedAuthState = localStorage.getItem("vl-auth-state")
        if (storedAuthState) {
          const authState = JSON.parse(storedAuthState)
          if (authState && authState.user && authState.token && authState.expiresAt) {
            // Check if token is expired
            if (Date.now() < authState.expiresAt) {
              console.log("User already logged in, redirecting to dashboard...")
              console.log("Token expires at:", new Date(authState.expiresAt).toLocaleTimeString())
              router.push("/dashboard")
            } else {
              console.log("Stored token expired, removing...")
              localStorage.removeItem("vl-auth-state")
            }
          }
        }
      } catch (error) {
        console.error("Error checking existing auth:", error)
        localStorage.removeItem("vl-auth-state")
      }
    }

    checkExistingAuth()
  }, [router])

  // Standalone login function that doesn't depend on AuthProvider
  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    console.log("Attempting login with username:", username)

    // Simple authentication for demo purposes
    if (username === "admin" && password === "Secret") {
      // Generate token with expiration
      const token = `${username}_${Math.random().toString(36).substring(2)}_${Date.now()}`
      const expiresAt = Date.now() + 30 * 60 * 1000 // 30 minutes

      const authState = {
        user: { username, isAdmin: true },
        token,
        expiresAt,
      }

      localStorage.setItem("vl-auth-state", JSON.stringify(authState))
      console.log("Login successful, token stored in localStorage")
      console.log("Token expires at:", new Date(expiresAt).toLocaleTimeString())
      return true
    }

    console.log("Login failed: Invalid credentials")
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    console.log("Login form submitted")

    try {
      const success = await handleLogin(username, password)
      if (success) {
        setSuccess("Login successful! Redirecting to dashboard...")
        console.log("Redirecting to dashboard...")

        // Small delay to show success message
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1000)
      } else {
        setError("Invalid username or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8 bg-white rounded-lg p-6 shadow-lg">
          <Image
            src="/VL_logo.svg"
            alt="Victoria Lancaster Real Estate"
            width={200}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-vl-blue">Admin Dashboard</h1>
        </div>

        <Card className="bg-white border-0 shadow-2xl">
          <CardHeader className="bg-white">
            <CardTitle className="text-vl-blue text-center">Login</CardTitle>
            <CardDescription className="text-accessible-secondary text-center">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 bg-white">
              {error && (
                <div className="bg-red-50 p-3 rounded-md flex items-center text-red-800 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 p-3 rounded-md flex items-center text-green-800 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {success}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-vl-blue font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                   className="bg-white text-black border border-vl-blue rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-vl-yellow focus:border-vl-yellow"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-vl-blue font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                   className="bg-white text-black border border-vl-blue rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-vl-yellow focus:border-vl-yellow"
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-white">
              <Button type="submit" className="w-full bg-vl-blue hover:bg-vl-blue-dark" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center text-sm bg-white rounded-lg p-4 shadow-md">
          <p className="font-semibold mb-2 text-vl-blue">Demo Credentials:</p>
          <div className="space-y-1">
            <p className="text-accessible-secondary">
              Username: <span className="font-mono bg-blue-50 text-vl-blue px-2 py-1 rounded">admin</span>
            </p>
            <p className="text-accessible-secondary">
              Password: <span className="font-mono bg-blue-50 text-vl-blue px-2 py-1 rounded">Secret</span>
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200 text-xs">
            <div className="flex items-center justify-center gap-1 text-accessible-secondary">
              <Clock className="h-3 w-3" />
              <span>Sessions expire after 30 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
