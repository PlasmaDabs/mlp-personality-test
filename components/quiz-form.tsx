"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { questions, sections } from "@/lib/questions"
import { createClient } from "@/lib/supabase/client"

interface QuizFormProps {
  onComplete: (answers: number[]) => void
  initialAnswers?: number[]
  testMode?: boolean
  onFillRandomly?: () => void
}

export function QuizForm({ onComplete, initialAnswers = [], testMode = false, onFillRandomly }: QuizFormProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    initialAnswers.length > 0 ? initialAnswers : Array(528).fill(null),
  )
  const [missedQuestions, setMissedQuestions] = useState<number[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserId(user?.id || null)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (!userId) return

    const saveProgress = async () => {
      const supabase = createClient()

      const answersObj = answers.reduce(
        (acc, ans, idx) => {
          if (ans !== null) {
            acc[idx] = ans
          }
          return acc
        },
        {} as Record<number, number>,
      )

      const { data: existing } = await supabase
        .from("quiz_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("completed", false)
        .single()

      if (existing) {
        await supabase
          .from("quiz_progress")
          .update({
            answers: answersObj,
            current_section: currentSection,
          })
          .eq("id", existing.id)
      } else {
        await supabase.from("quiz_progress").insert({
          user_id: userId,
          answers: answersObj,
          current_section: currentSection,
          completed: false,
        })
      }
    }

    const debounceTimer = setTimeout(saveProgress, 1000)
    return () => clearTimeout(debounceTimer)
  }, [answers, currentSection, userId])

  const handleComplete = async () => {
    if (answers.every((a) => a !== null)) {
      if (userId) {
        const supabase = createClient()
        const { data: existing } = await supabase
          .from("quiz_progress")
          .select("id")
          .eq("user_id", userId)
          .eq("completed", false)
          .single()

        if (existing) {
          await supabase
            .from("quiz_progress")
            .update({
              completed: true,
              completed_at: new Date().toISOString(),
            })
            .eq("id", existing.id)
        }
      }

      onComplete(answers as number[])
    }
  }

  const section = sections[currentSection]
  const sectionStart = sections.slice(0, currentSection).reduce((sum, s) => sum + s.questionCount, 0)
  const sectionEnd = sectionStart + section.questionCount
  const sectionQuestions = questions.slice(sectionStart, sectionEnd)

  const totalAnswered = answers.filter((a) => a !== null).length
  const progress = (totalAnswered / 528) * 100

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers]
    newAnswers[sectionStart + questionIndex] = value
    setAnswers(newAnswers)
    setMissedQuestions([])
  }

  useEffect(() => {
    if (testMode && onFillRandomly) {
      // Test mode logic is now controlled by parent through theme settings
    }
  }, [testMode, onFillRandomly])

  const canGoNext = currentSection < sections.length - 1
  const canGoBack = currentSection > 0
  const sectionComplete = sectionQuestions.every((_, idx) => answers[sectionStart + idx] !== null)

  const handleNext = () => {
    if (!sectionComplete) {
      const missed: number[] = []
      sectionQuestions.forEach((_, idx) => {
        if (answers[sectionStart + idx] === null) {
          missed.push(sectionStart + idx + 1)
        }
      })
      setMissedQuestions(missed)
      return
    }

    setMissedQuestions([])
    if (canGoNext) {
      setCurrentSection(currentSection + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (answers.every((a) => a !== null)) {
      handleComplete()
    }
  }

  const handleBack = () => {
    setMissedQuestions([])
    if (canGoBack) {
      setCurrentSection(currentSection - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSectionJump = (sectionIndex: number) => {
    setMissedQuestions([])
    setCurrentSection(sectionIndex)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {userId && (
          <Card className="p-3 bg-card backdrop-blur border border-muted">
            <p className="text-xs text-center text-muted-foreground">progress auto-saved</p>
          </Card>
        )}

        <Card className="p-6 bg-card backdrop-blur border-2 border-primary/20">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-foreground">
                section {currentSection + 1} of {sections.length}
              </h2>
              <span className="text-sm font-medium text-muted-foreground">{totalAnswered} / 528 answered</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-lg font-semibold text-primary">{section.title}</p>
          </div>
        </Card>

        <Card className="p-4 bg-card backdrop-blur border-2 border-primary/20">
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={handleBack}
              disabled={!canGoBack}
              variant="outline"
              size="sm"
              className="font-semibold bg-transparent shrink-0"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              previous
            </Button>

            <div className="flex-1 flex justify-center">
              <select
                value={currentSection}
                onChange={(e) => handleSectionJump(Number(e.target.value))}
                className="bg-muted text-foreground px-3 py-2 rounded-md text-sm font-medium border-2 border-border hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {sections.map((s, idx) => (
                  <option key={idx} value={idx}>
                    section {idx + 1}: {s.title}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleNext}
              disabled={!canGoNext && !sectionComplete}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shrink-0"
            >
              {canGoNext ? (
                <>
                  next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                "reveal ✨"
              )}
            </Button>
          </div>
        </Card>

        {missedQuestions.length > 0 && (
          <Card className="p-4 bg-destructive/10 border-2 border-destructive">
            <p className="text-destructive font-medium text-center">please answer: {missedQuestions.join(", ")}</p>
          </Card>
        )}

        <div className="space-y-4">
          {sectionQuestions.map((question, idx) => {
            const globalIdx = sectionStart + idx
            const answer = answers[globalIdx]

            return (
              <Card
                key={globalIdx}
                className="p-6 bg-card backdrop-blur border-2 border-border hover:border-primary/50 transition-colors"
              >
                <div className="space-y-4">
                  <p className="text-foreground font-medium leading-relaxed">
                    <span className="text-primary font-bold mr-2">{globalIdx + 1}.</span>
                    {question}
                  </p>

                  <div className="flex gap-2 justify-center flex-wrap">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleAnswer(idx, value)}
                        className={`
                          w-14 h-14 rounded-full font-bold text-lg transition-all
                          ${
                            answer === value
                              ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          }
                        `}
                      >
                        {value}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground px-2 relative">
                    <span>strongly disagree</span>
                    <span className="absolute left-1/2 -translate-x-1/2">neutral</span>
                    <span>strongly agree</span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-6 bg-card backdrop-blur border-2 border-primary/20">
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={handleBack}
              disabled={!canGoBack}
              variant="outline"
              className="font-semibold bg-transparent shrink-0"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              previous section
            </Button>

            <div className="flex-1 flex justify-center">
              <select
                value={currentSection}
                onChange={(e) => handleSectionJump(Number(e.target.value))}
                className="bg-muted text-foreground px-4 py-2 rounded-md font-medium border-2 border-border hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {sections.map((s, idx) => (
                  <option key={idx} value={idx}>
                    section {idx + 1}: {s.title}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shrink-0"
            >
              {canGoNext ? (
                <>
                  next section
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                "the matrix now unfolds... ✨"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
