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
      state.user = action.payload.user;
      state.message = action.payload.message;
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
    clearUser(state,action){
        state.user=null;
    },
    registerUserRequest(state,action){
        state.isLoading = true;
        state.isAuthenticated = false;
    },
    registerUserSuccess(state,action){
        state.isLoading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
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
    forgotPasswordRequest(state, action) {
      
      state.isLoading = true;
      state.error=null;
     
    },
    forgotPasswordSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      
    },
    forgotPasswordFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPasswordRequest(state, action) {
      
      state.isLoading = true;
      state.error=null;
     
    },
    resetPasswordSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
      
    },
    resetPasswordFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { loginRequest, loginSuccess, loginFail, clearErrors, registerUserFail, registerUserRequest, registerUserSuccess, loadUserFail, loadUserRequest, loadUserSuccess , logoutFail, logoutSuccess, forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, clearUser } =
userSlice.actions;

export default userSlice;
