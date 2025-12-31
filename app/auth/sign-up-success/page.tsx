import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">check your email</CardTitle>
            <CardDescription>confirm your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              we&apos;ve sent you a confirmation email. please check your inbox and click the link to verify your
              account.
            </p>
            <Button asChild className="w-full">
              <Link href="/auth/login">back to login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
