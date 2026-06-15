import Button from '@components/base/Button'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useTheme } from '@/contexts/Theme'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-md text-sm"
      onClick={toggleTheme}>
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </Button>
  )
}

export default ThemeToggle
