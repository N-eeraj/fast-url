import { Link } from "react-router"
import RegistrationForm from "@components/auth/RegistrationForm"

function Register() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl font-medium">
          Register
        </h3>
        <RegistrationForm />
      </div>

      <hr />

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
