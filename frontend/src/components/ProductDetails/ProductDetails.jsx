import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProductDetails} from '../../actions/productActions'
import {useParams} from 'react-router-dom'
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css'
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard'
import Loader from '../Loader/Loader';
import MetaData from '../navbar/MetaData';
import { addItemsToCart } from '../../actions/cartActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating } from '@mui/material';
import { clearError, newReview } from '../../actions/reviewActions';
import { newReviewReset } from '../../store/slices/reviewSlice';


const ProductDetails = () => {
    const params = useParams();
   

    const dispatch = useDispatch();

    const {product, isLoading, error} = useSelector((state)=>state.productDetails)
    const {success, error:reviewError} = useSelector((state)=>state.newReview)


    const options = {
        edit:false,
        color:'rgba(20, 20, 20, 0.1)',
        activeColor:'tomato',
        size: window.innerWidth < 600 ? 20:25,
        value:product.ratings,
        isHalf:true
    
    }

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const decreaseQuantity = ()=>{
        if(1 >= quantity) return;
        let qty = quantity-1;
        setQuantity(qty)
    }

    const increaseQuantity = ()=>{
        if(product.stock <= quantity) return;
        let qty = quantity+1;
        setQuantity(qty)
    }

    const addToCartHandler = ()=>{
        dispatch(addItemsToCart(params.id, quantity));
        toast.success('Item added To Cart')
    }
    
    const submitReviewToggle = ()=>{
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = ()=>{

        const myForm = new FormData();

        myForm.append('rating', rating);
        myForm.append('comment', comment);
        myForm.append('productId', params.id);

        dispatch(newReview(myForm));

        setOpen(false)

    }



    useEffect(()=>{

        if(error){
            toast.error(error)
            dispatch(clearError())
        }

        if(reviewError){
            toast.error(reviewError)
            dispatch(clearError())
        }
        if(success){
            toast.success('Review Submitted Successfully')
            dispatch(newReviewReset())
        }

        dispatch(getProductDetails(params.id))
    },[dispatch, params.id, error, reviewError, success])


  return (
    <>
   
    {isLoading ? <Loader/> : (
    <>
     <ToastContainer/>
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
                            <button onClick={decreaseQuantity} >-</button>
                            <input readOnly type="number" value={quantity} />
                            <button onClick={increaseQuantity} >+</button>
                        </div>
                        <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler} >Add to Cart</button>
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

                        <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
            </div>

    </div>

    <h3 className="reviewsHeading">REVIEWS</h3>


    <Dialog 
     aria-labelledby='simple-dialog-title'
     open={open}
     onClose={submitReviewToggle}
     >

        <DialogTitle className='rtitle' >Submit Review</DialogTitle>
        <DialogContent className='submitDialog' >
            <Rating 
             onChange={(e)=>setRating(e.target.value)}
             value={rating}
             size='large'
             />
             <textarea 
              className='submitDialogTextArea'
              cols='30'
              rows='5'
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              >

             </textarea>

        </DialogContent>
        <DialogActions>
            <Button onClick={submitReviewToggle} className='redColor' >Cancel</Button>
            <Button onClick={reviewSubmitHandler} >Submit</Button>
        </DialogActions>

    </Dialog>
        

    {product.reviews && product.reviews[0] ? (<div className='reviews' >
        {product.reviews && product.reviews.map((review)=> <ReviewCard review = {review}/> )}
    </div>) : (<p className='noReviews' >No Reviews Yet</p>)}

    </>)}
    </>
  )
}

export default ProductDetails