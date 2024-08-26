import React from 'react'

import { logoutUser } from '../Slices/userSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from "react";

// Components
import NavBar from '../Components/NavBar';

import MainContent from '../Components/Profile/MainContext';
import {ToastContainer,toast} from 'react-toastify';

export const ProfileScreen = () => {

  const {user} = useSelector((state)=>state.userSlice);

  const navigator =useNavigate()

  useEffect(()=>{
    if(user)
    {
      if(Object.keys(user).length<1)
      {
        navigator('/')
      }
    }
    else{
      navigator('/')
    }
  },[user])

  
  
  return (
    <>
    <ToastContainer/>
    <NavBar/>
    <div className='bg-gray-700 min-w-screen min-h-screen flex '>
    <MainContent />
    </div>
    </>
  )
}
