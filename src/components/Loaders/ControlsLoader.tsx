import ContentLoader from 'react-content-loader'

export const ControlsLoader = () => {
  return (
    <ContentLoader
      viewBox="0 0 900 90"
      width="100%"
      height="90"
      className="w-full"
    >
      <rect x="0" y="18" rx="6" ry="6" width="320" height="44" />
      <rect x="360" y="18" rx="6" ry="6" width="520" height="44" />
    </ContentLoader>
  )
}
