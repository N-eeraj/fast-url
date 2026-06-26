import Input from '@components/base/Input'
import Button from '@components/base/Button'
import useCreateShortUrl, { type Args } from '@hooks/shortUrl/useCreateShortUrl'

interface Props {
  onSuccess: Args
  onCancel: () => void
}

function ShortUrlForm({ onSuccess, onCancel }: Props) {
  const {
    register,
    errors,
    isSubmitting,
    onSubmit,
  } = useCreateShortUrl(onSuccess)

  return (
    <form
      className="space-y-5"
      onSubmit={onSubmit}>
      <Input
        label="Long URL"
        type="url"
        placeholder="https://example.com/very/long/link"
        autoFocus
        error={errors.url?.message}
        {...register("url")}
      />

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
          Generate short link
        </Button>
      </div>
    </form>
  )
}

export default ShortUrlForm
