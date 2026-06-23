import { Link } from 'react-router'
import ThemeToggle from '@components/app-bar/ThemeToggle'
import ProfileMenu from '@components/app-bar/ProfileMenu'

function AppBar() {
  return (
    <nav className="sticky top-0 w-full border-b border-border bg-background text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
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
          <ProfileMenu />
        </div>
      </div>
    </nav>
  )
}

export default AppBar
