import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppContextProvider from './context/AppContextProvider'
import { ConfigProvider } from 'antd'
import { theme } from 'antd'
import './style.scss'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Menu from './pages/Menu'
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
        path: '/menu',
        element: <Menu/>
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
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
      <RouterProvider  router={router}/>
    </ConfigProvider>
  </AppContextProvider>
)
