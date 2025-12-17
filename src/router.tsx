import {
  Navigate,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import {
  CharacterPage,
  CharactersPage,
  EpisodePage,
  EpisodesPage,
} from '@pages'
import { Layout } from './Layout.tsx'

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
})

const validateSearch = (s: Record<string, unknown>) => ({
  page: typeof s.page === 'number' ? s.page : Number(s.page ?? 1) || 1,
  q: typeof s.q === 'string' ? s.q : '',
  status: typeof s.status === 'string' ? s.status : '',
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Navigate to="/characters" search={{ page: 1, q: '', status: '' }} />
  ),
})

const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/characters',
  component: CharactersPage,
  validateSearch,
})

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/characters/$id',
  component: CharacterPage,
})

const episodesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/episodes',
  component: EpisodesPage,
  validateSearch,
})

const episodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/episodes/$id',
  component: EpisodePage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  charactersRoute,
  characterRoute,
  episodesRoute,
  episodeRoute,
])

export const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
