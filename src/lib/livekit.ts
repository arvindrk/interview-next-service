import { Room } from 'livekit-client'
import { LIVEKIT_CONFIG } from './constants'
import { generateRoomName } from './utils'

export function createRoom(): Room {
  return new Room(LIVEKIT_CONFIG)
}

export async function getToken(roomName: string, userName: string): Promise<string> {
  const response = await fetch(
    `/api/token?room=${roomName}&username=${userName}`
  )
  
  if (!response.ok) {
    throw new Error('Failed to get token')
  }
  
  const data = await response.json()
  return data.token
}

export { generateRoomName }

