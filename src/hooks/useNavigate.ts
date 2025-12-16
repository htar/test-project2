import { useNavigate } from '@tanstack/react-router'

export const _useNavigate = () => {
  const navigate = useNavigate()

  const setSearch = (
    patch: Partial<{
      page: number
      q: string
      status: string
    }>,
  ) => {
    navigate({
      search: (prev: any) => ({ ...prev, ...patch }),
      replace: true,
    })
  }

  const setParam = (k: 'q' | 'status', v: string, navigateTo: string) =>
    setSearch({ [k]: v, page: 1, navigateTo }, navigateTo)

  return {
    setParam,
    setSearch,
  }
}
