"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, User, LogIn } from "lucide-react"
import Link from "next/link"

export function AuthStatus() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserEmail(user?.email || null)
      setIsLoading(false)
    }
    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserEmail(null)
    router.push("/")
  }

  if (isLoading) return null

  return (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-2 rounded-lg border bg-card/95 backdrop-blur px-3 py-2 text-sm shadow-lg">
      {userEmail ? (
        <>
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground max-w-[120px] truncate">{userEmail}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="h-7 px-2 hover:bg-accent">
            <LogOut className="h-3 w-3" />
          </Button>
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4 text-muted-foreground" />
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="h-7 px-2 hover:bg-accent text-xs">
              login
            </Button>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/auth/sign-up">
            <Button variant="ghost" size="sm" className="h-7 px-2 hover:bg-accent text-xs">
              sign up
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}
