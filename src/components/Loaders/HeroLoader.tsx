import ContentLoader from 'react-content-loader'

export const HeroLoader = () => {
  return (
    <div className="grid gap-8 md:grid-cols-[420px_1fr]">
      <div className="overflow-hidden rounded-md border">
        <ContentLoader viewBox="0 0 420 420" width="100%" height="auto">
          <rect x="0" y="0" rx="0" ry="0" width="420" height="420" />
        </ContentLoader>
      </div>
      <div className="overflow-hidden rounded-md border">
        <ContentLoader viewBox="0 0 520 220" width="100%" height="auto">
          <rect x="16" y="18" rx="8" ry="8" width="320" height="28" />
          <rect x="16" y="62" rx="6" ry="6" width="260" height="18" />
          <rect x="16" y="96" rx="6" ry="6" width="300" height="18" />
          <rect x="16" y="130" rx="6" ry="6" width="280" height="18" />
          <rect x="16" y="164" rx="6" ry="6" width="240" height="18" />
        </ContentLoader>
      </div>
    </div>
  )
}
