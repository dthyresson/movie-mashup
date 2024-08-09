import { Toaster } from '@redwoodjs/web/toast'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="container mx-auto">
      <Toaster />
      {children}
    </main>
  )
}

export default MainLayout
