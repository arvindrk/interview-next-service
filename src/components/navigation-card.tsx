import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

interface Props {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

export function NavigationCard({ title, description, href, icon }: Props) {
  return (
    <Link href={href}>
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full min-h-[140px]">
        <div className="flex items-start gap-4">
          <div className="text-primary">{icon}</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <ArrowRight className="text-muted-foreground" />
        </div>
      </Card>
    </Link>
  )
}

