import Button from '@components/base/Button'
import ShortUrlCardAction from '@components/short-url/list/Card/Action'
import useShortUrlCard from '@hooks/shortUrl/useShortUrlCard'
import {
  CopyIcon,
  CopyCheckIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react'
import clsx from 'clsx'
import type { ShortUrl } from '@/types'

function ShortUrlCard(shortUrl: ShortUrl) {
  const {
    shortenedUrl,
    copied,
    handleCopy,
    handleEdit,
    handleToggleActiveStatus,
  } = useShortUrlCard(shortUrl)

  const {
    id,
    destination_url,
    name,
    short_code,
    is_active,
    created_at,
    updated_at,
  } = shortUrl

  return (
    <div className="group flex flex-col gap-y-2 h-full rounded-xl border border-border bg-card text-card-foreground p-3 shadow-sm transition-all hover:shadow-md">
      <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-4 gap-y-0.75">
        <h2 className="text-lg font-semibold tracking-tight text-card-foreground truncate">
          {name}
        </h2>

        <div className="flex items-center gap-x-1">
          <span
            className={clsx(
              "relative flex items-center gap-x-1 rounded-full pl-5.75 pr-2.5 py-1 text-xs font-medium border",
              is_active
                ? "bg-active/10 text-active border-active/20"
                : "bg-inactive/10 text-inactive border-inactive/20",
              "before:absolute before:top-1/2 before:left-1 before:translate-x-full before:-translate-y-1/2 before:size-1.5 before:rounded-full",
              is_active ? "before:bg-active" : "before:bg-inactive",
              is_active && "after:absolute after:top-1/2 after:left-1 after:translate-x-full after:-translate-y-1/2 after:size-1.5 after:rounded-full after:bg-active after:animate-ping",
            )}>
            {is_active ? "Active" : "Inactive"}
          </span>

          <ShortUrlCardAction
            is_active={is_active}
            short_code={short_code}
            onEdit={handleEdit}
            onToggleActiveStatus={handleToggleActiveStatus} />
        </div>

        <a
          href={destination_url}
          target="_blank"
          rel="noreferrer"
          className="group/destination-url col-span-2 flex items-baseline gap-x-1.5 w-fit text-sm text-muted-foreground hover:text-foreground transition break-all hover:underline">
          <span className="line-clamp-2">
            {destination_url}
          </span>
          <SquareArrowOutUpRightIcon className="shrink-0 size-3 text-muted-foreground group-hover/destination-url:text-foreground" />
        </a>
      </div>

      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">
          Shortened URL
        </p>

        <div className="flex items-center gap-x-1">
          <a
            href={shortenedUrl}
            target="_blank"
            className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground hover:bg-muted transition group/link">
            <span className="font-mono truncate">
              {shortenedUrl}
            </span>
            {is_active && (
              <SquareArrowOutUpRightIcon className="size-3.5 text-muted-foreground group-hover/short-url:text-foreground transition" />
            )}
          </a>

          <Button
            variant="ghost"
            disabled={copied}
            className="shrink-0 text-xs font-medium text-muted-foreground"
            onClick={handleCopy}>
            {copied ? <CopyCheckIcon /> : <CopyIcon />}
            <span>
              {copied ? "Copied" : "Copy"}
            </span>
          </Button>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-end gap-3 text-xs text-muted-foreground/75 font-light">
        <span>
          Created:&nbsp;
          <span className="text-muted-foreground font-normal">
            {new Date(created_at).toLocaleDateString()}
          </span>
        </span>

        {created_at !== updated_at && (
          <>
            <span className="text-border">•</span>
            <span>
              Updated:&nbsp;
              <span className="text-muted-foreground font-normal">
                {new Date(updated_at).toLocaleDateString()}
              </span>
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default ShortUrlCard
