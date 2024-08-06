import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Phaser.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Welcome from "./Screens/Welcome.jsx";
import Login from "./Screens/LoginScreen.jsx";
import Register from "./Screens/RegisterScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { ProfileScreen } from "./Screens/ProfileScreen.jsx";
import LabScreen from "./Screens/LabScreen.jsx";
import { AdminScreen } from "./Screens/AdminScreens/AdminScreen.jsx";
import { MainScreen } from "./Screens/AdminScreens/MainScreen.jsx";
import { AddCapsules } from "./Screens/AdminScreens/AddCapsulesScreen.jsx";
import GravitySim from "./Components/Labs/PhysicsSim/GravitySim.jsx";
import LearningAreaScreen from "./Screens/LearningAreaScreen.jsx";
import AboutScreen from "./Screens/AboutScreen.jsx";
import CapsulesScreen from "./Screens/CapsulesScreen.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<ProfileScreen />} />
      <Route path="about" element={<AboutScreen />} />
      <Route path="sims/" element={<LabScreen />}>
        <Route path="gravity" element={<GravitySim />} />
      </Route>
      <Route path="learning-area" element={<LearningAreaScreen />} />
      <Route path="capsules/:category" element={<CapsulesScreen/>}/>
      <Route path="admin/" element={<AdminScreen />}>
        <Route path="" element={<MainScreen />} />
        <Route path="add" element={<AddCapsules />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
