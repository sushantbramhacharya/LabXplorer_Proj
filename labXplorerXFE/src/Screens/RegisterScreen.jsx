// pages/login.js
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../api/userApi";
import { setCredentials } from '../Slices/userSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState('')
  const [password,setPassword]=useState('')
  const [cpassword,setCpassword]=useState('')
  const [email,setEmail]=useState('')

  const {user} = useSelector((state)=>state.userSlice);

  const navigator =useNavigate()

  useEffect(()=>{
    if(Object.keys(user).length>0)
      {
          navigator('/')
      }
  },[])

  const [register,{isLoading}]=useRegisterMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password validation (at least 8 characters, includes at least 1 number)
    const passwordRegex = /^(?=.*[0-9])(?=.{8,})/;
  
    if (cpassword === password) {
      if (passwordRegex.test(password)) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
          try {
            // Proceed with registration
            const res = await register({ username, email, password }).unwrap();
            if (res) {
              alert(res.success);
            }
          } catch (err) {
            alert("Recheck email or username might already exist");
          }
        } else {
          alert("Enter a valid Email");
        }
      } else {
        alert("Password must be at least 8 characters long and contain at least 1 number");
      }
    } else {
      alert("Password Mismatch");
    }
  };
  

  return (
    <div className="bg-gray-800 text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <Link
        className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2"
        to="/"
      >
        <div>
          <img src='/logo.png' width={40} height={40}/>
        </div>
        LabXplorerX
      </Link>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Register
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              New to LabXplorerX!! Create an Account to continue
            </p>
          </div>
          <div className="p-6 pt-0">
            <form>
              <div>
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Username
                    </label>
                    <div className="absolute right-3 translate-y-2 text-green-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        {/* <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        /> */}
                      </svg>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="off"
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Email
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="example@example.com"
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Password
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Confirm Password
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="password"
                      name="password"
                      value={cpassword}
                      onChange={(e)=>setCpassword(e.target.value)}
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                >
                  Login
                </Link>
                <button
                  className="font-semibold hover:bg-gray-800 hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-800 h-10 px-4 py-2" onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
