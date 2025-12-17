import { useNavigate } from '@tanstack/react-router'

type TPath = Partial<{
  page?: number
  q?: string
  status?: string
}>

export const _useNavigate = () => {
  const navigate = useNavigate()

  const setParam = (patch: TPath, navigateTo?: string) => {
    navigate({
      ...(navigateTo ? { to: navigateTo } : {}),
      // @ts-ignore
      search(prev: TPath): TPath {
        return { ...prev, ...patch }
      },
      replace: true,
    })
  }

  return {
    setParam,
  }
}
