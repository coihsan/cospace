import AuthWrapper from "@/components/auth/auth-wrapper"
import { Input } from "@/components/ui/input"

const SignIn = () => {
    return(
        <AuthWrapper
        formLabel="Login"
        formDescription="Enter your email below to login to your account"
        backButton="/sign-up"
        backButtonText="Don't have an account?">
            <form action="">
                login
                <Input type="text" />
            </form>
        </AuthWrapper>
    )
}
export default SignIn