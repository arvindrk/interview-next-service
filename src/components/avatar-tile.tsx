'use client'

import { Participant } from 'livekit-client'

interface AvatarTileProps {
  participant: Participant
}

export function AvatarTile({ participant }: AvatarTileProps) {
  const getInitials = (name: string): string => {
    const cleanName = name.trim()
    if (!cleanName) return '?'
    
    const parts = cleanName.split(/\s+/)
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase()
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }
  
  const displayName = participant.name || participant.identity
  const initials = getInitials(displayName)
  
  const getColorFromName = (name: string): string => {
    const colors = [
      'from-blue-600 to-blue-700',
      'from-purple-600 to-purple-700',
      'from-pink-600 to-pink-700',
      'from-green-600 to-green-700',
      'from-orange-600 to-orange-700',
      'from-teal-600 to-teal-700',
    ]
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }
  
  const colorClass = getColorFromName(displayName)
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
      <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-2xl ring-4 ring-zinc-700/50 transition-all duration-200`}>
        <span className="text-3xl md:text-5xl font-bold text-white select-none">
          {initials}
        </span>
      </div>
    </div>
  )
}

