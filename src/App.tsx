import { RouterProvider } from 'react-router'
import { router } from './routes'
import { PageLoader } from './PageLoader'

export default function App() {
  return (
    <>
      <PageLoader />
      <RouterProvider router={router} />
    </>
  )
}
