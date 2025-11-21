'use client'

import { useRouter } from 'next/navigation'
import { useRoomContext } from '@livekit/components-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function LeaveButton() {
  const room = useRoomContext()
  const router = useRouter()

  const handleLeave = async () => {
    await room.disconnect()
    router.push('/')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-900 border-zinc-700 rounded-2xl shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl">Leave Interview?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 text-base">
            Are you sure you want to leave this interview call? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleLeave}
            className="bg-red-600 hover:bg-red-500 text-white"
          >
            Leave Call
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

