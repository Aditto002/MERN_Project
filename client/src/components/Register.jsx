import { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Oauth from './Oauth';

const Register = () => {
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef(null);

  let usernameRef, passwordRef, emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    let username = usernameRef.value;
    let password = passwordRef.value;
    let email = emailRef.value;
    var namepattern= /[a-zA-Z.]/;
    var emailpattern= /^([\w]*[\w\.]*(?!\.)@gmail.com)/;
    var passpattern= /((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*><?()*&+_])).{8,20}/;

    if(username.length<2 || username.length>20){
      
      document.getElementById("efname").innerHTML="length must be 2-20";
      return false;
  }
  else if(!username.match(namepattern)){
      
      document.getElementById("efname").innerHTML="invalid input";
      return false;
  }
  else{
      document.getElementById("efname").innerHTML="";
      
  }

if(!email.match(emailpattern)){
  document.getElementById("eemail").innerHTML="invalid input";
  return false;
}
else{
 
  document.getElementById("eemail").innerHTML="";
  
}

if(!password){
  document.getElementById("epass").innerHTML="Password is required";
  return false;
}
else if(!password.match(passpattern)){

  document.getElementById("epass").innerHTML="invalid input";
  return false;
}
else{
  document.getElementById("epass").innerHTML="";
  
}

setLoading(true);
setError(false);

    let formData = {
      username: username,
      password: password,
      email: email
    }
    // console.log(formData) 
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log(res.data);
      setLoading(false);
      if(res.data.success === 'false'){
        setError(true);
        return;
      }
      setError(false);
      formRef.current.reset();
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error('Error:', error);
    }
  };

  return (
    <div className='container mx-auto mt-5'>
      <div className='flex items-center justify-center'>
        <div className='bg-slate-200 rounded-lg shadow-lg w-full md:w-[60%] lg:w-[40%] xl:w-[30%]'>
          <div className='flex flex-col items-center'>
            <h3 className='text-3xl md:text-5xl font-bold mt-10'>Sign Up</h3>
            <span className='py-4 text-lg md:text-xl w-2/3 text-center text-gray-400'>Make your own account and Connected with us...</span>
          </div>
          <form className='py-1'ref={formRef}>
            <div className='textbox flex flex-col items-center gap-4'>
              <input id='username' ref={(input)=> usernameRef = input} className='bg-slate-100 border-0 px-3 py-2 rounded-xl w-3/4 md:w-3/4 shadow-sm text-lg focus:outline-none' type="text" placeholder='Username' />
              <span id='efname'></span>
              <input id='email' ref={(input)=> emailRef = input} className='bg-slate-100 border-0 px-3 py-2 rounded-xl w-3/4 md:w-3/4 shadow-sm text-lg focus:outline-none' type="email" placeholder='email' />
              <span id='eemail'></span>
              <input id='password'ref={(input)=> passwordRef = input} className='bg-slate-100 border-0 px-3 py-2 rounded-xl w-3/4 md:w-3/4 shadow-sm text-lg focus:outline-none' type="password" placeholder='password' />
              <span id='epass'></span>
              <button type='submit' onClick={handleSubmit} className='bg-teal-500 rounded-xl text-lg text-gray-300 shadow-md w-3/4 h-10 hover:bg-teal-600' disabled={loading}>{loading?"LOADING...": "Sign Up"}</button>
               <Oauth></Oauth>
            </div>
            <div className='flex justify-center my-3'>
              <p className='text-red-500' >{error && "Somthing is wrong!"}</p>
            </div>
            <div className='flex justify-center my-3'>
        
              <p>
                Have an account ? <span className='text-red-500'><Link to='/signin'>sign in</Link></span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
