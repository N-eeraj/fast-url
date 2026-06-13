import { Link } from "react-router"

function Register() {
  return (
    <div className="flex flex-col gap-y-4 divide-y divide-border">
      <form className="flex flex-col gap-y-4 pb-4">
        <h3 className="text-2xl font-medium">
          Register
        </h3>
      </form>

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
