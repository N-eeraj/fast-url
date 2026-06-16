import { Link } from 'react-router'
import LoginForm from '@/components/auth/LoginForm'
import clsx from 'clsx'

function Login() {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl font-medium">
          Login
        </h3>
        <LoginForm />
      </div>

      <div
        className={clsx(
          "relative w-full text-center text-muted-foreground",
          "before:absolute before:top-1/2 before:left-0 before:w-[45%] before:h-px before:bg-muted",
          "after:absolute after:top-1/2 after:right-0 after:w-[45%] after:h-px after:bg-muted",
        )}>
        Or
      </div>

      <div className="flex justify-center items-center gap-x-2">
        <span className="text-muted-foreground">
          Don't have an account?
        </span>
        <Link
          to="/app/register"
          className="text-primary hover:underline">
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
