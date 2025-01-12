import AuthWrapper from "@/components/auth/auth-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignUpPage = () => {
    return(
        <AuthWrapper
        formLabel="Sign up"
        formDescription="Enter your email below to login to your account"
        backButton="/sign-in"
        backButtonText="Have an account?">
            <form action="">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
        </AuthWrapper>
    )
}
export default SignUpPage