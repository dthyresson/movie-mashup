import { CellFailureProps } from '@redwoodjs/web'

const FailureComponent = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export default FailureComponent
