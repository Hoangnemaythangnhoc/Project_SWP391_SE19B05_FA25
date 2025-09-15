import React, { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      if (authService.isAuthenticated()) {
        const result = await authService.getCurrentUser()
        if (result.success) {
          setUser(result.data)
          setIsAuthenticated(true)
        } else {
          // Token might be invalid, clear it
          authService.clearTokens()
          setIsAuthenticated(false)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      authService.clearTokens()
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password, rememberMe = false) => {
    try {
      const result = await authService.login(email, password, rememberMe)
      if (result.success) {
        setUser(result.data.user)
        setIsAuthenticated(true)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'Có lỗi xảy ra, vui lòng thử lại' }
    }
  }

  const register = async (userData) => {
    try {
      const result = await authService.register(userData)
      if (result.success) {
        setUser(result.data.user)
        setIsAuthenticated(true)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'Có lỗi xảy ra, vui lòng thử lại' }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const hasRole = (role) => {
    return user && user.roles && user.roles.includes(role)
  }

  const isAdmin = () => hasRole('ADMIN')
  const isFieldOwner = () => hasRole('FIELD_OWNER')
  const isUser = () => hasRole('USER')

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    hasRole,
    isAdmin,
    isFieldOwner,
    isUser,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


