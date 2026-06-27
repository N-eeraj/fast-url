import React, { Suspense } from 'react'
import { Link } from 'react-router'
import ThemeToggle from '@components/app-bar/ThemeToggle'

const ProfileMenu = React.lazy(() => import('@components/app-bar/profile-menu'))

function AppBar() {
  return (
    <nav className="sticky top-0 w-full border-b border-border bg-background text-foreground z-100">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <Link
          to="/app"
          className="flex items-center text-2xl font-extrabold tracking-tight">
          <span>
            Fast
          </span>
          <img
            src="/static/images/logo.svg"
            alt="logo"
            className="w-8" />
          <span className="text-primary">
            URL
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Suspense
            fallback={(
              <div className="w-24 h-8 bg-muted rounded animate-pulse" />
            )}>
            <ProfileMenu />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}

export default AppBar
