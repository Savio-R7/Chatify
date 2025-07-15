import './App.css'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './pages/Root'
import Error from './pages/Error'
import Home from './pages/Home'
import Loading from './pages/Loading'

import ContextWrapper from './contexts/ContextWrapper'

const Application = lazy(() => import('./pages/Application'))

const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/app',
            element: <Suspense fallback={<Loading />}><Application /></Suspense>
        },
        {
            path: '/loading',
            element: <Loading />
        }
    ]
}])

function App() {
  return (
    <ContextWrapper>
        <RouterProvider router={router} />
    </ContextWrapper>
  )
}

export default App
