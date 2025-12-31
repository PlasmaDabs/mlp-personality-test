"use client"

import { useState, useEffect } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuizIntro } from "@/components/quiz-intro"
import { QuizPreface } from "@/components/quiz-preface"
import { QuizForm } from "@/components/quiz-form"
import { QuizResults } from "@/components/quiz-results"
import { ThemeSettings } from "@/components/theme-settings"
import { AuthStatus } from "@/components/auth-status"
import { createClient } from "@/lib/supabase/client"

export default function MLPTestPage() {
  const [step, setStep] = useState<"intro" | "preface" | "quiz" | "results">("intro")
  const [answers, setAnswers] = useState<number[]>([])
  const [showThemeSettings, setShowThemeSettings] = useState(false)
  const [testMode, setTestMode] = useState(false)

  useEffect(() => {
    const loadProgress = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase
          .from("quiz_progress")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(1)
          .single()

        if (data && !data.completed) {
          const savedAnswers = Object.values(data.answers || {}) as number[]
          if (savedAnswers.length > 0) {
            setAnswers(savedAnswers)
            setStep("quiz")
          }
        }
      }
    }

    loadProgress()
  }, [])

  const handleStart = () => {
    setStep("preface")
  }

  const handleContinue = () => {
    setStep("quiz")
  }

  const handleComplete = (completedAnswers: number[]) => {
    setAnswers(completedAnswers)
    setStep("results")
  }

  const handleRestart = () => {
    setStep("intro")
    setAnswers([])
  }

  const handleFillRandomly = () => {
    const randomAnswers = Array(528)
      .fill(null)
      .map(() => Math.floor(Math.random() * 5) + 1)
    setAnswers(randomAnswers)
  }

  return (
    <>
      <AuthStatus />

      <div className="fixed top-4 right-4 z-40">
        <Button
          onClick={() => setShowThemeSettings(true)}
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-full"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {showThemeSettings && (
        <ThemeSettings
          onClose={() => setShowThemeSettings(false)}
          showTestMode={true}
          testMode={testMode}
          onTestModeChange={setTestMode}
          onFillRandomly={handleFillRandomly}
        />
      )}

      {step === "results" && <QuizResults answers={answers} onRestart={handleRestart} />}
      {step === "quiz" && (
        <QuizForm
          onComplete={handleComplete}
          initialAnswers={answers}
          testMode={testMode}
          onFillRandomly={handleFillRandomly}
        />
      )}
      {step === "preface" && <QuizPreface onContinue={handleContinue} />}
      {step === "intro" && <QuizIntro onStart={handleStart} />}
    </>
  )
}
