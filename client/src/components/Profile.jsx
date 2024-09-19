import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios';
import { updateUserStart, updateUserSuccess, updateUserFailur, deleteUserStart, deleteUserSuccess, deleteUserFailur, signOut } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { usernameRef, emailRef, passwordRef } = useRef();
  const { currentUser } = useSelector(state => state.user)
  const [image, setImage] = useState(undefined);
  const [imageUpload, setImageUpload] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData)

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

  const handleDeletedAccount = async () => {
    try {
      dispatch(deleteUserStart());

      const accessToken = localStorage.getItem("token");
      console.log(accessToken);
      console.log(currentUser._id);
      const res = await axios.delete(`http://localhost:5000/api/user/delete/${currentUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      });
      console.log("Response data:", res.data);
      dispatch(deleteUserSuccess(res.data));
      navigate('/register')
    } catch (e) {
      dispatch(deleteUserFailur(e));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      let username = usernameRef.value;
      let email = emailRef.value;
      let password = passwordRef.value;

      let updatedData = {
        username: username,
        email: email
      };

      if (password) {
        updatedData.password = password;
      }

      setFormData(prevFormData => ({
        ...prevFormData,
        ...updatedData
      }));

      const accessToken = localStorage.getItem("token");
      console.log(accessToken);
      console.log(formData);

      const res = await axios.post(
        `http://localhost:5000/api/user/update/${currentUser._id}`,
        { ...formData, ...updatedData },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        }
      ).then((res) => {
        console.log("res data", res);
        dispatch(updateUserSuccess(res.data.data));

        if (res.status === 200) {
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
            title: "Profile updated successfully"
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
      });

    } catch (err) {
      dispatch(updateUserFailur(err));
    }
  };

  const handleSignout = async () => {
    try {
      navigate('/register');
      localStorage.removeItem("token");
      dispatch(signOut());
    } catch (e) {
      console.log(e);
    }
  }

  const fileRef = useRef();

  return (
    <div className='bg-white shadow-lg w-[60%] rounded-lg my-7 py-10 mx-auto border-t-4 border-indigo-600'>
      <div className="flex justify-between items-center mb-6 px-6">
        <h1 className='text-5xl font-bold text-indigo-600'>Profile</h1>
        <button onClick={handleDeletedAccount} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg'>Delete Account</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between w-[80%] mx-auto'>
          <div className='flex flex-col gap-6'>
            <input 
              id='username' 
              ref={(input) => usernameRef = input} 
              defaultValue={currentUser.username} 
              className='bg-gray-100 border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-indigo-500 focus:outline-none text-lg shadow-sm w-full'
              type="text" 
              placeholder='Username' 
            />
            <input 
              id='email' 
              ref={(input) => emailRef = input} 
              defaultValue={currentUser.email} 
              className='bg-gray-100 border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-indigo-500 focus:outline-none text-lg shadow-sm w-full'
              type="email" 
              placeholder='Email' 
            />
            <input 
              id='password' 
              ref={(input) => passwordRef = input} 
              className='bg-gray-100 border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-indigo-500 focus:outline-none text-lg shadow-sm w-full'
              type="password" 
              placeholder='Password' 
            />
            <button 
              type='submit' 
              className='bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-8 rounded-lg hover:from-indigo-600 hover:to-purple-600 shadow-md transition duration-300'
            >
              Update Profile
            </button>
          </div>

          <div className='flex flex-col items-center gap-6'>
            <input 
              type="file" 
              ref={fileRef} 
              hidden 
              accept='image/*' 
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img 
              onClick={() => fileRef.current.click()} 
              src={formData.profilePicture || currentUser.profilePicture} 
              alt="profile" 
              className='w-36 h-36 rounded-full object-cover shadow-lg cursor-pointer hover:opacity-90 transition duration-300'
            />
            <p className='text-sm text-center self-center'>
              {
                imageError 
                  ? <span className='text-red-500'>Error uploading image</span> 
                  : imageUpload > 0 && imageUpload < 100 
                    ? <span className='text-gray-600'>{`Uploading: ${imageUpload}%`}</span> 
                    : imageUpload === 100 
                      ? <span className='text-green-500'>Image uploaded successfully</span> 
                      : ""
              }
            </p>
            <button 
              type='button' 
              className='bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300'
              onClick={handleSignout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile;
