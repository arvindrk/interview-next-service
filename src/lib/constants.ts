export const PROMPT_CONFIG = {
  MIN_LENGTH: 10,
  MAX_LENGTH: 10000,
  PLACEHOLDER: 'Enter interview questions and instructions for the AI agent...\n\nExample:\n- Ask about their experience with...\n- Probe deeper if they mention...'
} as const

export const DEFAULT_PROMPT = 'Ask the user about their background and interests.'

export const LIVEKIT_CONFIG = {
  adaptiveStream: true,
  dynacast: true,
} as const

