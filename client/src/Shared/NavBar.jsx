
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const { currentUser} = useSelector(state =>state.user)
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl  mx-auto p-3 '>
            <Link to="/">
            <h1 className='font-bold text-4xl'>ExploreConnect</h1>
            </Link>
            
            <ul className='flex gap-4 font-medium cursor-pointer'>
                <Link to='/'><li >Home</li></Link>
                <Link to="/gallery"><li >Gallery</li></Link>
                <Link to="/about"><li >About</li></Link>
                <Link to="/contact"><li >Contact</li></Link>
                <Link to="/profile">
                  {currentUser ? (
                    <Link to="/profile">  <img src={currentUser.profilePicture} alt="Profile" className='h-8 w-8 rounded-full object-cover'/></Link>
                      
                  ):
                  (

                  <Link to ='/signIn' ><li >Sign In</li></Link>
                  )}
                  </Link>
            </ul>
        </div>
        
    </div>
  )
}

export default NavBar