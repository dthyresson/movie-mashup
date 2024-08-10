import { CellFailureProps } from '@redwoodjs/web'

const FailureComponent = ({ error }: CellFailureProps) => (
  <div className="flex h-[80vh] flex-col items-center justify-center font-movie-title text-2xl text-red-500">
    <div className="mb-4 text-4xl">Error</div>
    <div>{error?.message}</div>
  </div>
)

export default FailureComponent
