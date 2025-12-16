import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { gqlClient } from '@graphql/gqlClient'
import { Q_EPISODE } from '@graphql/queries'
import { HeroLoader, Errors } from '@components'

export const EpisodePage = () => {
  const nav = useNavigate()
  const { id } = useParams({ from: '/episodes/$id' })

  const query = useQuery({
    queryKey: ['episode', id],
    queryFn: () => gqlClient.request(Q_EPISODE, { id }),
  })

  const e = query.data?.episode

  return (
    <div className="space-y-8">
      <button
        onClick={() => nav({ to: '/episodes' })}
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
              <div className="aspect-square flex items-center justify-center text-neutral-400">
                <span className="text-sm">Episode image</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-3xl font-semibold">{e.episode}</div>
              <div className="text-xl">{e.name}</div>
              <div className="text-sm text-neutral-600">
                <span className="text-neutral-500">Air date:</span>{' '}
                <b>{e.air_date}</b>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Characters</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {e.characters?.map((c: any) => (
                <Link
                  key={c.id}
                  to="/characters/$id"
                  params={{ id: c.id }}
                  className="group overflow-hidden rounded-md border hover:shadow-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-50">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-lg font-medium">{c.name}</div>
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
