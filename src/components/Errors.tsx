type Props = {
  message: string
}
export const Errors = ({ message }: Props) => {
  return (
    <div className="rounded-md border p-4 text-red-600">Error: {message}</div>
  )
}
