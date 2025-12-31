"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface QuizPrefaceProps {
  onContinue: () => void
}

export function QuizPreface({ onContinue }: QuizPrefaceProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6">
      <Card className="max-w-3xl w-full p-6 md:p-12 bg-card backdrop-blur shadow-2xl border-4 border-destructive/30">
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-destructive" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">a forewarning</h2>
          </div>

          <div className="space-y-4 text-sm md:text-base text-foreground/90 leading-relaxed text-pretty">
            <p>
              over-reliance on personality tests raises several concerns. many tests, such as the myers-briggs type
              indicator, categorise people into fixed types using binary traits, even though personality exists on
              continuous scales.
            </p>

            <p>
              retest results often change significantly (up to 50 per cent difference in type assignment over short
              periods), and self-reports introduce biases like social desirability. this leads to oversimplification of
              complex traits, potential self-limiting beliefs, or excuses for behaviour based on labels.
            </p>

            <p>
              tests offer useful starting points when combined with real-life observation and feedback. the barnum
              effect contributes heavily: vague, general statements (e.g., "you have untapped potential but can be
              self-critical") feel personally accurate because they apply broadly, creating an illusion of depth.
            </p>
          </div>

          <div className="bg-primary/10 p-4 md:p-6 rounded-lg border-2 border-primary space-y-2">
            <p className="text-base md:text-lg text-foreground font-semibold text-center">
              when you finish, you will receive your exact primary + secondary archetypes.
            </p>
            <p className="text-sm md:text-base text-foreground/90 text-center text-pretty">
              there are no trick questions. answer honestly. take your time.
            </p>
          </div>

          <div className="bg-accent/20 p-4 md:p-6 rounded-lg border-2 border-accent">
            <p className="text-sm md:text-base text-foreground/90 text-center">
              lastly, before you begin, login to ensure that your progress is saved (the test is long)
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onContinue}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              i understand — continue ✨
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
