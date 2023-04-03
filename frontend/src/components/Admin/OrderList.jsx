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
import { clearError, getAllOrders } from '../../actions/adminOrderActions';
import { deleteOrder } from '../../actions/adminOrderActions';
import { deleteOrderReset } from '../../store/slices/updateAndDeleteOrderSlice';

const OrderList = () => {

  const dispatch = useDispatch();

  const {error, orders} = useSelector((state)=>state.adminOrder)
  const {error:deleteError, isDeleted} = useSelector((state)=>state.deleteAndUpdateOrder)

  const deleteOrderHandler = (id)=>{
    dispatch(deleteOrder(id))
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
      toast.success('Order Deleted Successfully')
      dispatch(deleteOrderReset())
    }

    dispatch(getAllOrders())
  },[dispatch, error, deleteError, isDeleted])


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      // cellClassName: (params) => {
      //   return  (params.status === 'Delivered') ? "greencolor" : "redcolor";
      

        

        // return clsx ('column',{
        //   greencolor: params.value === 'Delivered',
        //   redcolor: params.value === 'Processing'
        //   (params.status === 'Delivered') ? "greencolor" : "redcolor"
        // })

        // return params.getValue(params.id, "status") === "Delivered"
        //   ? "greenColor"
        //   : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
          <Link to={`/admin/order/${params.id}`} >
            <EditIcon/>
          </Link>

          <Button onClick={()=>deleteOrderHandler(params.id)} >
              <DeleteIcon/>
            </Button>

          </>
        )
      }
    },
  ] 

  const rows = [];

  orders && 
  orders.forEach((item)=>{
   
      rows.push({
        id:item._id,
        itemsQty:item.orderItems.length,
        amount:item.totalPrice,
        status:item.orderStatus
      })
    })


  return (
    <>
    
    <MetaData title={`All Orders - Admin`} />
    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">All Orders</h1>
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

export default OrderList