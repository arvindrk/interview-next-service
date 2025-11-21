import { z } from 'zod'
import { PROMPT_CONFIG } from './constants'

// Zod handles all validation logic
export const promptSchema = z.object({
  prompt: z.string()
    .min(PROMPT_CONFIG.MIN_LENGTH, `Prompt must be at least ${PROMPT_CONFIG.MIN_LENGTH} characters`)
    .max(PROMPT_CONFIG.MAX_LENGTH, `Prompt must be less than ${PROMPT_CONFIG.MAX_LENGTH} characters`)
    .trim()
})

export type PromptFormData = z.infer<typeof promptSchema>

// API validation
export const savePromptRequestSchema = z.object({
  prompt: z.string().min(1)
})

