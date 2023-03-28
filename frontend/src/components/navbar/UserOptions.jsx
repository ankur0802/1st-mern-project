import React, { useState } from 'react'
import './UserOptions.css'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userAction';

const UserOptions = ({user}) => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

    const [open, setOpen]= useState(false);

const {cartItems} = useSelector((state)=>state.cart)

    const dashboard = ()=>{
        navigate('/dashboard')
    }

    const orders = ()=>{
        navigate('/orders')

    }

    const account = ()=>{
        navigate('/account')

    }

    const cart = ()=>{
        navigate('/cart')

    }

    const logoutUser = ()=>{
        dispatch(logout())
        toast.success('Logout successfull')
        navigate('/login')
    }



    const options = [
        {icon: <PersonIcon/>, name:'Profile', func: account },
        {icon: <ListAltIcon/>, name:'Orders', func: orders },
        {icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset"}} />, name:`Cart(${cartItems.length})`, func: cart },
        {icon: <ExitToAppIcon/>, name:'Logout', func: logoutUser },
    ]

    if(user.role === 'admin'){
        
        options.unshift( {icon: <DashboardCustomizeIcon/>, name:'Dashboard', func: dashboard }, )
    }


  return (
    <>
    <ToastContainer/>
    <Backdrop open={open} />
    <SpeedDial 
    ariaLabel='SpeedDial tooltip example' 
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    direction='down'
    className='speedDial'
    icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url:'/Profile.png' } alt='profile' />}
     >
        {options.map((item)=>(
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600? true :false}/>
        ))}

    </SpeedDial>
    </>
  )
}

export default UserOptions