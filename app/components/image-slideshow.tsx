"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "https://apricot-fancy-spider-7.mypinata.cloud/ipfs/bafybeiaz4wdttd7i4uswctvqes77sdpjlmzuljzubs7yrack7htomyblka",
    alt: "Hình ảnh sinh nhật 1",
  },
  {
    src: "https://apricot-fancy-spider-7.mypinata.cloud/ipfs/bafybeid3yjagtuefqfxneiifs6lvswftcc2ebwadwu4mtprtdc766fqqzi",
    alt: "Hình ảnh sinh nhật 2",
  },
  {
    src: "https://apricot-fancy-spider-7.mypinata.cloud/ipfs/bafybeicoqeilmajvsifvzt7mnkonzlq5v5nnumo3mo72ac2ict3naeygre",
    alt: "Hình ảnh sinh nhật 3",
  },
  {
    src: "https://apricot-fancy-spider-7.mypinata.cloud/ipfs/bafybeiezlcbkpqvjhbo3mnsfxfsv7orsdkwnufj45bn6eg2fl2eeasrfx4",
    alt: "Hình ảnh sinh nhật 4",
  },
  {
    src: "https://apricot-fancy-spider-7.mypinata.cloud/ipfs/bafybeidwbe7u23vwnxmc7b46vdt3oca7ose7bkxqyb6a4ocqqf6wrjlswe",
    alt: "Hình ảnh sinh nhật 5",
  },
]

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const nextSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      setIsTransitioning(false)
    }, 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
      <div
        className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${
          isTransitioning ? "opacity-50" : "opacity-100"
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full relative">
            <div className="absolute inset-0 flex items-center justify-center bg-pink-200">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-pink-300 z-10 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6 text-pink-600" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-pink-300 z-10 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6 text-pink-600" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-pink-600 w-4" : "bg-pink-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
