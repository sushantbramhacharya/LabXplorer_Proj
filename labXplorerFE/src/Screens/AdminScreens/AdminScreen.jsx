import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/NavBar'

export const AdminScreen = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}
