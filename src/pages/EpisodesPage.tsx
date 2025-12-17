import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearch } from '@tanstack/react-router'
import { Q_EPISODES, gqlClient } from '@graphql'
import { CardLoader, Errors, Pagination } from '@components'
import { _useNavigate } from '@hooks'

export const EpisodesPage = () => {
  const { setParam } = _useNavigate()

  const { page = 1, q = '' } = useSearch({ strict: false })

  const variables = useMemo(() => ({ page, name: q || null }), [page, q])

  const query = useQuery({
    queryKey: ['episodes', variables],
    queryFn: () => gqlClient.request(Q_EPISODES, variables),
    placeholderData: (prev) => prev,
  })

  const info = query.data?.episodes?.info
  const results = query.data?.episodes?.results ?? []
  const pages = info?.pages ?? 0

  return (
    <div className="space-y-6">
      <div className="space-y-2 max-w-sm">
        <div className="text-sm text-neutral-600">Search</div>
        <input
          className="w-full rounded-md border px-3 py-2"
          value={q}
          onChange={(e) => setParam({ q: e.target.value, page: 1 })}
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
        onPage={(p: number) => setParam({ page: p })}
      />
    </div>
  )
}
