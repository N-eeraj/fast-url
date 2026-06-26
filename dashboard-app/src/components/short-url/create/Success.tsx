import { useState } from 'react'
import Button from '@components/base/Button'
import { handleSuccess } from '@utils/toast'
import { CopyIcon, CopyCheckIcon } from 'lucide-react'

interface Props {
  shortCode: string
}

function ShortUrlCreateSuccess({ shortCode }: Props) {
  const shortenedUrl = `${window.location.origin}/${shortCode}`

  const [copied, setCopied] = useState(false)

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortenedUrl)
    setCopied(true)
    handleSuccess('Copied URL to clipboard')
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border bg-muted/40 pl-4 pr-1 py-3">
      <a
        href={shortenedUrl}
        target="_blank"
        className="text-sm font-medium text-foreground hover:text-primary break-all hover:underline duration-400">
        {shortenedUrl}
      </a>
    
      <Button
        variant="ghost"
        disabled={copied}
        className="shrink-0 text-xs font-medium text-primary hover:underline"
        onClick={handleCopyUrl}>
        {copied ? <CopyCheckIcon /> : <CopyIcon />}
        <span>
          {copied ? "Copied" : "Copy"}
        </span>
      </Button>
    </div>
  )
}

export default ShortUrlCreateSuccess