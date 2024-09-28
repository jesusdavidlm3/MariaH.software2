import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppContextProvider from './context/AppContextProvider'
import './style.scss'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import page2 from './pages/page2'
import page3 from './pages/page3'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/ch2',
        element: <page2/>
      },
      {
        path: '/ch3',
        element: <page3/>
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <RouterProvider  router={router}/>
  </AppContextProvider>
)
