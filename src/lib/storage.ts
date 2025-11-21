import fs from 'fs/promises'
import path from 'path'
import { Prompt } from './types'
import { DEFAULT_PROMPT } from './constants'

const DATA_DIR = path.join(process.cwd(), 'data')
const PROMPTS_FILE = path.join(DATA_DIR, 'prompts.json')

export class PromptStorage {
  private async ensureDataDir() {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true })
    } catch (error) {
      console.error('Failed to create data directory:', error)
    }
  }

  async read(): Promise<Prompt> {
    try {
      await this.ensureDataDir()
      const data = await fs.readFile(PROMPTS_FILE, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      // Return default if file doesn't exist
      return this.getDefault()
    }
  }

  async write(content: string): Promise<Prompt> {
    await this.ensureDataDir()
    
    const prompt: Prompt = {
      content,
      metadata: {
        updatedAt: new Date().toISOString(),
        version: 1
      }
    }

    await fs.writeFile(PROMPTS_FILE, JSON.stringify(prompt, null, 2))
    return prompt
  }

  private getDefault(): Prompt {
    return {
      content: DEFAULT_PROMPT,
      metadata: {
        updatedAt: new Date().toISOString(),
        version: 1
      }
    }
  }
}

let storage: PromptStorage | null = null

export function getStorage(): PromptStorage {
  if (!storage) {
    storage = new PromptStorage()
  }
  return storage
}

