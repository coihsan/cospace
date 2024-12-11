import AuthWrapper from "@/components/auth/auth-wrapper"

const SignUpPage = () => {
    return(
        <AuthWrapper
        formLabel="Sign up"
        formDescription="Enter your email below to login to your account"
        backButton="/sign-in"
        backButtonText="Have an account?">
            <form action=""></form>
        </AuthWrapper>
    )
}
export default SignUpPage