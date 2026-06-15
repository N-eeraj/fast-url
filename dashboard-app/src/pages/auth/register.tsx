import { Link } from "react-router"
import Input from '@components/base/Input'
import Button from '@components/base/Button'

function Register() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl font-medium">
          Register
        </h3>
        <form className="space-y-4">
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
          />

          <Button
            type="submit"
            className="w-full">
            Register
          </Button>
        </form>
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
