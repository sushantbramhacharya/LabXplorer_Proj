import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Phaser.css'
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
import { Provider } from 'react-redux';
import store from './store.js';
import { ProfileScreen } from './Screens/ProfileScreen.jsx';
import ChemistryLabScreen from './Screens/ChemistryLabScreen.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Welcome/>} />
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>}/>
      <Route path='profile' element={<ProfileScreen/>}/>
      <Route path='chemistry-lab' element={<ChemistryLabScreen/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <RouterProvider router={router}/>
  </Provider>
)
