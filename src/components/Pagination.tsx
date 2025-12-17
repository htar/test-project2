type Props = {
  page: number
  pages: number
  onPage: (p: number) => void
}
export const Pagination = ({ page, pages, onPage }: Props) => {
  if (!pages || pages <= 1) return null

  const clamp = (n: number) => Math.max(1, Math.min(pages, n))
  const go = (n: number) => onPage(clamp(n))

  const items: Array<number | 'dots'> = []
  const add = (x: number | 'dots') => items.push(x)

  const left = [1, 2].filter((n) => n <= pages)
  left.forEach(add)

  if (pages > 5) add('dots')

  const right = [pages - 1, pages].filter((n) => n >= 1)
  right.forEach((n) => {
    if (!items.includes(n)) add(n)
  })

  return (
    <div className="mt-8 flex justify-center">
      <div className="inline-flex items-center overflow-hidden rounded-md border">
        <button
          className="px-3 py-2 hover:bg-neutral-100"
          onClick={() => go(page - 1)}
          aria-label="Prev"
        >
          ◀
        </button>

        {items.map((it) =>
          it === 'dots' ? (
            <div key={it} className="px-4 py-2 text-sm text-neutral-500">
              …
            </div>
          ) : (
            <button
              key={it}
              className={`px-4 py-2 text-sm hover:bg-neutral-100 ${it === page ? 'bg-black text-white' : ''}`}
              onClick={() => go(it)}
            >
              {it}
            </button>
          ),
        )}

        <button
          className="px-3 py-2 hover:bg-neutral-100"
          onClick={() => go(page + 1)}
          aria-label="Next"
        >
          ▶
        </button>
      </div>
    </div>
  )
}
