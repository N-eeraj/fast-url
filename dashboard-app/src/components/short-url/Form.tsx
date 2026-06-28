import Input from '@components/base/Input'
import Button from '@components/base/Button'
import useShortUrlForm, {
  type OnSuccess,
  type DefaultValues,
} from '@hooks/shortUrl/useShortUrlForm'

interface Props {
  onSuccess: OnSuccess
  onCancel: () => void
  defaultValues?: DefaultValues
}

function ShortUrlForm({ onSuccess, onCancel, defaultValues }: Props) {
  const {
    register,
    errors,
    isSubmitting,
    isUpdate,
    onSubmit,
  } = useShortUrlForm(onSuccess, defaultValues)

  return (
    <form
      className="space-y-5"
      onSubmit={onSubmit}>
      <Input
        label="Name"
        placeholder="My Website"
        autoFocus
        error={errors.name?.message}
        {...register("name")} />

      <Input
        label="Long URL"
        type="url"
        placeholder="https://example.com/very/long/link"
        error={errors.destination_url?.message}
        {...register("destination_url")} />

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          disabled={isSubmitting}
          onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          className="flex-1"
          loading={isSubmitting}>
          {isUpdate ? "Update Short Link" : "Generate Short Link"}
        </Button>
      </div>
    </form>
  )
}

export default ShortUrlForm
