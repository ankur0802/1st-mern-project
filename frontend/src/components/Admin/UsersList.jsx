import React, {  useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../navbar/MetaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar";
import {deleteUser, clearError, gettAllUsers} from '../../actions/adminUserAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUserReset } from "../../store/slices/profileSlice";
import { Button } from "@mui/material";


const UsersList = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate()

  

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  console.log(deleteError);
  console.log(message);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success(message);
      navigate('/admin/users')
      dispatch(deleteUserReset());
    }

    dispatch(gettAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message, navigate]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.role === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
           
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={()=> deleteUserHandler(params.id)}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
     <ToastContainer/>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            className="productListTable"
            disableRowSelectionOnClick
            autoHeight

          />
        </div>
      </div>
    </>
  );
};

export default UsersList;