import { Button } from "../ui/button"
import { GitHubIcons } from "../icons/github"
import { GoogleIcons } from "../icons/google"

const AuthSocial = () => {
    return(
        <div className="grid gap-3">
            <Button variant={'outline'} className="flex items-center gap-3 w-full">
                <GitHubIcons />
                GitHub
            </Button>
            <Button variant={'outline'} className="flex items-center gap-3 w-full">
                <GoogleIcons />
                Google
            </Button>
        </div>
    )
}
export default AuthSocial