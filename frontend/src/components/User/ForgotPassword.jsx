import React, { useEffect, useState } from 'react'
import './ForgotPassword.css'
import Loader from '../Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {  clearError, forgotPassword } from '../../actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import MetaData from '../navbar/MetaData'
import MailOutlineIcon from '@mui/icons-material/MailOutline'




const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
  const [email, setEmail] = useState("")
 
    const {error, message, isLoading} = useSelector((state)=>state.user)


    const  forgotPasswordSubmit = (e)=>{
        e.preventDefault();
    
        const myForm = new FormData();
       
        myForm.append('email', email);
        
        dispatch(forgotPassword(myForm))
    
      }


      useEffect(()=>{

    
        if(error){
          toast.error(error)
          dispatch(clearError())
          
        }
        if(message){
            toast.success(message)
        }
    
      },[dispatch, error, message])
    
    

  return (

    <>
    <ToastContainer/>
     {isLoading ? (
       <Loader />
     ) : (
       <>
      
         <MetaData title="Forgot Password" />
      
         <div className="forgotPasswordContainer">
           <div className="forgotPasswordBox">
             <h2 className="forgotPasswordHeading">Forgot Password</h2>

             <form
               className="forgotPasswordForm"
        
               onSubmit={forgotPasswordSubmit}
             >
             
               <div className="forgotPasswordEmail">
                 <MailOutlineIcon />
                 <input
                   type="email"
                   placeholder="Email"
                   required
                   name="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
               </div>

              
               <input
                 type="submit"
                 value="Send"
                 className="forgotPasswordBtn"
               />
             </form>
           </div>
         </div>
       </>
     )}
   </>

  )
}

export default ForgotPassword