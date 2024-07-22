import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Welcome from './Screens/Welcome.jsx';
import Login from './Screens/LoginScreen.jsx';
import Register from './Screens/RegisterScreen.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Welcome/>} />
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
