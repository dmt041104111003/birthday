import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trang Sinh Nhật Hài Hước",
  description: "Một trang web sinh nhật thông minh và hài hước",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Create audio element
            var audio = new Audio('/music.mp3');
            audio.loop = true;
            audio.volume = 0.5;
            
            // Function to play audio
            function playAudio() {
              audio.play().catch(function(error) {
                console.error('Autoplay prevented:', error);
              });
              document.removeEventListener('click', playAudio);
              document.removeEventListener('keydown', playAudio);
              document.removeEventListener('touchstart', playAudio);
            }
            
            // Try to play immediately
            playAudio();
            
            // Also try to play on user interaction
            document.addEventListener('click', playAudio);
            document.addEventListener('keydown', playAudio);
            document.addEventListener('touchstart', playAudio);
          });
        ` }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
