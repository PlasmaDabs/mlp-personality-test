"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface QuizIntroProps {
  onStart: () => void
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6">
      <Card className="max-w-3xl w-full p-6 md:p-12 bg-card backdrop-blur shadow-2xl border-4 border-primary/30">
        <div className="text-center space-y-4 md:space-y-6">
          <div className="flex justify-center">
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-primary animate-pulse" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground text-balance leading-tight">
            my little pony: friendship is magic
            <span className="block text-2xl md:text-4xl mt-2 text-primary">personality inventory</span>
          </h1>

          <p className="text-base md:text-lg text-foreground/90 leading-relaxed max-w-2xl mx-auto text-pretty">
            this is the most thorough my little pony personality inventory ever created - 528 questions mapping to 48+
            detailed outcomes (every mane 6 evolution, all pillars, all major reformed villains, the student six,
            extended family, background favourites, and every meaningful hybrid).
          </p>

          <div className="bg-accent/50 p-4 md:p-6 rounded-lg border-2 border-accent space-y-2 md:space-y-3 text-left">
            <h2 className="font-bold text-foreground text-lg md:text-xl">scoring scale:</h2>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base text-foreground/90">
              <li>
                <strong>1</strong> = strongly disagree
              </li>
              <li>
                <strong>2</strong> = disagree
              </li>
              <li>
                <strong>3</strong> = neutral / sometimes
              </li>
              <li>
                <strong>4</strong> = agree
              </li>
              <li>
                <strong>5</strong> = strongly agree
              </li>
            </ul>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            begin your journey ✨
          </Button>
        </div>
      </Card>
    </div>
  )
}
