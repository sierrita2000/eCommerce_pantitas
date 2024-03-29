import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inicio, { loader as loaderInicio } from './components/Inicio/inicio'
import Principal from './components/Inicio/principal'
import Productos, { loaderAnimales, loaderBusqueda, loaderDecoraciones, loaderPlantas } from './components/Productos/productos'
import SliderProductos, { loader as loaderSlider } from './components/Productos/slider_productos'
import Login, { actionLogin, actionSignup } from './components/login_signup/login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
    loader: loaderInicio,
    children: [
      {
        index: true,
        element: <Principal />
      },
      {
        path: "/plantas",
        element: <Productos />,
        loader: loaderPlantas,
        children: [
          {
            path: "/plantas/:id_producto",
            element: <SliderProductos />,
            loader: loaderSlider
          }
        ]
      },
      {
        path: "/animales",
        element: <Productos />,
        loader: loaderAnimales,
        children: [
          {
            path: "/animales/:id_producto",
            element: <SliderProductos />,
            loader: loaderSlider
          }
        ]
      },
      {
        path: "/decoracion",
        element: <Productos />,
        loader: loaderDecoraciones,
        children: [
          {
            path: "/decoracion/:id_producto",
            element: <SliderProductos />,
            loader: loaderSlider
          }
        ]
      },
      {
        path: "/busqueda-productos/:titulo",
        element: <Productos />,
        loader: loaderBusqueda
      },
      {
        path: "/log-in",
        element: <Login login={true} />,
        action: actionLogin
      },
      {
        path: "/sign-up",
        element: <Login login={false} />,
        action: actionSignup
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
