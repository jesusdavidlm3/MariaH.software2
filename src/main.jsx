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
import Employes from './pages/Employes'
import Clients from './pages/Clientes'
import Facturacion from './pages/Facturacion'
import Ventas from './pages/Ventas'
import Inventario from './pages/Inventario'

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
        path: '/Employes',
        element: <Employes/>
      },
      {
        path: '/Clients',
        element: <Clients/>
      },
      {
        path: '/Facturacion',
        element: <Facturacion/>
      },
      {
        path: '/Ventas',
        element: <Ventas/>
      },
      {
        path: '/Inventario',
        element: <Inventario/>
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
