import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state, action) {
      
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    clearErrors(state,action){
        state.error=null;
    },
    registerUserRequest(state,action){
        state.isLoading = true;
        state.isAuthenticated = false;
    },
    registerUserSuccess(state,action){
        state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      
    },
    registerUserFail(state,action){
        state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    loadUserRequest(state,action){
        state.isLoading = true;
        state.isAuthenticated = false;
    },
    loadUserSuccess(state,action){
        state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loadUserFail(state,action){
        state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess(state,action){
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
       
    },
    logoutFail(state,action){
        state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { loginRequest, loginSuccess, loginFail, clearErrors, registerUserFail, registerUserRequest, registerUserSuccess, loadUserFail, loadUserRequest, loadUserSuccess , logoutFail, logoutSuccess} =
userSlice.actions;

export default userSlice;
