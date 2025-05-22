"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/music.mp3")
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    // Play audio (browsers may block autoplay)
    const playPromise = audio.play()
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Autoplay prevented:", error)
      })
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.5
      } else {
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={toggleMute} 
        variant="outline" 
        size="icon" 
        className="rounded-full bg-white/80 hover:bg-white shadow-md"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-pink-600" />
        ) : (
          <Volume2 className="h-5 w-5 text-pink-600" />
        )}
      </Button>
    </div>
  )
}
