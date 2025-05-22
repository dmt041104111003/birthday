"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the MusicPlayer component with no SSR
const MusicPlayer = dynamic(() => import("./components/music-player"), { 
  ssr: false 
})

export default function MusicPlayerScript() {
  return <MusicPlayer />
}
