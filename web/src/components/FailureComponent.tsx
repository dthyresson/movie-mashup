import { CellFailureProps } from '@redwoodjs/web'

const FailureComponent = ({ error }: CellFailureProps) => (
  <div className="flex h-[80vh] items-center justify-center font-movie-title text-2xl text-red-500">
    Error: {error?.message}
  </div>
)

export default FailureComponent
