import { create } from 'zustand'
import { authApi } from '../api/auth'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const data = await authApi.login(email, password)
      const token = data.token || data.access_token
      
      if (token) {
        localStorage.setItem('auth_token', token)
        set({ 
          token, 
          isAuthenticated: true,
          user: data.user,
          loading: false 
        })
        return { success: true }
      } else {
        set({ loading: false, error: 'No token received' })
        return { success: false, error: 'No token received' }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      set({ loading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null })
    try {
      const data = await authApi.register(userData)
      set({ loading: false })
      return { success: true, data }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      set({ loading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  logout: async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      })
    }
  },

  fetchUser: async () => {
    set({ loading: true })
    try {
      const data = await authApi.me()
      set({ user: data.user, loading: false })
    } catch (error) {
      set({ loading: false, error: error.message })
    }
  },

  clearError: () => set({ error: null }),
}))
