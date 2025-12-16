import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from '@tanstack/react-router'

import { gqlClient } from '@graphql/gqlClient'
import { CardLoader, HeroLoader, Errors } from '@components'
import { Q_CHARACTER } from '../graphql/queries'

export const CharacterPage = () => {
  const navigate = useNavigate()

  const { id } = useParams({ from: '/characters/$id' })

  const query = useQuery({
    queryKey: ['character', id],
    queryFn: () => gqlClient.request(Q_CHARACTER, { id }),
  })

  const c = query.data?.character

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate({ to: '/characters' })}
        className="text-sm text-neutral-600 hover:underline"
      >
        {'< back'}
      </button>

      {query.isLoading ? (
        <HeroLoader />
      ) : query.isError ? (
        <Errors message={query.error.message} />
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-[420px_1fr]">
            <div className="overflow-hidden rounded-md border bg-neutral-50">
              <img src={c.image} alt={c.name} className="w-full object-cover" />
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-semibold">{c.name}</div>
              <div className="space-y-2 text-sm text-neutral-700">
                <div>
                  <span className="text-neutral-500">Gender:</span>{' '}
                  <b>{c.gender || '-'}</b>
                </div>
                <div>
                  <span className="text-neutral-500">Species:</span>{' '}
                  <b>{c.species || '-'}</b>
                </div>
                <div>
                  <span className="text-neutral-500">Type:</span>{' '}
                  <b>{c.type || '-'}</b>
                </div>
                <div>
                  <span className="text-neutral-500">Origin:</span>{' '}
                  <b>{c.origin?.name || '-'}</b>
                </div>
                <div>
                  <span className="text-neutral-500">Location:</span>{' '}
                  <b>{c.location?.name || '-'}</b>
                </div>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Episodes</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.episode?.map((e: any) => (
                <Link
                  key={e.id}
                  to="/episodes/$id"
                  params={{ id: e.id }}
                  className="overflow-hidden rounded-md border hover:shadow-sm"
                >
                  <div className="aspect-[4/3] bg-neutral-50 flex items-center justify-center text-neutral-400">
                    <span className="text-sm">Episode</span>
                  </div>
                  <div className="p-4">
                    <div className="text-sm italic text-neutral-500">
                      {e.episode}
                    </div>
                    <div className="text-lg font-medium">{e.name}</div>
                    <div className="mt-2 text-sm text-neutral-600">
                      🕒 {e.air_date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
