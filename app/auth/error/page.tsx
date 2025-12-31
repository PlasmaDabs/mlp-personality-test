"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">authentication error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <p className="text-sm text-muted-foreground">error: {error}</p>
            ) : (
              <p className="text-sm text-muted-foreground">an unspecified error occurred</p>
            )}
            <Button asChild className="w-full">
              <Link href="/auth/login">back to login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">authentication error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">loading...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  )
}
