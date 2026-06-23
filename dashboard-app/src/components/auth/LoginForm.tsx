import Input from '@components/base/Input'
import Button from '@components/base/Button'
import useLogin from '@hooks/auth/useLogin'

function LoginForm() {
  const {
    register,
    errors,
    onSubmit,
    isSubmitting
  } = useLogin()

  return (
    <form
      className="space-y-4"
      onSubmit={onSubmit}>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        variant="secondary"
        loading={isSubmitting}
        className="w-full">
        Login
      </Button>
    </form>
  )
}

export default LoginForm