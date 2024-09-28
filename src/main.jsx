import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import appContextProvider from './context/contextProvider'
import { Root } from './pages/root'
import { errorPage } from './pages/errorPage'
import { page1 } from './pages/page1'
import { page2 } from './pages/page2'
import { page3 } from './pages/page3'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <errorPage/>,
    children: [
      {
        path: '/ch1',
        element: <page1/>
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
  <appContextProvider>
    <RouterProvider  router={router}/>
  </appContextProvider>
)
