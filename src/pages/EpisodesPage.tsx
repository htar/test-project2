import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { Q_EPISODES, gqlClient } from '@graphql'
import { CardLoader, Pagination, Errors } from '@components'

export const EpisodesPage = () => {
  const navigate = useNavigate()
  const search = useRouterState({ select: (s) => s.location.search as any })

  const page = search.page ?? 1
  const q = search.q ?? ''

  const variables = useMemo(() => ({ page, name: q || null }), [page, q])

  const query = useQuery({
    queryKey: ['episodes', variables],
    queryFn: () => gqlClient.request(Q_EPISODES, variables),
    placeholderData: (prev) => prev,
  })

  const info = query.data?.episodes?.info
  const results = query.data?.episodes?.results ?? []
  const pages = info?.pages ?? 0

  const setSearch = (patch: Partial<{ page: number; q: string }>) => {
    navigate({
      to: '/episodes',
      search: (prev: any) => ({ ...prev, ...patch }),
      replace: true,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 max-w-sm">
        <div className="text-sm text-neutral-600">Search</div>
        <input
          className="w-full rounded-md border px-3 py-2"
          value={q}
          onChange={(e) => setSearch({ q: e.target.value, page: 1 })}
          placeholder="Type an episode name…"
        />
      </div>

      {query.isError && <Errors message={query.error.message} />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(query.isLoading ? Array.from({ length: 8 }) : results).map(
          (item: any, i: number) =>
            query.isLoading ? (
              <CardLoader key={i} />
            ) : (
              <Link
                key={item.id}
                to="/episodes/$id"
                params={{ id: item.id }}
                className="group overflow-hidden rounded-md border hover:shadow-sm"
              >
                <div className="aspect-[4/3] bg-neutral-50 flex items-center justify-center text-neutral-400">
                  <span className="text-sm">Episode</span>
                </div>
                <div className="p-4">
                  <div className="text-sm italic text-neutral-500">
                    {item.episode}
                  </div>
                  <div className="text-lg font-medium">{item.name}</div>
                  <div className="mt-2 text-sm text-neutral-600">
                    🕒 {item.air_date}
                  </div>
                </div>
              </Link>
            ),
        )}
      </div>

      <Pagination
        page={page}
        pages={pages}
        onPage={(page) => setSearch({ page })}
      />
    </div>
  )
}
