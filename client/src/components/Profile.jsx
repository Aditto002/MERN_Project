import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser} = useSelector(state =>state.user)
  return (
    <div className='bg-slate-300  w-[60%] rounded-lg my-7 py-10 mx-auto'>
      <button className='bg-red-500 text-white p-1 rounded-lg mt-[-10px] '>delete account</button>
    <h1 className='text-5xl font-semibold text-green-400 text-center mb-10'>Profile</h1>
    <form >
         <div className='flex justify-between w-[60%] mx-auto'>
         <div className='flex flex-col items-start gap-8'>
            <input id='email' defaultValue={currentUser.username}   className='bg-slate-100 border-0 px-3 py-2 rounded-xl  w-[300px] md:w-[300px]shadow-sm text-lg focus:outline-none' type="text" placeholder='UserName' />
            <input id='password' defaultValue={currentUser.email} className='bg-slate-100 border-0 px-3 py-2 rounded-xl  w-[300px] md:w-[300px] shadow-sm text-lg focus:outline-none' type="email" placeholder='Email' />
            <input id='password' className='bg-slate-100 border-0 px-3 py-2 rounded-xl w-[300px] md:w-[300px] shadow-sm text-lg focus:outline-none' type="password" placeholder='Password' />
            <button type='submit'className='bg-teal-500 rounded-xl text-lg text-gray-300 shadow-md w-[300px] h-10 hover:bg-teal-600' >UPDATE</button>
          </div>



        <div ><img src={currentUser.profilePicture} alt="profile" className='w-28 h-28 mt-10  cursor-pointer rounded-full object-cover ' />
        <button type='submit'className='bg-teal-500 rounded-xl text-lg text-gray-300 shadow-md w-[120px] h-10 hover:bg-teal-600 mt-[75px]' >Sign Out</button>
        </div>
        
        </div>
    </form>
    
    </div>
  )
}

export default Profile