import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import axios from 'axios';
import { updateUserStart,updateUserSuccess,updateUserFailur,deleteUserStart,deleteUserSuccess,deleteUserFailur,signOut } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const naigate =useNavigate();
  const dispatch = useDispatch();
  let {usernameRef,emailRef,passwordRef}=useRef();
  const { currentUser} = useSelector(state =>state.user)
  const [image , setImage] = useState(undefined);
  const [imageUpload, setImageUpload] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData , setFormData] = useState({});
  console.log(formData)

  console.log(imageUpload);
  
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setImageUpload(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.error('Error uploading file:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handldeletedAccount = async()=>{
    try {
      dispatch(deleteUserStart());
      
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    console.log(currentUser._id)
      const res = await axios.delete(`http://localhost:5000/api/user/delete/${currentUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken 
        }
      });
      console.log("Response data:",res.data);
      dispatch(deleteUserSuccess(res.data));
      naigate('/register')
  } catch (e) {
      dispatch(deleteUserFailur(e));
  }

  }
  

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        dispatch(updateUserStart())
        let username = usernameRef.value;
        let email = emailRef.value;
    let password = passwordRef.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      username: username,
      email: email,
      password: password
    }));
    const accessToken = localStorage.getItem("token")
    // console.log(accessToken)
    // console.log(formData)
        const res = await axios.post(`http://localhost:5000/api/user/update/${currentUser._id}`,formData,{
          headers: {
            'Content-Type': 'application/json', // example header
            'Authorization': 'Bearer ' + accessToken // example header
          }
        }
  ).then((res)=>{
    console.log("res data",res.data.data)
    dispatch(updateUserSuccess(res.data.data))
  })
        // if(res.data.success === 'false'){
        //   dispatch(updateUserFailur(res.data));
        //   return;
        // }
        // console.log("res data",res.data)
        // dispatch(updateUserSuccess(res.data))
      }
      catch(err){
        dispatch(updateUserFailur(err))
      }
    }
    const hendleSignout = async() =>{
      try {
        naigate('/register');
        await fetch('/api/user/signout')
        // dispatch(signOut());
    } catch (e) {
        console.log(e);
    }
    }


  const fileRef = useRef();
  return (
    <div className='bg-slate-300  w-[60%] rounded-lg my-7 py-10 mx-auto'>
      <button onClick={handldeletedAccount} className='bg-red-500 text-white p-1 rounded-lg mt-[-10px] '>delete account</button>
    <h1 className='text-5xl font-semibold text-green-400 text-center mb-10'>Profile</h1>
    <form >
         <div className='flex justify-between w-[60%] mx-auto'>
         <div className='flex flex-col  gap-8'>
            <input id='username' ref={(input)=>usernameRef = input}  defaultValue={currentUser.username}   className='bg-slate-100 border-0 px-3 py-2 rounded-xl  w-[300px] md:w-[300px]shadow-sm text-lg focus:outline-none' type="text" placeholder='UserName' />
            <input id='email' ref={(input)=>emailRef = input}  defaultValue={currentUser.email} className='bg-slate-100 border-0 px-3 py-2 rounded-xl  w-[300px] md:w-[300px] shadow-sm text-lg focus:outline-none' type="email" placeholder='Email' />
            <input id='password'ref={(input)=>passwordRef = input}  className='bg-slate-100 border-0 px-3 py-2 rounded-xl w-[300px] md:w-[300px] shadow-sm text-lg focus:outline-none' type="password" placeholder='Password' />
            <button type='submit' onClick={handleSubmit} className='bg-teal-500 rounded-xl text-lg text-gray-300 shadow-md w-[300px] h-10 hover:bg-teal-600' >UPDATE</button>
          </div>



          <div className='items-center' >
          <div className=' flex flex-col items-center gap-3'>
          <input type="file" ref={fileRef} hidden  accept='image/*' onChange={(e)=> setImage(e.target.files[0])}/>
          <img onClick={()=>fileRef.current.click()} src={formData.profilePicture ||  currentUser.profilePicture} alt="profile" className='w-28 h-28 mt-10  cursor-pointer rounded-full object-cover ' />
        <p className='text-sm text-center self-center'>{
          imageError ? (<span className='text-red-700'>Error uploading image</span>) : imageUpload > 0 && imageUpload < 100 ? (<span className='text-slate-700'>{`'Uploading:' ${imageUpload} '%'`}</span>) : imageUpload===100 ? (<span className='text-green-700'>Image uploaded successfully</span>): ""
          }</p>
          </div>
        <button type='submit'className='bg-teal-500 rounded-xl text-lg text-gray-300 shadow-md w-[120px] h-10 hover:bg-teal-600 mt-12  ' onClick={hendleSignout} >Sign Out</button>
        </div>
        
        </div>
    </form>
    
    </div>
  )
}

export default Profile