import {
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router'
import { Tabs } from '@components'
import type { TTab } from '@types'

const tabs: Array<TTab> = [
  { value: 'characters', label: 'Characters' },
  { value: 'episodes', label: 'Episodes' },
]

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const pathName = useRouterState({ select: (s) => s.location.pathname })
  const pathNameValue = pathName.replace('/', '')
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-2xl font-semibold">
            <Link to="/characters" search={{ page: 1, q: '', status: '' }}>
              Logo
            </Link>
          </div>
          <Tabs
            value={pathNameValue}
            onChange={(page: string) => navigate({ to: `/${page}` })}
            items={tabs}
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {children ?? <Outlet />}
      </main>
    </div>
  )
}
