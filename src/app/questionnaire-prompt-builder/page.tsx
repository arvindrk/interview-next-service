import { PromptForm } from '@/components/prompt-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getStorage } from '@/lib/storage'

export default async function PromptBuilderPage() {
  // Load existing prompt (Server Component)
  const prompt = await getStorage().read()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Interview Question Builder</h1>
        <p className="text-muted-foreground mb-6">
          Create instructions and questions for the AI interviewer
        </p>

        <PromptForm initialValue={prompt.content} />
      </div>
    </div>
  )
}

