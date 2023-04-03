import React, { useEffect } from "react";
import "./MyOrders.css";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";
import MetaData from "../navbar/MetaData";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearError, getMyOrders } from "../../actions/orderActions";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();


  const { isLoading, error, orders } = useSelector((state) => state.myOrders);
  
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: 'redcolor'
      // cellClassName: (params) => {

      //   return (params.status === 'Delivered') ? "greencolor" : "redcolor"

      //   // return params.getValue(params.id, "status") === "Delivered"
      //   //   ? "greenColor"
      //   //   : "redColor";
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
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    dispatch(getMyOrders());
  }, [dispatch, error]);

  return (
    <>
      
      <MetaData title={`${user.name} - Orders`} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage" >
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
