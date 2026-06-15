import Input from '@components/base/Input'
import Button from '@components/base/Button'
import useRegister from "@hooks/auth/useRegister"

function RegistrationForm() {
  const {
    register,
    errors,
    onSubmit,
    isSubmitting,
  } = useRegister()

  return (
    <form
      className="space-y-4"
      onSubmit={onSubmit}>
      <Input
        label="Name"
        error={errors.name?.message}
        placeholder="Enter your name"
        {...register("name")}
      />

      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        placeholder="Enter your email"
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full">
        Register
      </Button>
    </form>
  )
}

export default RegistrationForm
