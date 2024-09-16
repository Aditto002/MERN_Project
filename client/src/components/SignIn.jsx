import { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loginAvatarAnimation from '.././assets/ani.json';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Oauth from './Oauth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const SignIn = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  let emailRef = useRef();
  let passwordRef = useRef();
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let email = emailRef.current.value;
      let password = passwordRef.current.value;
      let formData = {
        email: email,
        password: password,
      };
      console.log(formData);
      const res = await axios.post('http://localhost:5000/api/auth/signin', formData);
      localStorage.setItem("token", res?.data?.data?.token);
      console.log(res);
      ////////////////////////////////////////////////////////
      if(res.data.data.user.isVerified === true){
        dispatch(signInSuccess(res.data.data.user));
        if(res.data.status == 'success'){
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Sing in successfully"
          });
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Something went wrong!"
          });
        }
        
  
        navigate('/');
        formRef.current.reset();

      }
      else{
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Email Not Verified, Verify Email first"
        });
        navigate('/otpVerification', { state: { email } });
      }
      
    } catch (error) {
      dispatch(signInFailure(error));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Something went wrong!"
      });
      console.error("Sign-in error: ", error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className='font-[sans-serif] bg-white flex items-center justify-center md:h-screen p-4'>
      <div className='shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl max-md:max-w-lg rounded-md p-6'>
        <a href='javascript:void(0)'>
          <img src='https://readymadeui.com/readymadeui.svg' alt='logo' className='w-40 md:mb-4 mb-12' />
        </a>

        <div className='grid md:grid-cols-2 items-center gap-8'>
          <div className='max-md:order-1 lg:min-w-[450px]'>
            <Lottie animationData={loginAvatarAnimation} loop={true} />
          </div>

          <form className='md:max-w-md w-full mx-auto' ref={formRef} onSubmit={handleSubmit}>
            <div className='mb-12'>
              <h3 className='text-4xl font-extrabold text-blue-600'>Sign in</h3>
            </div>

            <div>
              <div className='relative flex items-center'>
                <input
                  id='email'
                  ref={emailRef}
                  name='email'
                  type='email'
                  required
                  className='w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none'
                  placeholder='Enter email'
                />
              </div>
            </div>

            <div className='mt-8'>
              <div className='relative flex items-center'>
                <input
                  id='password'
                  ref={passwordRef}
                  name='password'
                  type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                  required
                  className='w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none'
                  placeholder='Enter password'
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash} // Use FontAwesomeIcon for eye/eye-slash
                  className='absolute right-2 cursor-pointer'
                  onClick={togglePasswordVisibility} // Toggle password visibility on click
                />
              </div>
            </div>

            <div className='mt-12'>
              <button
                type='submit'
                className='w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none mb-5'
                disabled={loading}
              >
                {loading ? 'loading...' : 'Sign In'}
              </button>
              <Oauth></Oauth>
              <p className='text-gray-800 text-sm text-center mt-6'>
                Don't have an account?{' '}
                <Link to='/register' className='text-blue-600 font-semibold hover:underline ml-1'>
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
