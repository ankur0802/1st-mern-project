import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ProductList.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import MetaData from '../navbar/MetaData';
import Sidebar from './Sidebar'
import { clearError, getAdminProduct } from '../../actions/productActions';
import { deleteProduct } from '../../actions/deleteAndUpdateProductAction';
import { deleteproductReset } from '../../store/slices/deleteAndUpdateProductSlice';


const ProductList = () => {

  const dispatch = useDispatch();

  const {error, products} = useSelector((state)=>state.products)
  const {error:deleteError, isDeleted} = useSelector((state)=>state.deleteAndUpdateProduct)

  const deleteProductHandler = (id)=>{
    dispatch(deleteProduct(id))
  }


  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearError())
    }
    if(deleteError){
      toast.error(deleteError)
      dispatch(clearError())
    }
    if(isDeleted){
      toast.success('Product Deleted Successfully')
      dispatch(deleteproductReset())
    }

    dispatch(getAdminProduct())
  },[dispatch, error, deleteError, isDeleted])


  const columns = [
    {field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5},

    {
      field:'name',
      headerName:'Name',
      minWidth:350,
      flex:1,
    },
    {
      field:'stock',
      headerName:'Stock',
      minWidth:150,
      flex:0.3,
    },
    {
      field:'price',
      headerName:'Price',
      minWidth:270,
      flex:0.5,
    },
    {
      field:'action',
      headerName:'Actions',
      minWidth:150,
      flex:0.3,
      type:'number',
      sortable:false,
      renderCell:(params)=>{
        return (
          <>
          <Link to={`/admin/product/${params.id}`} >
            <EditIcon/>
          </Link>

          <Button onClick={()=>deleteProductHandler(params.id)} >
              <DeleteIcon/>
            </Button>

          </>
        )
      }
    },
  ] 

  const rows = [];

  products && 
    products.forEach((item)=>{
      rows.push({
        id:item._id,
        stock:item.stock,
        price:item.price,
        name:item.name
      })
    })


  return (
    <>
 
    <MetaData title={`All Products - Admin`} />
    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">All Products</h1>
        <DataGrid 
         rows={rows}
         columns={columns}
         className='productListTable'
         disableRowSelectionOnClick
         autoHeight

         />

      </div>
    </div>

    </>
  )
}

export default ProductList