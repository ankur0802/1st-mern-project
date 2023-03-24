import React, { useEffect, useState } from 'react'
import './UpdateProfile.css'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import FaceIcon from '@mui/icons-material/Face'
import {useDispatch, useSelector} from 'react-redux'
import {  clearError, updateProfile } from '../../actions/profileAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../actions/userAction'
import { updateProfileReset } from '../../store/slices/profileSlice'


const UpdateProfile = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { user } = useSelector(
    (state) => state.user
  );

  const {error, isUpdated, isLoading} = useSelector((state)=>state.profile)

  const [name, setName ] = useState('');
  const [email, setEmail] = useState('')

  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');


  const updateSubmit = (e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('avatar', avatar);
    dispatch(updateProfile(myForm))

    
  }

  const updateDataChange = (e)=>{
     if(e.target.name === 'avatar'){

      const reader = new FileReader();

      reader.onload = ()=>{
        if(reader.readyState===2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
          
        }
      }
      reader.readAsDataURL(e.target.files[0])

     }

  }

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearError())
      
    }
    if(isUpdated){
        toast.success('Profile Updated Successfully')
        dispatch(loadUser())
        navigate('/account')

        dispatch(updateProfileReset())
    }

  },[dispatch, error])



  return (
    <>

    </>
  )
}

export default UpdateProfile