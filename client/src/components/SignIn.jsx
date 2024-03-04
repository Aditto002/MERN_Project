import { useState, useRef } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Username from './Username';

const SignIn = () => {


  const naigate =useNavigate()
  const formRef = useRef(null);
const [loading,setLoading] = useState(false);
const[error,setError] = useState(false);
let {emailRef,passwordRef}=useRef();
const handleSubmit =async(e)=>{
  e.preventDefault()

  try{
    setLoading(true);
    let email = emailRef.value;
    let password = passwordRef.value;
    let formData ={
      email: email,
      password: password
    }
    const res = await axios.post('http://localhost:5000/api/auth/signin',formData);
    setLoading(false);
    if(res.data.success === 'false'){
      setError(true);
      return;
    }
    setError(false);
    formRef.current.reset();
    naigate('/')
  }
  catch(error){
    setLoading(false);
    setError(true);
    console.error('Error:', error);
  }
}


  return (
   
    <div className='container mx-auto mt-5'>
    <div className='flex items-center justify-center'>
      <div className='bg-slate-200 rounded-lg shadow-lg w-full md:w-[60%] lg:w-[40%] xl:w-[30%]'>
        <div className='flex flex-col items-center'>
          <h3 className='text-3xl md:text-5xl font-bold mt-10'>Sign In</h3>
          <span className='py-4 text-lg md:text-xl w-2/3 text-center text-gray-400'>Welcome Back...</span>
        </div>
        <form className='py-1'ref={formRef}>
          <div className='textbox flex flex-col items-center gap-4'>
            <input id='email' ref={(input)=>emailRef = input}  className='bg-slate-100 border-0 px-3 py-2 rounded-xl w-3/4 md:w-3/4 shadow-sm text-lg focus:outline-none' type="email" placeholder='email' />
            <input id='password' ref={(input)=>passwordRef = input} className='bg-slate-100 border-0 px-3 py-2 rounded-xl w-3/4 md:w-3/4 shadow-sm text-lg focus:outline-none' type="password" placeholder='password' />
            <button type='submit'onClick={handleSubmit} className='bg-teal-500 rounded-xl text-lg text-gray-300 shadow-md w-3/4 h-10 hover:bg-teal-600' disabled={loading} >{loading? 'loading...': 'Sign In'}</button>
            <button type='button' className='bg-yellow-500 rounded-xl text-lg text-gray-300 shadow-md w-3/4 h-10 hover:bg-yellow-600'>continue with google</button>
          </div>
          <div className='flex justify-center my-3'>
            <p className='text-red-500' >{error && "Somthing is wrong!"}</p>
          </div>
          <div className='flex justify-center my-3'>
      
            <p>
             Don't Have an account ? <span className='text-red-500'><Link to='/register'>sign Up</Link></span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default SignIn
