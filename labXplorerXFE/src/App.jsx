import { Outlet } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Welcome from './Screens/Welcome'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
    <ToastContainer/>
    <Outlet/>
    </>
  )
}

export default App
