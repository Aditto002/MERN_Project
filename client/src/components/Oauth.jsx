import React from 'react'
import axios from 'axios';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import {  useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'

const Oauth = () => {
    const dispatch = useDispatch();
    const handlGoogle = async()=>{
        try{
         const provider = new GoogleAuthProvider()
         const auth = getAuth(app);
         const result = await signInWithPopup(auth,provider)
         console.log(result)
         const res = await axios.post('http://localhost:5000/api/auth/google',{
          name:result.user.displayName,
          email:result.user.email,
          photo: result.user.photoURL
         });
         console.log(result)
         console.log(result.user.email)
         console.log(result.user.photoURL)
         dispatch(signInSuccess(res))
        }
        catch(e){
         console.log("could not login with google", e)
        }
    }
  return (
    <button type='button' onClick={handlGoogle} className='bg-yellow-500 rounded-xl text-lg text-gray-300 shadow-md w-3/4 h-10 hover:bg-yellow-600'>continue with google</button>

  )
}

export default Oauth