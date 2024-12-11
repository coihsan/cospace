import { Button } from "@/components/ui/button"
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <main className="w-full max-w-screen-lg mx-auto px-4">
      <header className="flex items-center justify-between w-full my-4 border px-5 py-2 rounded-full">
        <a href="">cospace</a>
        <Button variant={'default'}>Sign-in</Button>
      </header>
      <div className="py-14 flex flex-col items-center">
        <h1 className="text-5xl font-semibold text-center">Share notes , <br /> Brainstorm Together, <br /> and Stay Connected.</h1>
        <div className="flex items-center gap-2 pt-6">
          <Link to={'/app'}>
          <Button variant={'default'}>
            Launch app
          </Button>
          </Link>
          <Button variant={'secondary'}>View on GitHub</Button>
        </div>
      </div>
    </main>
  )
}
export default LandingPage