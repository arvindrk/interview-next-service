import { NavigationCard } from '@/components/navigation-card'
import { FileEdit, Phone } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Interview Platform</h1>
          <p className="text-xl text-muted-foreground">
            Create interview questions and let AI conduct the interview
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <NavigationCard
            title="Create Questions"
            description="Compose and edit interview questions for the AI agent"
            href="/questionnaire-prompt-builder"
            icon={<FileEdit size={32} />}
          />
          
          <NavigationCard
            title="Start Interview"
            description="Begin an AI-moderated interview call"
            href="/call"
            icon={<Phone size={32} />}
          />
        </div>
      </div>
    </div>
  )
}
