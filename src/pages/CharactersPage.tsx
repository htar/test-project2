import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearch } from '@tanstack/react-router'
import { Q_CHARACTERS, gqlClient } from '@graphql'
import {
  CardLoader,
  ControlsLoader,
  Errors,
  Pagination,
  Tabs,
} from '@components'
import { _useNavigate } from '@hooks'
import type { TTab } from '@types'

const tabs: Array<TTab> = [
  { value: '', label: 'All' },
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
]
const queryKey = 'characters'

export const CharactersPage = () => {
  const { page = 1, q = '', status = '' } = useSearch({ strict: false })

  const { setParam } = _useNavigate()

  const variables = useMemo(
    () => ({ page, name: q || null, status: status || null }),
    [page, q, status],
  )

  const query = useQuery({
    queryKey: [queryKey, variables],
    queryFn: () => gqlClient.request(Q_CHARACTERS, variables),
    placeholderData: (prev) => prev,
  })

  const info = query.data?.characters?.info
  const results = query.data?.characters?.results ?? []
  const pages = info?.pages ?? 0

  return (
    <div className="space-y-6">
      {query.isLoading ? (
        <ControlsLoader />
      ) : (
        <div className="grid gap-4 md:grid-cols-[320px_1fr]">
          <div className="space-y-2">
            <div className="text-sm text-neutral-600">Search</div>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={q}
              onChange={(e) => setParam({ q: e.target.value })}
              placeholder="Type a name…"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm text-neutral-600">Status</div>
            <Tabs
              value={status}
              onChange={(s: string) => setParam({ status: s })}
              items={tabs}
            />
          </div>
        </div>
      )}

      {query.isError && <Errors message={query.error.message} />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(query.isLoading ? Array.from({ length: 8 }) : results).map(
          (item: any, i: number) =>
            query.isLoading ? (
              <CardLoader key={i} />
            ) : (
              <Link
                key={item.id}
                to="/characters/$id"
                params={{ id: item.id }}
                className="group overflow-hidden rounded-md border hover:shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm italic text-neutral-500">
                    {item.status}
                  </div>
                  <div className="text-lg font-medium">{item.name}</div>
                </div>
              </Link>
            ),
        )}
      </div>

      <Pagination
        page={page}
        pages={pages}
        onPage={(p) => setParam({ page: p })}
      />
    </div>
  )
}
