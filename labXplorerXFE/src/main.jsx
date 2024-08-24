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
import GravitySim from "./Components/Simulations/PhysicsSim/GravitySim.jsx";
import LearningAreaScreen from "./Screens/LearningAreaScreen.jsx";
import AboutScreen from "./Screens/AboutScreen.jsx";
import CapsulesScreen from "./Screens/CapsulesScreen.jsx";
import SingleCapsuleScreen from "./Screens/SingleCapsuleScreen.jsx";
import DonateScreen from "./Screens/DonateScreen.jsx";
import AtomSimulator from "./Components/Simulations/ChemistrySim/AtomSim.jsx";
import SimulatorsScreen from "./Screens/SimulatorsScreen.jsx";
import SolarSystemSimulator from "./Components/Simulations/AstronomySims/SolarSystemSimulator.jsx";
import OhmsLawSimulator from "./Components/Simulations/ElectronicsSims/OhmsLawSimulator.jsx";
import JSCodeEditor from "./Components/Simulations/ComputerSims/JavaScriptEditor.jsx";
import SimulationScreen from "./Screens/AdminScreens/SimulationScreen.jsx";
import AddQuizScreen from "./Screens/AdminScreens/AddQuizScreen.jsx";
import QuizScreen from "./Screens/QuizScreen.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SearchResultsScreen from "./Screens/SearchResultsScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<ProfileScreen />} />
      <Route path="about" element={<AboutScreen />} />
      <Route path="donate" element={<DonateScreen/>}/>
      <Route path="/simulations" element={<SimulationScreen/>}/>
      <Route path="quiz/:capsuleId" element={<QuizScreen/>}/>
      <Route path="search/:searchName" element={<SearchResultsScreen/>}/>
      <Route path="sims/" element={<LabScreen />}>
        <Route path='' element={<SimulatorsScreen/>}/>
        <Route path="gravity" element={<GravitySim />} />
        <Route path="atom" element={<AtomSimulator/>}/>
        <Route path="solarsystem" element={<SolarSystemSimulator/>}/>
        <Route path="ohmslaw" element={<OhmsLawSimulator/>}/>
        <Route path="javascript" element={<JSCodeEditor/>}/>
      </Route>
      <Route path="learning-area" element={<LearningAreaScreen />} />
      <Route path="capsules/:category" element={<CapsulesScreen/>}/>
      <Route path="capsule/:id" element={<SingleCapsuleScreen/>}/>
      <Route path="admin/" element={<AdminScreen />}>
        <Route path="" element={<MainScreen />} />
        <Route path="add" element={<AddCapsules />} />
        <Route path="add-quiz" element={<AddQuizScreen/>}/>
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
);