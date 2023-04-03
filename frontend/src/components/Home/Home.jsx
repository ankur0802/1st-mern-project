import React, { useEffect } from 'react'
import {CgMouse} from 'react-icons/cg'
import './Home.css'
import ProductCard from './ProductCard'
import MetaData from '../navbar/MetaData'
import {getProduct} from '../../actions/productActions'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader/Loader'
import { toast } from 'react-toastify'
import { clearError } from '../../actions/profileAction'




const Home = () => {
    const dispatch = useDispatch();
    const { isLoading, products, error  } = useSelector(state=>state.products)
    

    useEffect(()=>{

        if(error){
            toast.error(error)
            clearError()
        }


        dispatch(getProduct())
    }, [dispatch, error])

  return (
    <>
    {isLoading? <Loader/>: <>

<MetaData title='Ecommerce' />

<div className="banner">
    <p>Welcome to Ecommerce</p>
    <h1>FIND AMAZING PRODUCTS BELOW</h1>

    <a href="#container">
        <button>
            Scroll <CgMouse/>
        </button>
    </a>
</div>

<h2 className="homeHeading">Featured Products</h2>
<div className="container" id="container">
{products && products.map((product, index)=>(
    <ProductCard key={index} product={product} />
))}
</div>

</>}
    </>
  )
}

export default Home