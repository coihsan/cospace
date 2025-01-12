import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react"
import { Link } from "react-router"
import AuthSocial from "./auth-social"

interface AuthWrapperProps {
    formLabel: "Login" | "Sign up"
    formDescription: string
    backButton: string;
    children: React.ReactNode
    backButtonText: string
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
    formLabel,
    children,
    formDescription,
    backButton,
    backButtonText
}) => {
    return (
        <div className="mx-auto max-w-sm w-full flex items-center justify-center h-screen">
            <Card>
                <CardHeader>
                    <div className="pb-6">
                        <h1>Logo</h1>
                    </div>
                    <CardTitle className="text-2xl">{formLabel}</CardTitle>
                    <CardDescription>
                        {formDescription}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="pb-4">
                        {children}
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Or
                        </span>
                    </div>
                    <div className="pt-4">
                        <AuthSocial />
                    </div>
                </CardContent>
                <CardFooter>
                    <Link className="mx-auto" to={backButton}>
                        <Button variant={'link'}>
                            {backButtonText}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
export default AuthWrapper