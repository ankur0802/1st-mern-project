import React, { useEffect, useRef } from 'react'
import './Payment.css'
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
  } from "@stripe/react-stripe-js";
import axios from 'axios'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MetaData from '../navbar/MetaData'
import { Typography } from '@mui/material'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { clearError, createOrder } from '../../actions/orderActions';

const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

  const navigate = useNavigate();

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();



    const payBtn = useRef(null)


    const {shippingInfo, cartItems} = useSelector((state)=>state.cart)
    const {user} = useSelector((state)=>state.user)
    const {error} = useSelector((state)=>state.order)


    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }


    const order = {

        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,

    }
  

    const submitHandler = async(e)=>{

        e.preventDefault();

        payBtn.current.disabled = true;

        try {

            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
             
              const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
              );

            const client_secret = data.client_secret;
            

            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email,
                        address:{
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            })


            if(result.error){
                payBtn.current.disabled = false;
                toast.error(result.error.message)
            }else{

                if(result.paymentIntent.status === 'succeeded'){

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }

                    dispatch(createOrder(order))

                    navigate('/success')
                }else{
                    toast.error(`there's some issue while processing payment`)
                }

            }


            
        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error.response.data.message)
            
        }

    }


    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearError())
        }
    },[dispatch, error])


  return (
    <>
    
    <MetaData title='Payment' />
    <CheckoutSteps activeStep={2} />
    <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler} >
            <Typography>Card Info</Typography>
            <div>
                <CreditCardIcon/>
                <CardNumberElement className='paymentInput' />
            </div>
            <div>
                <EventIcon/>
                <CardExpiryElement className='paymentInput' />
            </div>
            <div>
                <VpnKeyIcon/>
                <CardCvcElement className='paymentInput' />
            </div>

            <input 
                type='submit'
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className='paymentFormBtn'
             />

        </form>
    </div>

    </>
  )
}

export default Payment