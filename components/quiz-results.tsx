"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { calculateResults } from "@/lib/scoring"
import { Sparkles, RotateCcw } from "lucide-react"

interface QuizResultsProps {
  answers: number[]
  onRestart: () => void
}

export function QuizResults({ answers, onRestart }: QuizResultsProps) {
  const results = calculateResults(answers)

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-8 bg-card backdrop-blur border-4 border-primary/30 text-center">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold text-foreground mb-2">the matrix now unfolds... it reveals...</h1>
          <p className="text-muted-foreground">your personality archetypes have been revealed</p>
        </Card>

        {/* Primary Result */}
        <Card className="p-8 bg-primary text-primary-foreground border-4 border-primary/50 shadow-2xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">primary archetype</h2>
            <div className="bg-primary-foreground/20 backdrop-blur rounded-lg p-6">
              <h3 className="text-3xl font-bold mb-2">{results.primary.name.replace(/_/g, " ")}</h3>
              <p className="text-xl opacity-90">
                score: {results.primary.score} points ({results.primary.percentage}%)
              </p>
            </div>
          </div>
        </Card>

        {/* Secondary Result */}
        <Card className="p-8 bg-accent text-accent-foreground border-4 border-accent/50 shadow-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">secondary archetype</h2>
            <div className="bg-accent-foreground/20 backdrop-blur rounded-lg p-6">
              <h3 className="text-3xl font-bold mb-2">{results.secondary.name.replace(/_/g, " ")}</h3>
              <p className="text-xl opacity-90">
                score: {results.secondary.score} points ({results.secondary.percentage}%)
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-secondary text-secondary-foreground border-4 border-secondary/50 shadow-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">secondary archetype (non-mane 6)</h2>
            <div className="bg-secondary-foreground/20 backdrop-blur rounded-lg p-6">
              <h3 className="text-3xl font-bold mb-2">{results.secondaryNonMane.name.replace(/_/g, " ")}</h3>
              <p className="text-xl opacity-90">
                score: {results.secondaryNonMane.score} points ({results.secondaryNonMane.percentage}%)
              </p>
            </div>
          </div>
        </Card>

        {/* Top 5 Results */}
        <Card className="p-8 bg-card backdrop-blur border-2 border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">your top matches</h2>
          <div className="space-y-3">
            {results.top5.map((result, idx) => (
              <div
                key={result.name}
                className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-primary w-8">{idx + 1}</span>
                  <span className="font-semibold text-foreground">{result.name.replace(/_/g, " ")}</span>
                </div>
                <span className="font-bold text-primary">
                  {result.score} pts ({result.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 bg-card backdrop-blur border-2 border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">top character per category</h2>
          <div className="space-y-3">
            {Object.entries(results.categoryTopScores).map(([category, result]) => (
              <div
                key={category}
                className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">
                    {category.replace(/_/g, " ")}
                  </span>
                  <span className="font-semibold text-foreground">{result.name.replace(/_/g, " ")}</span>
                </div>
                <span className="font-bold text-primary">
                  {result.score} pts ({result.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Cutie Mark Indicator */}
        {results.cutieMark && (
          <Card className="p-8 bg-secondary border-4 border-secondary-foreground/20">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">probable indicator of cutie mark</h2>
              <div className="bg-secondary-foreground/10 backdrop-blur rounded-lg p-6">
                <p className="text-xl font-semibold text-primary">{results.cutieMark}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Restart Button */}
        <div className="text-center">
          <Button onClick={onRestart} size="lg" variant="outline" className="font-semibold bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            take quiz again
          </Button>
        </div>
      </div>
    </div>
  )
}
