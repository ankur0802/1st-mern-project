import React, { useEffect, useState } from 'react'
import './Products.css'
import {useDispatch, useSelector} from 'react-redux'
import {clearError, getProduct} from '../../actions/productActions'
import Loader from '../Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import  Pagination from 'react-js-pagination'
import Slider  from '@mui/material/Slider'
import  Typography from '@mui/material/Typography'
import MetaData from '../navbar/MetaData'
import { toast } from 'react-toastify'


const categories = [
  'Laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Attire',
  'Camera',
  'smartPhones'
]



const Products = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0,100000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const {products, isLoading, error, productCount, resultPerPage, filteredProductsCount} = useSelector((state)=>state.products)
 
  const keyword = params.keyword

  const setCurrentPageNo = (e)=>{
    setCurrentPage(e);
  }

  const priceHandler = (event, newPrice)=>{
    setPrice(newPrice)
  }

  useEffect(()=>{

    if(error){
      toast.error(error)
      clearError()
    }

    
    dispatch(getProduct(keyword, currentPage,price, category, ratings))
  },[dispatch, keyword, currentPage, price, category, ratings, error])

  let count = filteredProductsCount;


  return (
    <>
    {isLoading ? <Loader/> : <>
      <MetaData title='PRODUCTS--ECOMMERCE' />
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {products && products.map((product, index)=>{
        return(
        <ProductCard key={index} product={product} />
        )
        })}
      </div>

        <div className="filterBox">
        <Typography>Price</Typography>
        <Slider 
          value={price}
          onChange={priceHandler}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          min={0}
          max={100000}
        />

        <Typography>Categories</Typography>
        <ul className='categoryBox' >

          {categories.map((category)=>(
            <li 
              className='category-link'
              key={category}
              onClick={()=>setCategory(category)}
             >
              {category}
             </li>
          ))}

        </ul>

        <fieldset>
          <Typography component='legend' >Ratings Above</Typography>
          <Slider 
            value={ratings}
            onChange={(e, newRating)=>{
              setRatings(newRating)
            }}
            aria-labelledby='continuous-slider'
            valueLabelDisplay='auto'
            min={0}
            max={5}
           />
        </fieldset>

        </div>

      
      {resultPerPage < count && (<div className='paginationBox' >
        <Pagination 
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productCount}
          onChange={setCurrentPageNo}
          nextPageText='Next'
          prevPageText='Prev'
          firstPageText='1st'
          lastPageText='Last'
          itemClass='page-item'
          linkClass='page-link'
          activeClass='pageItemActive'
          activeLinkClass='pageLinkActive'
         />
      </div>)}

    </>}
   
    </>
  )
}

export default Products