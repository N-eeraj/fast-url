import { Outlet, useLocation } from 'react-router'

const TEXT_CONTENT = {
  '/app/login': {
    heading: 'Welcome Back',
    content:
      'Sign in to manage your links, track performance, and access your dashboard.',
  },
  '/app/register': {
    heading: 'Start Shortening Smarter',
    content:
      'Get access to custom short links, detailed insights, and easy link management.',
  } as const
}

function AuthenticationLayout() {
  const { pathname } = useLocation()

  const {
    heading,
    content,
  } = TEXT_CONTENT[pathname as keyof typeof TEXT_CONTENT]

  return (
    <main
      className="flex h-svh">
      <section className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between">
        <a
          href="/"
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
        </a>

        <div className="max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            {heading}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {content}
          </p>
        </div>
      </section>

      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-y-6 lg:bg-primary px-6">
        <a
          href="/"
          className="flex lg:hidden items-center text-2xl font-extrabold tracking-tight">
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
        </a>
        <div className="w-full max-w-md bg-card px-4 py-6 rounded">
          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default AuthenticationLayout
