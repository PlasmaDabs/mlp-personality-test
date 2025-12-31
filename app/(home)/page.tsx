"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Music, Github, Twitter, Instagram, Mail, Sparkles } from "lucide-react"
import Link from "next/link"
import { MusicPlayer } from "@/components/music-player"
import { AuthStatus } from "@/components/auth-status"

export default function HomePage() {
  return (
    <>
      <AuthStatus />

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-8">
          <Card className="p-8 md:p-12 bg-card backdrop-blur shadow-2xl border-4 border-primary/30">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <Music className="w-12 h-12 text-primary animate-pulse" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground">plasmadabs</h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                welcome to my digital space. explore personality tests, listen to music, and connect.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="/mlptest">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    mlp personality test
                  </Button>
                </Link>
              </div>

              <div className="flex justify-center gap-4 pt-6">
                <a
                  href="https://github.com/plasmadabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-accent transition-colors"
                >
                  <Github className="w-6 h-6 text-foreground" />
                </a>
                <a
                  href="https://twitter.com/plasmadabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-accent transition-colors"
                >
                  <Twitter className="w-6 h-6 text-foreground" />
                </a>
                <a
                  href="https://instagram.com/plasmadabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-accent transition-colors"
                >
                  <Instagram className="w-6 h-6 text-foreground" />
                </a>
                <a
                  href="mailto:contact@plasmadabs.com"
                  className="p-3 rounded-full bg-muted hover:bg-accent transition-colors"
                >
                  <Mail className="w-6 h-6 text-foreground" />
                </a>
              </div>
            </div>
          </Card>

          <MusicPlayer />
        </div>
      </div>
    </>
  )
}
