import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logoutUser } from '../Slices/userSlice';
import { ToastContainer,toast } from 'react-toastify';
import { BASE_URL } from '../constants';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const dispatch=useDispatch();
  const {user} = useSelector((state)=>state.userSlice);

  

  const logoutHandler=async(e)=>{
    e.preventDefault()
    await fetch(BASE_URL+"/user/logout",{
      credentials: 'include',
    })
    dispatch(logoutUser())
    .then(() => {
      // Notify success
      toast.success("Logout Successful");
      location.href='/'
      navigate('/');
    })
    .catch((error) => {
      // Handle any potential errors here
      toast.error("Logout failed. Please try again.");
    });
  }

  return (
    <>
      <ToastContainer/>
    <nav className="flex items-center bg-gray-800 px-20 p-3 flex-wrap">
      <Link to="/" className="p-2 mr-4 inline-flex items-center">
       <img className='mr-4' src='/logo.png' width={40} height={40}/>
        <span className="text-xl text-white font-bold tracking-wide">
          LabXplorer
        </span>
      </Link>
      <button
        className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        onClick={handleToggle}
      >
        <RxHamburgerMenu size={25} />
      </button>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        id="navigation"
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center gap-5 items-start flex flex-col lg:h-auto mr-14">
          <div className="relative lg:inline-block lg:w-auto w-full px-3 py-2">
            <input
              type="text"
              placeholder="Search Here..."
              className="w-full px-4 py-2 rounded-xl outline-none text-gray-800 bg-gray-300 placeholder-gray-500"
            />
            <button className="absolute right-0 top-0 mt-4 mr-5 text-gray-400 hover:text-gray-600">
            <CiSearch size={25} fill='black'/>
            </button>
            
          </div>
            <Link to='/simulations' className='font-semibold'>
            Simulations
            </Link>
            <Link to='/about' className='font-semibold'>
            About LabXplorer
            </Link>
            <Link to='/learning-area' className='font-semibold'>
            Learning Capsules
            </Link>
          {!user?.username?
          <Link
            to="/login"
            className="lg:inline-block lg:w-auto w-full px-3 py-2 rounded-xl text-gray-300 items-center justify-center bg-gray-600 hover:bg-gray-700 hover:text-white"
          >
            <span>Login</span>
          </Link>:
          <>
          <a
          onClick={logoutHandler}
          className="lg:inline-block lg:w-auto w-full px-3 py-2 rounded-xl text-gray-300 items-center justify-center bg-red-600 hover:bg-red-700 hover:text-white"
        >
          <span>Logout</span>
        </a>
       
        </>}
        {user?.email=="admin@labxplorer.com"?<Link
          to='/admin'
          className="lg:inline-block lg:w-auto w-full px-3 py-2 rounded-xl text-gray-300 items-center justify-center bg-green-600 hover:bg-green-700 hover:text-white"
        >
          <span>Admin</span>
        </Link>:<></>}
        </div>
      </div>
    </nav>
    </>
  );
};

export default NavBar;
