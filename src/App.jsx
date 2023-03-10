import  '../styles/globals.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Demo from './pages/Demo';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Demo />
  }
])

function MyApp() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default MyApp
