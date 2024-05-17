import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider } from 'react-router-dom'
import AppRoutes from './base/routes/PageRoutes'


function App() {

  return (
    <RouterProvider router={AppRoutes}/>
  )
}

export default App
