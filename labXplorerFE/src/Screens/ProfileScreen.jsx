import React from 'react'

import { logoutUser } from '../Slices/userSlice';

import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from "react";

export const ProfileScreen = () => {

  const {user} = useSelector((state)=>state.userSlice);

  const navigator =useNavigate()

  useEffect(()=>{
    if(Object.keys(user).length<1)
      {
          navigator('/login')
      }
  },[])

  
  const dispatch=useDispatch();

  const logoutHandler=(e)=>{
    e.preventDefault()
    dispatch(logoutUser())
    navigator('/login')
  }
  return (
    <>
    <div>ProfileScreen</div>
    <button onClick={logoutHandler}>Logout</button>
    </>
  )
}
