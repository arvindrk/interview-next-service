import { getStorage } from './storage'

export class PromptService {
  async getPromptContent(): Promise<string> {
    const prompt = await getStorage().read()
    return prompt.content
  }

  async savePrompt(content: string) {
    return await getStorage().write(content)
  }
}

export const promptService = new PromptService()

