import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Username from '../components/Username.jsx'
import Register from "../components/Register.jsx"
import Main from '../Shared/Main.jsx'
import Profile from "../components/Profile.jsx"
import SignIn from "../components/SignIn.jsx"
import About from "../components/About.jsx"
import Home from "../components/Home.jsx"
import Gallery from "../components/Gallery.jsx"
import Contact from '../components/Contact.jsx'
import PrivateRoute from '../components/PrivateRoute.jsx'

import EmailVerify from '../components/EmailVerify/EmailVerify.jsx'
import OTPVerification from '../components/OtpVerification/OtpVerification.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/profile',
        element:<Profile></Profile>
      },
      {
        path:'/gallery',
        element:<Gallery></Gallery>
      },
      {
        path:'/signIn',
        element:<SignIn></SignIn>
      },
      {
        path:'/about',
        element:<About></About>
      },
      {
        path:'/contact',
        element:<Contact></Contact>
      },
      {
        path:'/emailverify',
        element:<EmailVerify></EmailVerify>
      },
      {
        path:'/otpVerification',
        element:<OTPVerification></OTPVerification>
      },
      

    ]
  }
  
])
export default router