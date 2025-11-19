'use client'

import { useEffect, useState } from 'react'
import { Room } from 'livekit-client'
import { CallInterface } from '@/components/call-interface'
import { createRoom, getToken, generateRoomName } from '@/lib/livekit'

const LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL!

export default function CallPage() {
  const [room, setRoom] = useState<Room | null>(null)
  const [roomInstance] = useState(() => createRoom())

  useEffect(() => {
    let mounted = true
    
    const connectToRoom = async () => {
      try {
        const roomName = generateRoomName()
        const userName = 'Interviewer'
        
        const token = await getToken(roomName, userName)
        
        if (!mounted) return
        
        await roomInstance.connect(LIVEKIT_URL, token)
        setRoom(roomInstance)
      } catch (error) {
        console.error('Connection error:', error)
      }
    }

    connectToRoom()

    return () => {
      mounted = false
      roomInstance.disconnect()
    }
  }, [roomInstance])

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-xl">Connecting to interview room...</div>
        </div>
      </div>
    )
  }

  return <CallInterface room={room} />
}

