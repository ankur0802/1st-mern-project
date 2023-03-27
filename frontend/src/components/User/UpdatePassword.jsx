import React, { useEffect, useState } from 'react'
import './UpdatePassword.css'
import Loader from '../Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {  clearError, updatePassword } from '../../actions/profileAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import MetaData from '../navbar/MetaData'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { updatePasswordReset } from '../../store/slices/profileSlice'



const UpdatePassword = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {error, isUpdated, isLoading} = useSelector((state)=>state.profile)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const  updatePasswordSubmit = (e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('oldPassword', oldPassword);
    myForm.append('newPassword', newPassword);
    myForm.append('confirmPassword', confirmPassword);
    dispatch(updatePassword(myForm))

    
  }


  useEffect(()=>{

   

    if(error){
      toast.error(error)
      dispatch(clearError())
      
    }
    if(isUpdated){
        toast.success('Password Changed Successfully')
        
        navigate('/account')

        dispatch(updatePasswordReset())
    }

  },[dispatch, error, isUpdated, navigate])



  return (
   
    <>
     <ToastContainer/>
      {isLoading ? (
        <Loader />
      ) : (
        <>
       
          <MetaData title="Change Password" />
       
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
              
                onSubmit={updatePasswordSubmit}
              >
                
                <div className="loginPassword">
           <VpnKeyIcon/>
           <input 
             type="password"
             placeholder='Old Password'
             required
             value={oldPassword}
             onChange={(e)=>setOldPassword(e.target.value)}
              />
         </div>

         <div className="loginPassword">
           <LockOpenIcon/>
           <input 
             type="password"
             placeholder='New Password'
             required
             value={newPassword}
             onChange={(e)=>setNewPassword(e.target.value)}
              />
         </div>

         <div className="loginPassword">
           <LockIcon/>
           <input 
             type="password"
             placeholder='Confirm Password'
             required
             value={confirmPassword}
             onChange={(e)=>setConfirmPassword(e.target.value)}
              />
         </div>

                
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>

  )
}

export default UpdatePassword