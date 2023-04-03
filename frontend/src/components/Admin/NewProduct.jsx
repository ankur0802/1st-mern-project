import React, { useEffect, useState } from 'react'
import './NewProduct.css'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MetaData from '../navbar/MetaData';
import Sidebar from './Sidebar';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProduct, clearError } from '../../actions/addProductAction';
import { addproductReset } from '../../store/slices/addProduct';

const NewProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {isLoading, error, success} = useSelector((state)=>state.newProduct)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [images, setImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])

const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'smartPhones'
  ];

  useEffect(()=>{
    if(error){
        toast.error(error)
        dispatch(clearError);
    }
    if(success){
        toast.success('Product Created Successfully')
        navigate('/admin/dashboard')
        dispatch(addproductReset())
    }

  },[dispatch, error, navigate, success])
  
  
  const createProductSubmitHandler = (e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('price', price);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('stock', stock);

    images.forEach((image)=>{
        myForm.append('images', image)
    })

    dispatch(addProduct(myForm))

  }

  const createProductImageChange = (e)=>{
    const files = Array.from(e.target.files)

    setImages([]);
    setImagePreview([])

    files.forEach((file)=>{
        const reader = new FileReader();

        reader.onload=()=>{
            if(reader.readyState === 2){
                setImagePreview((old)=>[...old, reader.result])
                setImages((old)=>[...old, reader.result])
            }
        }

        reader.readAsDataURL(file);

    })

  }


  return (
    <>
  
    <MetaData title='Create Product' />
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            <form 
             className='createProductForm'
             encType='multipart/form-data'
             onSubmit={createProductSubmitHandler}
            >
                <h1>Create Product</h1>
                <div>
                    <SpellcheckIcon/>
                    <input 
                     type='text'
                     placeholder='Product Name'
                     required
                     value={name}
                     onChange={(e)=>setName(e.target.value)}
                     />
                </div>

                <div>
                    <AttachMoneyIcon/>
                    <input 
                     type='number'
                     placeholder='Price'
                     required
                     onChange={(e)=>setPrice(e.target.value)}
                     />
                </div>
                <div>
                    <DescriptionIcon/>
                    <textarea
                    placeholder='Product Description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    cols="30" 
                    rows="1"
                    ></textarea>
                </div>
                <div>
                    <AccountTreeIcon/>
                    <select onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">Choose Category</option>
                        {categories.map((cat)=>(
                            <option value={cat} key={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <StorageIcon/>
                    <input 
                     type='number'
                     placeholder='Stock'
                     required
                     onChange={(e)=>setStock(e.target.value)}
                     />
                </div>

                <div id="createProductFormFile">
                    <input 
                     type='file'
                     name='avatar'
                     accept='image/*'
                     multiple
                     onChange={createProductImageChange}
                     />
                </div>
                
                <div id="createProductFormImage">
                    {imagePreview.map((image, index)=>(
                        <img src={image} key={index} alt='Avatar Preview' />
                    ))}
                </div>

                <Button
                id='createProductBtn'
                type='submit'
                disabled={isLoading ? true:false}
                >
                    Create
                </Button>


            </form>
        </div>
    </div>

    </>
  )
}

export default NewProduct