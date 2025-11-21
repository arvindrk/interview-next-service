// Prompt types
export interface Prompt {
  content: string
  metadata: {
    updatedAt: string
    version: number
  }
}

// API types
export interface ApiResponse<T> {
  success?: boolean
  data?: T
  error?: string
}

export interface GetPromptResponse {
  prompt: string
}

export interface SavePromptRequest {
  prompt: string
}

// LiveKit types
export interface RoomConfig {
  roomName: string
  userName: string
}

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'failed'

