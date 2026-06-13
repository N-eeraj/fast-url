import { Link } from "react-router"

function Login() {
  return (
    <div className="flex flex-col gap-y-4 divide-y divide-border">
      <form className="flex flex-col gap-y-4 pb-4">
        <h3 className="text-2xl font-medium">
          Login
        </h3>
      </form>

      <div className="flex justify-center items-center gap-x-2">
        <span className="text-muted-foreground">
          Don't have an account?
        </span>
        <Link
          to="/app/register"
          className="text-secondary hover:underline">
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
