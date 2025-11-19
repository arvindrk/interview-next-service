'use client'

import { 
  RoomAudioRenderer, 
  useTracks,
  RoomContext,
  TrackToggle
} from '@livekit/components-react'
import { Room, Track } from 'livekit-client'
import { LeaveButton } from './leave-button'
import { CustomParticipantTile } from './custom-participant-tile'

interface Props {
  room: Room
}

function VideoConference() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ], { onlySubscribed: false })

  const screenShareTracks = tracks.filter(t => t.publication?.source === Track.Source.ScreenShare)
  const cameraTracks = tracks.filter(t => t.publication?.source !== Track.Source.ScreenShare)
  const hasScreenShare = screenShareTracks.length > 0

  return (
    <div className={hasScreenShare ? "h-full p-2" : "h-full p-4 md:p-8"}>
      {hasScreenShare ? (
        <div className="h-full flex flex-col gap-2">
          {cameraTracks.length > 0 && (
            <div className="flex gap-2 h-32 justify-center">
              {cameraTracks.slice(0, 2).map((track, i) => (
                <div key={i} className="w-40 h-full">
                  <CustomParticipantTile trackReference={track} />
                </div>
              ))}
            </div>
          )}
          
          <div className="flex-1 min-h-0">
            <CustomParticipantTile trackReference={screenShareTracks[0]} />
          </div>
        </div>
      ) : (
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {cameraTracks.map((track, i) => (
            <div key={i} className="h-full">
              <CustomParticipantTile trackReference={track} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CustomControlBar() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      <div className="relative backdrop-blur-xl bg-zinc-900/80 border-t border-zinc-700/50 px-4 py-4">
        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          <TrackToggle 
            source={Track.Source.Microphone}
            className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center"
          />
          <TrackToggle 
            source={Track.Source.Camera}
            className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center"
          />
          <TrackToggle 
            source={Track.Source.ScreenShare}
            className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center"
          />
          <LeaveButton />
        </div>
      </div>
    </div>
  )
}

export function CallInterface({ room }: Props) {
  return (
    <RoomContext.Provider value={room}>
      <div data-lk-theme="default" className="h-screen flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="flex-1 relative">
          <VideoConference />
        </div>
        <RoomAudioRenderer />
        <CustomControlBar />
      </div>
    </RoomContext.Provider>
  )
}

