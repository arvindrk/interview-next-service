'use client'

import { 
  TrackReferenceOrPlaceholder,
  VideoTrack,
  useIsSpeaking,
  useEnsureTrackRef
} from '@livekit/components-react'
import { Track, Participant } from 'livekit-client'
import { AvatarTile } from './avatar-tile'

interface CustomParticipantTileProps {
  trackReference?: TrackReferenceOrPlaceholder
}

export function CustomParticipantTile({ 
  trackReference 
}: CustomParticipantTileProps) {
  
  const trackRef = useEnsureTrackRef(trackReference)
  
  const publication = trackRef.publication
  const participant = trackRef.participant
  
  const isScreenShare = publication?.source === Track.Source.ScreenShare
  const isVideoTrack = publication?.kind === 'video'
  const isMuted = publication?.isMuted ?? true
  const shouldShowVideo = isVideoTrack && !isMuted
  
  const shouldShowAvatar = !shouldShowVideo && !isScreenShare
  
  const isSpeaking = useIsSpeaking(participant)
  const borderClasses = (!isScreenShare && isSpeaking)
    ? 'ring-2 ring-green-400' 
    : 'ring-1 ring-white/10'
  
  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl ${borderClasses}`}>
      {shouldShowVideo && publication ? (
        <VideoTrack 
          trackRef={trackRef as any}
          className="w-full h-full object-cover"
        />
      ) : shouldShowAvatar ? (
        <AvatarTile participant={participant} />
      ) : (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
          <div className="text-zinc-500 text-sm">Loading...</div>
        </div>
      )}
      
      <NameBadge 
        participant={participant} 
        isScreenShare={isScreenShare || false} 
      />
    </div>
  )
}

interface NameBadgeProps {
  participant: Participant
  isScreenShare: boolean
}

function NameBadge({ participant, isScreenShare }: NameBadgeProps) {
  const displayName = participant.name || participant.identity
  const label = isScreenShare ? `${displayName} (Screen)` : displayName
  
  return (
    <div className="absolute bottom-3 left-3">
      <div className="px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-white text-sm font-medium shadow-lg truncate">
        {label}
      </div>
    </div>
  )
}
