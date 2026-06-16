import { Link } from 'react-router'
import RegistrationForm from '@components/auth/RegistrationForm'
import clsx from 'clsx'

function Register() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl font-medium">
          Register
        </h3>
        <RegistrationForm />
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
          Already have an account?
        </span>
        <Link
          to="/app/login"
          className="text-secondary hover:underline">
          Login
        </Link>
      </div>
    </div>
  )
}

export default Register
