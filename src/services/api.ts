import axios from "axios"

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/auth"
    }
    return Promise.reject(error)
  },
)

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })
    const { token, user } = response.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    return user
  },

  register: async (userData: { name: string; email: string; password: string; role: string }) => {
    const response = await api.post("/auth/register", userData)
    const { token, user } = response.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    return user
  },

  logout: async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return true
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("token")
    if (!token) return null

    try {
      const response = await api.get("/auth/me")
      return response.data
    } catch (error) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return null
    }
  },
}

// User services
export const userService = {
  getUsers: async () => {
    const response = await api.get("/users")
    return response.data
  },

  getUserById: async (userId: number) => {
    const response = await api.get(`/users?userId=${userId}`)
    return response.data
  },

  updateUser: async (userId: number, userData: any) => {
    const response = await api.put(`/users/${userId}`, userData)
    return response.data
  },

  deleteUser: async (userId: number) => {
    const response = await api.delete(`/users/${userId}`)
    return response.data
  },
}

// Request services
export const requestService = {
  getRequests: async (filters = {}) => {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value as string)
    })

    const response = await api.get(`/customization-requests?${queryParams}`)
    return response.data
  },

  getRequestById: async (requestId: string) => {
    const response = await api.get(`/customization-requests?requestId=${requestId}`)
    return response.data
  },

  createRequest: async (requestData: any) => {
    const response = await api.post("/customization-requests", requestData)
    return response.data
  },

  updateRequest: async (requestId: string, requestData: any) => {
    const response = await api.put(`/customization-requests/${requestId}`, requestData)
    return response.data
  },

  deleteRequest: async (requestId: number) => {
    const response = await api.delete(`/customization-requests/${requestId}`)
    return response.data
  },
}

// Proposal services
export const proposalService = {
  getProposals: async (filters = {}) => {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value as string)
    })

    const response = await api.get(`/designer-proposals?${queryParams}`)
    return response.data
  },

  createProposal: async (proposalData: any) => {
    const response = await api.post("/designer-proposals", proposalData)
    return response.data
  },

  updateProposal: async (proposalId: string, proposalData: any) => {
    const response = await api.put(`/designer-proposals/${proposalId}`, proposalData)
    return response.data
  },
}

// Chat services
export const chatService = {
  getMessages: async (senderId: number, receiverId: number) => {
    const response = await api.get(`/chat?senderId=${senderId}&receiverId=${receiverId}`)
    return response.data
  },

  sendMessage: async (messageData: any) => {
    const response = await api.post("/chat", messageData)
    return response.data
  },
}

export default {
  auth: authService,
  users: userService,
  requests: requestService,
  proposals: proposalService,
  chat: chatService,
}
