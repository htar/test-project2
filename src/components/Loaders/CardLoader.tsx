import ContentLoader from 'react-content-loader'

export const CardLoader = () => {
  return (
    <div className="overflow-hidden rounded-md border">
      <ContentLoader
        viewBox="0 0 400 330"
        width="100%"
        height="auto"
        className="w-full"
      >
        <rect x="0" y="0" rx="0" ry="0" width="400" height="220" />
        <rect x="16" y="242" rx="6" ry="6" width="120" height="14" />
        <rect x="16" y="268" rx="6" ry="6" width="220" height="18" />
        <rect x="16" y="296" rx="6" ry="6" width="160" height="14" />
      </ContentLoader>
    </div>
  )
}
