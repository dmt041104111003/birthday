"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Cake, Gift, PartyPopper, Music, Heart } from "lucide-react"
import Confetti from "./components/confetti"
import InteractiveCake from "./components/interactive-cake"
import FloatingBalloons from "./components/floating-balloons"
import FunnyMessage from "./components/funny-message"
import ImageSlideshow from "./components/image-slideshow"
import TypewriterText from "./components/typewriter-text"
import AnimatedCharacters from "./components/animated-characters"

export default function BirthdayPage() {
  const [input, setInput] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [showCake, setShowCake] = useState(false)
  const [showInteractiveCake, setShowInteractiveCake] = useState(false)
  const [message, setMessage] = useState<{
    text: string
    type: "success" | "error" | "warning"
  } | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [funnyMessages, setFunnyMessages] = useState<string[]>([])
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [showCharacters, setShowCharacters] = useState(false)
  const { toast } = useToast()

  const birthdayMessage =
    "Chúc mừng sinh nhật em yêu! Cảm ơn em đã đến bên anh và làm cho cuộc sống của anh trở nên tuyệt vời hơn. Anh yêu em rất nhiều và mong rằng năm mới của em sẽ tràn đầy niềm vui, hạnh phúc và thành công!"

  const handleSubmit = () => {
    const cleanInput = input.trim().toLowerCase()
    setAttempts(attempts + 1)

    if (cleanInput === "hai không không sáu") {
      setMessage({
        text: "✅ Đúng rồi em! Ny a thông minh thật!",
        type: "success",
      })
      setShowConfetti(true)
      setShowCake(true)
      setShowSlideshow(true)
      setShowCharacters(true)
      playSound("/sounds/success.mp3")
      toast({
        title: "Chúc mừng! 🎉",
        description: "Em đã trả lời đúng! Chúc mừng sinh nhật nhé!",
        variant: "default",
      })
    } else if (cleanInput === "2006") {
      setMessage({
        text: "❌ Sai rồi em! Phải nhập 'hai không không sáu' chứ không phải số '2006'",
        type: "error",
      })
      playSound("/sounds/wrong.mp3")
      addFunnyMessage("Em phải đọc kỹ hướng dẫn hơn nha!")
    } else {
      setMessage({
        text: "❌ Sai rồi em! Phải nhập đúng năm sinh của mình chứ!",
        type: "error",
      })
      playSound("/sounds/wrong.mp3")

      // Add funny messages based on number of attempts
      if (attempts === 0) {
        addFunnyMessage("Em không nhớ năm sinh của mình à? 🤔")
      } else if (attempts === 1) {
        addFunnyMessage("Thử lại nào! Gợi ý: Đọc bằng chữ nhé! 😉")
      } else if (attempts === 2) {
        addFunnyMessage("Còn chờ gì nữa, nhập 'hai không không sáu' đi! 😂")
      } else {
        addFunnyMessage("Em đúng là đáng yêu mà hơi ngố một chút! ❤️")
      }
    }
  }

  const addFunnyMessage = (message: string) => {
    setFunnyMessages((prev) => [...prev, message])
    setTimeout(() => {
      setFunnyMessages((prev) => prev.slice(1))
    }, 5000)
  }

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath)
    audio.play().catch((e) => console.error("Error playing sound:", e))
  }

  const resetGame = () => {
    setInput("")
    setShowConfetti(false)
    setShowCake(false)
    setShowSlideshow(false)
    setShowInteractiveCake(false)
    setShowCharacters(false)
    setMessage(null)
    setAttempts(0)
    setFunnyMessages([])
  }

  const handleThankYouClick = () => {
    setShowSlideshow(false)
    setShowInteractiveCake(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      <FloatingBalloons />
      {showCharacters && <AnimatedCharacters />}

      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative z-10 border-2 border-pink-300">
        <div className="flex items-center justify-center mb-6 text-pink-600">
          <PartyPopper className="mr-2 h-8 w-8" />
          <h1 className="text-3xl font-bold">Sinh Nhật Vui Vẻ!</h1>
          <PartyPopper className="ml-2 h-8 w-8" />
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold flex items-center justify-center text-purple-700">
              <Cake className="mr-2 h-6 w-6" />
              Nhập năm sinh của em:
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập năm sinh e nhé..."
              className="border-2 border-pink-300 focus:border-pink-500 focus:ring-pink-500 text-lg py-6"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-6"
            >
              <Gift className="mr-2 h-5 w-5" /> Gửi
            </Button>
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg text-center text-lg font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border-2 border-green-300"
                  : "bg-red-100 text-red-700 border-2 border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          {funnyMessages.map((msg, index) => (
            <FunnyMessage key={index} message={msg} />
          ))}
        </div>
      </div>

      {/* Slideshow and Typewriter Text - Only shown when correct answer is given */}
      {showSlideshow && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-20 p-4">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <ImageSlideshow />
            <div className="p-6 bg-gradient-to-r from-pink-100 to-purple-100">
              <TypewriterText text={birthdayMessage} />
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleThankYouClick}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                >
                  <Heart className="mr-2 h-5 w-5" /> Cảm ơn
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Cake with Candle */}
      {showInteractiveCake && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-20 p-4">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8">
            <h2 className="text-2xl font-bold text-center text-pink-600 mb-10">Thổi tắt nến và ước điều ước!</h2>
            <InteractiveCake onComplete={resetGame} />
          </div>
        </div>
      )}

      {/* Regular Cake - shown if not showing interactive cake or slideshow */}
      {showCake && !showSlideshow && !showInteractiveCake && (
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-300 max-w-md w-full">
          <div className="text-center mt-4">
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Music className="mr-2 h-5 w-5" /> Chơi lại
            </Button>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 text-center text-pink-700 font-medium flex items-center">
        <Heart className="h-5 w-5 mr-1 text-red-500" /> Được tạo với tình yêu dành cho em!
      </div>
    </main>
  )
}
