import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProductDetails} from '../../actions/productActions'
import {useParams} from 'react-router-dom'
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css'
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard'
import Loader from '../Loader/Loader';
import MetaData from '../navbar/MetaData';

const ProductDetails = () => {
    const params = useParams();
   

    const dispatch = useDispatch();

    const {product, isLoading, error} = useSelector((state)=>state.productDetails)

    useEffect(()=>{
        dispatch(getProductDetails(params.id))
    },[dispatch, params.id])


    const options = {
        edit:false,
        color:'rgba(20, 20, 20, 0.1)',
        activeColor:'tomato',
        size: window.innerWidth < 600 ? 20:25,
        value:product.ratings,
        isHalf:true
    
    }
    


  return (
    <>
    {isLoading ? <Loader/> : (
    <>
      <MetaData title={`${product.name}--ECOMMERCE`} />

    <div className="ProductDetails">
        <div>
            <Carousel>
                {product.images && product.images.map((item, i)=>                   
                    (
                        <img
                        className='CarouselImage'
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                        />
                    )                                 
                )}
            </Carousel>
        </div>

            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>

                <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>

                <div className='detailsBlock-3' >
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input type="number" value='1' />
                            <button>+</button>
                        </div>
                        <button>Add to Cart</button>
                    </div>

                        <p>
                            Status:
                            <b className={product.stock < 1 ? 'redColor' : 'greenColor'} >
                                {product.stock < 1 ? 'OutOfStock' : "InStock"}
                            </b>
                        </p>

                </div>

                <div className="detailsBlock-4">
                    Discription: <p>{product.description}</p>
                </div>

                        <button className='submitReview' >Submit Review</button>
            </div>

    </div>

    <h3 className="reviewsHeading">REVIEWS</h3>
    {product.reviews && product.reviews[0] ? (<div className='reviews' >
        {product.reviews && product.reviews.map((review)=> <ReviewCard review = {review}/> )}
    </div>) : (<p className='noReviews' >No Reviews Yet</p>)}

    </>)}
    </>
  )
}

export default ProductDetails