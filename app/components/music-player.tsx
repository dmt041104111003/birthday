"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Function to attempt playing music
  const attemptPlayMusic = () => {
    if (!audioRef.current) return
    
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          console.log("Music playing successfully")
        })
        .catch(error => {
          console.error("Autoplay prevented:", error)
          setIsPlaying(false)
        })
    }
  }

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/music.mp3")
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    // Try to play immediately
    attemptPlayMusic()

    // Add event listeners to try playing on user interaction
    const handleUserInteraction = () => {
      if (!isPlaying && audioRef.current) {
        attemptPlayMusic()
      }
    }

    // These events are likely to be triggered by user interaction
    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)

    // Cleanup
    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [isPlaying])

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
