import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[]
}

const allUsersSlice = createSlice({
    name:'allUsers',
    initialState,
    reducers:{
      
        allUsersRequest(state, action){
          
           state.isLoading = true;
        },
        allUsersSuccess(state, action){
           state.isLoading = false;
           state.users = action.payload;
          

        },
        allUsersFail(state, action){
           state.isLoading = false;
           state.error= action.payload;

        },
       
      
        clearErrors(state,action){
            state.error=null;
        },
    }
})
 export const { allUsersFail, allUsersRequest, clearErrors, allUsersSuccess}  = allUsersSlice.actions; 

export default allUsersSlice;


